'use strict';

const fetch = require('node-fetch');
const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob').sync;
const path = require('path');

const KEEP_DIRECTORIES = null;

const files = {
  'codemirror': [
    KEEP_DIRECTORIES,
    'addon/comment/comment.js',
    'addon/dialog',
    'addon/edit/closebrackets.js',
    'addon/edit/matchbrackets.js',
    'addon/fold/brace-fold.js',
    'addon/fold/comment-fold.js',
    'addon/fold/foldcode.js',
    'addon/fold/foldgutter.*',
    'addon/fold/indent-fold.js',
    'addon/hint/css-hint.js',
    'addon/hint/show-hint.*',
    'addon/lint/css-lint.js',
    'addon/lint/json-lint.js',
    'addon/lint/lint.*',
    'addon/scroll/annotatescrollbar.js',
    'addon/search/matchesonscrollbar.*',
    'addon/search/searchcursor.js',
    'addon/selection/active-line.js',
    'keymap/*',
    'lib/*',
    'mode/css',
    'mode/javascript',
    'mode/stylus',
    'theme/*',
  ],
  'jsonlint': [
    'lib/jsonlint.js',
    'README.md -> LICENSE',
  ],
  'less-bundle': [
    'dist/less.min.js',
  ],
  'lz-string-unsafe': [
    'lz-string-unsafe.min.js',
  ],
  'stylelint-bundle': [
    'dist/stylelint-bundle.min.js',
    'https://github.com/stylelint/stylelint/raw/{VERSION}/LICENSE',
  ],
  'stylus-lang-bundle': [
    'dist/stylus-renderer.min.js',
  ],
  'usercss-meta': [
    'dist/usercss-meta.min.js',
  ],
  'db-to-cloud': [
    'dist/db-to-cloud.min.js',
  ],
  'webext-launch-web-auth-flow': [
    'dist/webext-launch-web-auth-flow.min.js',
  ],
  '@eight04/draggable-list': [
    'dist/draggable-list.iife.min.js',
  ],
};

main().catch(console.error);

async function main() {
  fse.emptyDirSync('vendor');
  await Promise.all(Object.keys(files).map(async pkg => {
    console.log(`Building ${pkg}...`);
    const pkgName = getFileName(pkg);
    const flatPkg = pkg === pkgName || files[pkgName]
      ? pkg.replace(/\//g, '-')
      : pkgName;
    const res = await buildFiles(pkg, flatPkg, files[pkg]);
    buildLicense(pkg, flatPkg);
    buildReadme(pkg, flatPkg, res);
  }));
  console.log('Building CodeMirror theme list...');
  buildThemeList();
}

async function buildFiles(pkg, flatPkg, patterns) {
  const keepDirs = patterns.includes(KEEP_DIRECTORIES);
  let fetched = '';
  let copied = '';
  for (let pattern of patterns) {
    if (pattern === KEEP_DIRECTORIES) continue;
    pattern = pattern.replace('{VERSION}', require(`${pkg}/package.json`).version);
    const [src, dest = !keepDirs && getFileName(src)] = pattern.split(/\s*->\s*/);
    if (/^https?:/.test(src)) {
      fse.outputFileSync(`vendor/${flatPkg}/${dest}`, await (await fetch(src)).text());
      fetched += `* ${dest}: ${src}\n`;
    } else {
      const files = glob(`node_modules/${pkg}/${src}`);
      if (!files.length) {
        throw new Error(`Pattern ${src} matches no files`);
      }
      for (const file of files) {
        fse.copySync(file, dest
          ? `vendor/${flatPkg}/${dest}`
          : `vendor/${path.relative('node_modules', file).replace(pkg + '/', flatPkg + '/')}`);
        copied += `* ${reportFile(pkg, file, dest)}\n`;
      }
    }
  }
  return {fetched, copied};
}

function buildLicense(pkg, flatPkg) {
  const LICENSE = `vendor/${flatPkg}/LICENSE`;
  if (!fs.existsSync(LICENSE)) {
    const [src] = glob(`node_modules/${pkg}/LICEN[SC]E*`);
    if (!src) throw new Error(`Cannot find license file for ${pkg}`);
    fse.copySync(src, LICENSE);
  }
}

function buildReadme(pkg, flatPkg, {fetched, copied}) {
  const {name, version} = require(`${pkg}/package.json`);
  fse.outputFileSync(`vendor/${flatPkg}/README.md`, [
    `## ${name} v${version}`,
    fetched && `Files downloaded from URL:\n${fetched}`,
    copied && `Files copied from NPM (node_modules):\n${copied}`,
  ].filter(Boolean).join('\n\n'));
}

function buildThemeList() {
  fse.outputFileSync('edit/codemirror-themes.js', deindent(`\
    /* Do not edit. This file is auto-generated by build-vendor.js */
    'use strict';

    /* exported CODEMIRROR_THEMES */
    const CODEMIRROR_THEMES = [
    ${
    fs.readdirSync('vendor/codemirror/theme')
      .filter(name => name.endsWith('.css'))
      .map(name => name.replace('.css', ''))
      .sort()
      .map(t => `  '${t.replace(/'/g, '\\$&')}',`).join('\n')
    }
    ];
    `));
}

function deindent(str) {
  const indent = str.match(/^\s*/)[0];
  return indent
    ? str.replace(new RegExp('^' + indent, 'gm'), '')
    : str;
}

function getFileName(path) {
  return path.split('/').pop();
}

function reportFile(pkg, file, dest) {
  file = path.relative(`node_modules/${pkg}`, file).replace(/\\/g, '/');
  if (!dest || dest === file) {
    return file;
  }
  if (file.includes('/') && getFileName(dest) === getFileName(file)) {
    file = file.replace(/[^/]+$/, '*');
  }
  return `${dest}: ${file}`;
}
