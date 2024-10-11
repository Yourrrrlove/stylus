'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {anyPathSep, defineVars, stripSourceMap} = require('./tools/util');
const WebpackPatchBootstrapPlugin = require('./tools/webpack-patch-bootstrap');

const BUILD = process.env.NODE_ENV;
const DEV = BUILD === 'DEV';
const SRC = `${__dirname}/src/`;
const DST = path.resolve('dist') + '/';
const ASSETS = 'assets/';
const JS = 'js/';
const SHIM = path.resolve('tools/shim') + '/';
const PAGE_BG = 'background';
const PAGES = [
  'edit',
  'install-usercss',
  'manage',
  'options',
  'popup',
  PAGE_BG,
];
const LIB_EXPORT_DEFAULT = {output: {library: {export: 'default'}}};

const ASSETS_CM = ASSETS + 'cm-themes/';
const THEME_PATH = 'node_modules/codemirror/theme';
const THEME_NAMES = Object.fromEntries(fs.readdirSync(THEME_PATH)
  .sort()
  .map(f => (f = f.match(/([^/\\.]+)\.css$/i)?.[1]) && [f, ''])
  .filter(Boolean));

const CFG = {
  mode: DEV ? 'development' : 'production',
  devtool: DEV && 'inline-source-map',
  output: {
    path: DST,
    filename: '[name].js',
    assetModuleFilename: data => {
      const p = data.filename.split('src/images/');
      return ASSETS + (p[1] || '[name][ext]');
    },
    cssFilename: ASSETS + '[name][ext]',
    cssChunkFilename: ASSETS + '[name][ext]',
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
      codemirror: ['codemirror'],
    },
    compression: 'gzip',
  },
  // infrastructureLogging: {debug: /webpack\.cache/},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {importLoaders: 1}},
          'postcss-loader',
        ],
      }, {
        test: /\.m?js$/,
        use: {loader: 'babel-loader'},
        resolve: {fullySpecified: false},
      }, {
        test: require.resolve('db-to-cloud/lib/drive/fs-drive'),
        use: [{loader: SHIM + 'null-loader.js'}],
      }, {
        test: require.resolve('jsonlint'),
        use: [{loader: SHIM + 'jsonlint-loader.js'}],
      },
    ],
  },
  node: false,
  optimization: {
    concatenateModules: true, // makes DEV code run faster
    runtimeChunk: false,
    sideEffects: true,
    usedExports: true,
    minimizer: DEV ? [] : [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            reduce_funcs: false,
            ecma: 8,
            passes: 2,
            // unsafe_arrows: true, // it's 'safe' since we don't rely on function prototypes
          },
          output: {
            ascii_only: false,
            comments: false,
            wrap_func_args: false,
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', {
            calc: false, // breaks clamp()
            minifyParams: false, // breaks our @media for dark and new-ui
          }],
        },
      }),
    ],
  },
  resolve: {
    alias: {
      '/': SRC,
    },
    fallback: {
      'fs': SHIM + 'null.js',
      'path': SHIM + 'path.js',
      'url': SHIM + 'url.js',
    },
  },
  performance: {
    maxAssetSize: 1e6,
    maxEntrypointSize: 1e6,
  },
  plugins: [
    defineVars({
      ASSETS,
      ASSETS_CM,
      JS,
      BUILD,
      PAGE_BG,
    }),
    new WebpackPatchBootstrapPlugin(),
  ],
  stats: {
    // optimizationBailout: true,
  },
};

function mergeCfg(ovr, base) {
  if (!ovr) {
    return base;
  }
  if (!base) {
    let {entry} = ovr;
    if (typeof entry === 'string' ? entry = [entry] : Array.isArray(entry)) {
      ovr.entry = Object.fromEntries(entry.map(e => [path.basename(e, '.js'), e]));
    }
    entry = Object.keys(ovr.entry);
    ovr.cache = {
      ...ovr.cache,
      name: BUILD + '-' + entry.join('-'),
    };
    (ovr.plugins || (ovr.plugins = [])).push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: DST + (entry.length > 1 ? '' : '.' + entry[0]) + '.report.html',
      })
    );
  }
  base = {...base || CFG};
  for (const k in ovr) {
    const o = ovr[k];
    const b = base[k];
    base[k] = o && typeof o === 'object' && b && typeof b === 'object'
      ? Array.isArray(o) && Array.isArray(b) ? [...b, ...o] : mergeCfg(o, b)
      : o;
  }
  return base;
}

function makeLibrary(entry, name, extras) {
  return mergeCfg(extras, mergeCfg({
    entry,
    output: {
      path: DST + JS,
      library: {
        type: 'self',
        name,
      },
    },
  }));
}

function makeContentScript(name) {
  const INJECTED = `window["${name}"]`;
  return mergeCfg({
    entry: '/content/' + name,
    output: {
      path: DST + JS,
      library: {
        // Not using `self` in a content script as it can be spoofed via `<html id=self>`
        type: 'window',
      },
    },
    plugins: [
      defineVars({PAGE: false}),
      new webpack.BannerPlugin({
        banner: `if(${INJECTED}!==1)${INJECTED}=1,`,
        raw: true,
      }),
    ],
  });
}

if (!DEV) fse.emptyDirSync(DST);

module.exports = [
  mergeCfg({
    entry: Object.fromEntries(PAGES.map(p => [p, `/${p}/index`])),
    output: {
      filename: ASSETS + '[name].js',
      chunkFilename: ASSETS + '[name].js',
    },
    optimization: {
      splitChunks: {
        chunks: /^(?!.*[/\\]shim)/,
        cacheGroups: {
          codemirror: {
            test: new RegExp(String.raw`(${anyPathSep([
              SRC + 'cm/',
              String.raw`codemirror(/|-(?!factory))`,
            ].join('|'))}).+\.js$`),
            name: 'codemirror',
          },
          ...Object.fromEntries([
            [2, 'common-ui', `^${SRC}(content/|js/(dom|localization|themer))`],
            [1, 'common', `^${SRC}js/|/lz-string(-unsafe)?/`],
          ].map(([priority, name, test]) => [name, {
            test: new RegExp(String.raw`(${anyPathSep(test)})[^./\\]*\.js$`),
            name,
            priority,
          }])),
        },
      },
    },
    plugins: [
      defineVars({
        PAGE: true,
        THEMES: THEME_NAMES,
      }),
      new MiniCssExtractPlugin({
        filename: ASSETS + '[name].css',
        chunkFilename: ASSETS + '[name].css',
      }),
      ...PAGES.map(p => new HtmlWebpackPlugin({
        chunks: [p],
        filename: p + '.html',
        template: SRC + p + '.html',
        templateParameters: (compilation, files, tags, options) => {
          const {bodyTags, headTags} = tags;
          // The main entry goes into BODY to improve performance (2x in manage.html)
          headTags.push(...bodyTags.splice(0, bodyTags.length - 1));
          return {
            compilation: compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {tags, files, options},
          };
        },
        scriptLoading: 'blocking',
        inject: false,
      })),
      new CopyPlugin({
        patterns: [
          {context: SRC + 'content', from: 'install*.js', to: DST + JS, info: {minimized: true}},
          {context: SRC + 'images', from: 'eyedropper/**', to: DST + ASSETS},
          {context: SRC + 'images', from: 'icon/**', to: DST + ASSETS},
          {context: SRC, from: 'manifest.json', to: DST},
          {context: SRC, from: '_locales/**', to: DST},
          {context: THEME_PATH, from: '*.css', to: DST + ASSETS_CM},
          ...[
            ['stylelint-bundle', 'stylelint.js'],
            ['less/dist/less.min.js', 'less.js'],
            ['stylus-lang-bundle/dist/stylus-renderer.min.js', 'stylus-lang.js'],
          ].map(([npm, to]) => ({
            from: require.resolve(npm),
            to: DST + JS + to,
            info: {minimized: true},
            transform: stripSourceMap,
          })),
        ],
      }),
    ],
    resolve: {
      modules: [
        SHIM,
        'node_modules',
      ],
    },
  }),
  makeContentScript('apply.js'),
  makeLibrary([
    '/background/background-worker.js',
    '/edit/editor-worker.js',
  ]),
  makeLibrary('/js/color/color-converter.js', 'colorConverter'),
  makeLibrary('/js/csslint/csslint.js', 'CSSLint',
    {...LIB_EXPORT_DEFAULT, externals: {'./parserlib': 'parserlib'}}),
  makeLibrary('/js/csslint/parserlib.js', 'parserlib', LIB_EXPORT_DEFAULT),
  makeLibrary('/js/meta-parser.js', 'metaParser', LIB_EXPORT_DEFAULT),
  makeLibrary('/js/moz-parser.js', 'extractSections', LIB_EXPORT_DEFAULT),
  makeLibrary('/js/usercss-compiler.js', 'compileUsercss', LIB_EXPORT_DEFAULT),
];
