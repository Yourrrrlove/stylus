!function(){"use strict";let e={};const t={exports:e};var n;n=function(e){var t,n,r=e.Pos;function o(e,t){for(var n=function(e){var t=e.flags;return null!=t?t:(e.ignoreCase?"i":"")+(e.global?"g":"")+(e.multiline?"m":"")}(e),r=n,o=0;o<t.length;o++)-1==r.indexOf(t.charAt(o))&&(r+=t.charAt(o));return n==r?e:new RegExp(e.source,r)}function i(e){return/\\s|\\n|\n|\\W|\\D|\[\^/.test(e.source)}function l(e,t,n){t=o(t,"g");for(var i=n.line,l=n.ch,a=e.lastLine();i<=a;i++,l=0){t.lastIndex=l;var s=e.getLine(i),f=t.exec(s);if(f)return{from:r(i,f.index),to:r(i,f.index+f[0].length),match:f}}}function a(e,t,n){if(!i(t))return l(e,t,n);t=o(t,"gm");for(var a,s=1,f=n.line,c=e.lastLine();f<=c;){for(var u=0;u<s&&!(f>c);u++){var d=e.getLine(f++);a=null==a?d:a+"\n"+d}s*=2,t.lastIndex=n.ch;var h=t.exec(a);if(h){var m=a.slice(0,h.index).split("\n"),g=h[0].split("\n"),p=n.line+m.length-1,v=m[m.length-1].length;return{from:r(p,v),to:r(p+g.length-1,1==g.length?v+g[0].length:g[g.length-1].length),match:h}}}}function s(e,t,n){for(var r,o=0;o<=e.length;){t.lastIndex=o;var i=t.exec(e);if(!i)break;var l=i.index+i[0].length;if(l>e.length-n)break;(!r||l>r.index+r[0].length)&&(r=i),o=i.index+1}return r}function f(e,t,n){t=o(t,"g");for(var i=n.line,l=n.ch,a=e.firstLine();i>=a;i--,l=-1){var f=e.getLine(i),c=s(f,t,l<0?0:f.length-l);if(c)return{from:r(i,c.index),to:r(i,c.index+c[0].length),match:c}}}function c(e,t,n){if(!i(t))return f(e,t,n);t=o(t,"gm");for(var l,a=1,c=e.getLine(n.line).length-n.ch,u=n.line,d=e.firstLine();u>=d;){for(var h=0;h<a&&u>=d;h++){var m=e.getLine(u--);l=null==l?m:m+"\n"+l}a*=2;var g=s(l,t,c);if(g){var p=l.slice(0,g.index).split("\n"),v=g[0].split("\n"),C=u+p.length,L=p[p.length-1].length;return{from:r(C,L),to:r(C+v.length-1,1==v.length?L+v[0].length:v[v.length-1].length),match:g}}}}function u(e,t,n,r){if(e.length==t.length)return n;for(var o=0,i=n+Math.max(0,e.length-t.length);;){if(o==i)return o;var l=o+i>>1,a=r(e.slice(0,l)).length;if(a==n)return l;a>n?i=l:o=l+1}}function d(e,o,i,l){if(!o.length)return null;var a=l?t:n,s=a(o).split(/\r|\n\r?/);e:for(var f=i.line,c=i.ch,d=e.lastLine()+1-s.length;f<=d;f++,c=0){var h=e.getLine(f).slice(c),m=a(h);if(1==s.length){var g=m.indexOf(s[0]);if(-1==g)continue e;return i=u(h,m,g,a)+c,{from:r(f,u(h,m,g,a)+c),to:r(f,u(h,m,g+s[0].length,a)+c)}}var p=m.length-s[0].length;if(m.slice(p)==s[0]){for(var v=1;v<s.length-1;v++)if(a(e.getLine(f+v))!=s[v])continue e;var C=e.getLine(f+s.length-1),L=a(C),S=s[s.length-1];if(L.slice(0,S.length)==S)return{from:r(f,u(h,m,p,a)+c),to:r(f+s.length-1,u(C,L,S.length,a))}}}}function h(e,o,i,l){if(!o.length)return null;var a=l?t:n,s=a(o).split(/\r|\n\r?/);e:for(var f=i.line,c=i.ch,d=e.firstLine()-1+s.length;f>=d;f--,c=-1){var h=e.getLine(f);c>-1&&(h=h.slice(0,c));var m=a(h);if(1==s.length){var g=m.lastIndexOf(s[0]);if(-1==g)continue e;return{from:r(f,u(h,m,g,a)),to:r(f,u(h,m,g+s[0].length,a))}}var p=s[s.length-1];if(m.slice(0,p.length)==p){var v=1;for(i=f-s.length+1;v<s.length-1;v++)if(a(e.getLine(i+v))!=s[v])continue e;var C=e.getLine(f+1-s.length),L=a(C);if(L.slice(L.length-s[0].length)==s[0])return{from:r(f+1-s.length,u(C,L,C.length-s[0].length,a)),to:r(f,u(h,m,p.length,a))}}}}function m(e,t,n,i){var s;this.atOccurrence=!1,this.afterEmptyMatch=!1,this.doc=e,n=n?e.clipPos(n):r(0,0),this.pos={from:n,to:n},"object"==typeof i?s=i.caseFold:(s=i,i=null),"string"==typeof t?(null==s&&(s=!1),this.matches=function(n,r){return(n?h:d)(e,t,r,s)}):(t=o(t,"gm"),i&&!1===i.multiline?this.matches=function(n,r){return(n?f:l)(e,t,r)}:this.matches=function(n,r){return(n?c:a)(e,t,r)})}String.prototype.normalize?(t=function(e){return e.normalize("NFD").toLowerCase()},n=function(e){return e.normalize("NFD")}):(t=function(e){return e.toLowerCase()},n=function(e){return e}),m.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(t){var n=this.doc.clipPos(t?this.pos.from:this.pos.to);if(this.afterEmptyMatch&&this.atOccurrence&&(n=r(n.line,n.ch),t?(n.ch--,n.ch<0&&(n.line--,n.ch=(this.doc.getLine(n.line)||"").length)):(n.ch++,n.ch>(this.doc.getLine(n.line)||"").length&&(n.ch=0,n.line++)),0!=e.cmpPos(n,this.doc.clipPos(n))))return this.atOccurrence=!1;var o=this.matches(t,n);if(this.afterEmptyMatch=o&&0==e.cmpPos(o.from,o.to),o)return this.pos=o,this.atOccurrence=!0,this.pos.match||!0;var i=r(t?this.doc.firstLine():this.doc.lastLine()+1,0);return this.pos={from:i,to:i},this.atOccurrence=!1},from:function(){if(this.atOccurrence)return this.pos.from},to:function(){if(this.atOccurrence)return this.pos.to},replace:function(t,n){if(this.atOccurrence){var o=e.splitLines(t);this.doc.replaceRange(o,this.pos.from,this.pos.to,n),this.pos.to=r(this.pos.from.line+o.length-1,o[o.length-1].length+(1==o.length?this.pos.from.ch:0))}}},e.defineExtension("getSearchCursor",(function(e,t,n){return new m(this.doc,e,t,n)})),e.defineDocExtension("getSearchCursor",(function(e,t,n){return new m(this,e,t,n)})),e.defineExtension("selectMatches",(function(t,n){for(var r=[],o=this.getSearchCursor(t,this.getCursor("from"),n);o.findNext()&&!(e.cmpPos(o.to(),this.getCursor("to"))>0);)r.push({anchor:o.from(),head:o.to()});r.length&&this.setSelections(r,0)}))},"object"==typeof e&&"object"==typeof t?n(annotatescrollbarEe1D33Fa._):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],n):n(CodeMirror);let r={};const o={exports:r};!function(e){"object"==typeof r&&"object"==typeof o?e(annotatescrollbarEe1D33Fa._,annotatescrollbarEe1D33Fa.a):"function"==typeof define&&define.amd?define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],e):e(CodeMirror)}((function(e){var t=e.commands,n=e.Pos;function r(t,r){t.extendSelectionsBy((function(o){return t.display.shift||t.doc.extend||o.empty()?function(t,r,o){if(o<0&&0==r.ch)return t.clipPos(n(r.line-1));var i=t.getLine(r.line);if(o>0&&r.ch>=i.length)return t.clipPos(n(r.line+1,0));for(var l,a="start",s=r.ch,f=s,c=o<0?0:i.length,u=0;f!=c;f+=o,u++){var d=i.charAt(o<0?f-1:f),h="_"!=d&&e.isWordChar(d)?"w":"o";if("w"==h&&d.toUpperCase()==d&&(h="W"),"start"==a)"o"!=h?(a="in",l=h):s=f+o;else if("in"==a&&l!=h){if("w"==l&&"W"==h&&o<0&&f--,"W"==l&&"w"==h&&o>0){if(f==s+1){l="w";continue}f--}break}}return n(r.line,f)}(t.doc,o.head,r):r<0?o.from():o.to()}))}function o(t,r){if(t.isReadOnly())return e.Pass;t.operation((function(){for(var e=t.listSelections().length,o=[],i=-1,l=0;l<e;l++){var a=t.listSelections()[l].head;if(!(a.line<=i)){var s=n(a.line+(r?0:1),0);t.replaceRange("\n",s,null,"+insertLine"),t.indentLine(s.line,null,!0),o.push({head:s,anchor:s}),i=a.line+1}}t.setSelections(o)})),t.execCommand("indentAuto")}function i(t,r){for(var o=r.ch,i=o,l=t.getLine(r.line);o&&e.isWordChar(l.charAt(o-1));)--o;for(;i<l.length&&e.isWordChar(l.charAt(i));)++i;return{from:n(r.line,o),to:n(r.line,i),word:l.slice(o,i)}}function l(e,t){for(var n=e.listSelections(),r=[],o=0;o<n.length;o++){var i=n[o],l=e.findPosV(i.anchor,t,"line",i.anchor.goalColumn),a=e.findPosV(i.head,t,"line",i.head.goalColumn);l.goalColumn=null!=i.anchor.goalColumn?i.anchor.goalColumn:e.cursorCoords(i.anchor,"div").left,a.goalColumn=null!=i.head.goalColumn?i.head.goalColumn:e.cursorCoords(i.head,"div").left;var s={anchor:l,head:a};r.push(i),r.push(s)}e.setSelections(r)}t.goSubwordLeft=function(e){r(e,-1)},t.goSubwordRight=function(e){r(e,1)},t.scrollLineUp=function(e){var t=e.getScrollInfo();if(!e.somethingSelected()){var n=e.lineAtHeight(t.top+t.clientHeight,"local");e.getCursor().line>=n&&e.execCommand("goLineUp")}e.scrollTo(null,t.top-e.defaultTextHeight())},t.scrollLineDown=function(e){var t=e.getScrollInfo();if(!e.somethingSelected()){var n=e.lineAtHeight(t.top,"local")+1;e.getCursor().line<=n&&e.execCommand("goLineDown")}e.scrollTo(null,t.top+e.defaultTextHeight())},t.splitSelectionByLine=function(e){for(var t=e.listSelections(),r=[],o=0;o<t.length;o++)for(var i=t[o].from(),l=t[o].to(),a=i.line;a<=l.line;++a)l.line>i.line&&a==l.line&&0==l.ch||r.push({anchor:a==i.line?i:n(a,0),head:a==l.line?l:n(a)});e.setSelections(r,0)},t.singleSelectionTop=function(e){var t=e.listSelections()[0];e.setSelection(t.anchor,t.head,{scroll:!1})},t.selectLine=function(e){for(var t=e.listSelections(),r=[],o=0;o<t.length;o++){var i=t[o];r.push({anchor:n(i.from().line,0),head:n(i.to().line+1,0)})}e.setSelections(r)},t.insertLineAfter=function(e){return o(e,!1)},t.insertLineBefore=function(e){return o(e,!0)},t.selectNextOccurrence=function(t){var r=t.getCursor("from"),o=t.getCursor("to"),l=t.state.sublimeFindFullWord==t.doc.sel;if(0==e.cmpPos(r,o)){var a=i(t,r);if(!a.word)return;t.setSelection(a.from,a.to),l=!0}else{var s=t.getRange(r,o),f=l?new RegExp("\\b"+s+"\\b"):s,c=t.getSearchCursor(f,o),u=c.findNext();if(u||(u=(c=t.getSearchCursor(f,n(t.firstLine(),0))).findNext()),!u||function(t,n,r){for(var o=0;o<t.length;o++)if(0==e.cmpPos(t[o].from(),n)&&0==e.cmpPos(t[o].to(),r))return!0;return!1}(t.listSelections(),c.from(),c.to()))return;t.addSelection(c.from(),c.to())}l&&(t.state.sublimeFindFullWord=t.doc.sel)},t.skipAndSelectNextOccurrence=function(n){var r=n.getCursor("anchor"),o=n.getCursor("head");t.selectNextOccurrence(n),0!=e.cmpPos(r,o)&&n.doc.setSelections(n.doc.listSelections().filter((function(e){return e.anchor!=r||e.head!=o})))},t.addCursorToPrevLine=function(e){l(e,-1)},t.addCursorToNextLine=function(e){l(e,1)};var a="(){}[]";function s(t){for(var r=t.listSelections(),o=[],i=0;i<r.length;i++){var l=r[i],s=l.head,f=t.scanForBracket(s,-1);if(!f)return!1;for(;;){var c=t.scanForBracket(s,1);if(!c)return!1;if(c.ch==a.charAt(a.indexOf(f.ch)+1)){var u=n(f.pos.line,f.pos.ch+1);if(0!=e.cmpPos(u,l.from())||0!=e.cmpPos(c.pos,l.to())){o.push({anchor:u,head:c.pos});break}if(!(f=t.scanForBracket(f.pos,-1)))return!1}s=n(c.pos.line,c.pos.ch+1)}}return t.setSelections(o),!0}function f(e){return e?/\bpunctuation\b/.test(e)?e:void 0:null}function c(t,r,o){if(t.isReadOnly())return e.Pass;for(var i,l=t.listSelections(),a=[],s=0;s<l.length;s++){var f=l[s];if(!f.empty()){for(var c=f.from().line,u=f.to().line;s<l.length-1&&l[s+1].from().line==u;)u=l[++s].to().line;l[s].to().ch||u--,a.push(c,u)}}a.length?i=!0:a.push(t.firstLine(),t.lastLine()),t.operation((function(){for(var e=[],l=0;l<a.length;l+=2){var s=a[l],f=a[l+1],c=n(s,0),u=n(f),d=t.getRange(c,u,!1);r?d.sort((function(e,t){return e<t?-o:e==t?0:o})):d.sort((function(e,t){var n=e.toUpperCase(),r=t.toUpperCase();return n!=r&&(e=n,t=r),e<t?-o:e==t?0:o})),t.replaceRange(d,c,u),i&&e.push({anchor:c,head:n(f+1,0)})}i&&t.setSelections(e,0)}))}function u(t,n){t.operation((function(){for(var r=t.listSelections(),o=[],l=[],a=0;a<r.length;a++){(f=r[a]).empty()?(o.push(a),l.push("")):l.push(n(t.getRange(f.from(),f.to())))}t.replaceSelections(l,"around","case");var s;for(a=o.length-1;a>=0;a--){var f=r[o[a]];if(!(s&&e.cmpPos(f.head,s)>0)){var c=i(t,f.head);s=c.from,t.replaceRange(n(c.word),c.from,c.to)}}}))}function d(t){var n=t.getCursor("from"),r=t.getCursor("to");if(0==e.cmpPos(n,r)){var o=i(t,n);if(!o.word)return;n=o.from,r=o.to}return{from:n,to:r,query:t.getRange(n,r),word:o}}function h(e,t){var r=d(e);if(r){var o=r.query,i=e.getSearchCursor(o,t?r.to:r.from);(t?i.findNext():i.findPrevious())?e.setSelection(i.from(),i.to()):(i=e.getSearchCursor(o,t?n(e.firstLine(),0):e.clipPos(n(e.lastLine()))),(t?i.findNext():i.findPrevious())?e.setSelection(i.from(),i.to()):r.word&&e.setSelection(r.from,r.to))}}t.selectScope=function(e){s(e)||e.execCommand("selectAll")},t.selectBetweenBrackets=function(t){if(!s(t))return e.Pass},t.goToBracket=function(t){t.extendSelectionsBy((function(r){var o=t.scanForBracket(r.head,1,f(t.getTokenTypeAt(r.head)));if(o&&0!=e.cmpPos(o.pos,r.head))return o.pos;var i=t.scanForBracket(r.head,-1,f(t.getTokenTypeAt(n(r.head.line,r.head.ch+1))));return i&&n(i.pos.line,i.pos.ch+1)||r.head}))},t.swapLineUp=function(t){if(t.isReadOnly())return e.Pass;for(var r=t.listSelections(),o=[],i=t.firstLine()-1,l=[],a=0;a<r.length;a++){var s=r[a],f=s.from().line-1,c=s.to().line;l.push({anchor:n(s.anchor.line-1,s.anchor.ch),head:n(s.head.line-1,s.head.ch)}),0!=s.to().ch||s.empty()||--c,f>i?o.push(f,c):o.length&&(o[o.length-1]=c),i=c}t.operation((function(){for(var e=0;e<o.length;e+=2){var r=o[e],i=o[e+1],a=t.getLine(r);t.replaceRange("",n(r,0),n(r+1,0),"+swapLine"),i>t.lastLine()?t.replaceRange("\n"+a,n(t.lastLine()),null,"+swapLine"):t.replaceRange(a+"\n",n(i,0),null,"+swapLine")}t.setSelections(l),t.scrollIntoView()}))},t.swapLineDown=function(t){if(t.isReadOnly())return e.Pass;for(var r=t.listSelections(),o=[],i=t.lastLine()+1,l=r.length-1;l>=0;l--){var a=r[l],s=a.to().line+1,f=a.from().line;0!=a.to().ch||a.empty()||s--,s<i?o.push(s,f):o.length&&(o[o.length-1]=f),i=f}t.operation((function(){for(var e=o.length-2;e>=0;e-=2){var r=o[e],i=o[e+1],l=t.getLine(r);r==t.lastLine()?t.replaceRange("",n(r-1),n(r),"+swapLine"):t.replaceRange("",n(r,0),n(r+1,0),"+swapLine"),t.replaceRange(l+"\n",n(i,0),null,"+swapLine")}t.scrollIntoView()}))},t.toggleCommentIndented=function(e){e.toggleComment({indent:!0})},t.joinLines=function(e){for(var t=e.listSelections(),r=[],o=0;o<t.length;o++){for(var i=t[o],l=i.from(),a=l.line,s=i.to().line;o<t.length-1&&t[o+1].from().line==s;)s=t[++o].to().line;r.push({start:a,end:s,anchor:!i.empty()&&l})}e.operation((function(){for(var t=0,o=[],i=0;i<r.length;i++){for(var l,a=r[i],s=a.anchor&&n(a.anchor.line-t,a.anchor.ch),f=a.start;f<=a.end;f++){var c=f-t;f==a.end&&(l=n(c,e.getLine(c).length+1)),c<e.lastLine()&&(e.replaceRange(" ",n(c),n(c+1,/^\s*/.exec(e.getLine(c+1))[0].length)),++t)}o.push({anchor:s||l,head:l})}e.setSelections(o,0)}))},t.duplicateLine=function(e){e.operation((function(){for(var t=e.listSelections().length,r=0;r<t;r++){var o=e.listSelections()[r];o.empty()?e.replaceRange(e.getLine(o.head.line)+"\n",n(o.head.line,0)):e.replaceRange(e.getRange(o.from(),o.to()),o.from())}e.scrollIntoView()}))},t.sortLines=function(e){c(e,!0,1)},t.reverseSortLines=function(e){c(e,!0,-1)},t.sortLinesInsensitive=function(e){c(e,!1,1)},t.reverseSortLinesInsensitive=function(e){c(e,!1,-1)},t.nextBookmark=function(e){var t=e.state.sublimeBookmarks;if(t)for(;t.length;){var n=t.shift(),r=n.find();if(r)return t.push(n),e.setSelection(r.from,r.to)}},t.prevBookmark=function(e){var t=e.state.sublimeBookmarks;if(t)for(;t.length;){t.unshift(t.pop());var n=t[t.length-1].find();if(n)return e.setSelection(n.from,n.to);t.pop()}},t.toggleBookmark=function(e){for(var t=e.listSelections(),n=e.state.sublimeBookmarks||(e.state.sublimeBookmarks=[]),r=0;r<t.length;r++){for(var o=t[r].from(),i=t[r].to(),l=t[r].empty()?e.findMarksAt(o):e.findMarks(o,i),a=0;a<l.length;a++)if(l[a].sublimeBookmark){l[a].clear();for(var s=0;s<n.length;s++)n[s]==l[a]&&n.splice(s--,1);break}a==l.length&&n.push(e.markText(o,i,{sublimeBookmark:!0,clearWhenEmpty:!1}))}},t.clearBookmarks=function(e){var t=e.state.sublimeBookmarks;if(t)for(var n=0;n<t.length;n++)t[n].clear();t.length=0},t.selectBookmarks=function(e){var t=e.state.sublimeBookmarks,n=[];if(t)for(var r=0;r<t.length;r++){var o=t[r].find();o?n.push({anchor:o.from,head:o.to}):t.splice(r--,0)}n.length&&e.setSelections(n,0)},t.smartBackspace=function(t){if(t.somethingSelected())return e.Pass;t.operation((function(){for(var r=t.listSelections(),o=t.getOption("indentUnit"),i=r.length-1;i>=0;i--){var l=r[i].head,a=t.getRange({line:l.line,ch:0},l),s=e.countColumn(a,null,t.getOption("tabSize")),f=t.findPosH(l,-1,"char",!1);if(a&&!/\S/.test(a)&&s%o==0){var c=new n(l.line,e.findColumn(a,s-o,o));c.ch!=l.ch&&(f=c)}t.replaceRange("",f,l,"+delete")}}))},t.delLineRight=function(e){e.operation((function(){for(var t=e.listSelections(),r=t.length-1;r>=0;r--)e.replaceRange("",t[r].anchor,n(t[r].to().line),"+delete");e.scrollIntoView()}))},t.upcaseAtCursor=function(e){u(e,(function(e){return e.toUpperCase()}))},t.downcaseAtCursor=function(e){u(e,(function(e){return e.toLowerCase()}))},t.setSublimeMark=function(e){e.state.sublimeMark&&e.state.sublimeMark.clear(),e.state.sublimeMark=e.setBookmark(e.getCursor())},t.selectToSublimeMark=function(e){var t=e.state.sublimeMark&&e.state.sublimeMark.find();t&&e.setSelection(e.getCursor(),t)},t.deleteToSublimeMark=function(t){var n=t.state.sublimeMark&&t.state.sublimeMark.find();if(n){var r=t.getCursor(),o=n;if(e.cmpPos(r,o)>0){var i=o;o=r,r=i}t.state.sublimeKilled=t.getRange(r,o),t.replaceRange("",r,o)}},t.swapWithSublimeMark=function(e){var t=e.state.sublimeMark&&e.state.sublimeMark.find();t&&(e.state.sublimeMark.clear(),e.state.sublimeMark=e.setBookmark(e.getCursor()),e.setCursor(t))},t.sublimeYank=function(e){null!=e.state.sublimeKilled&&e.replaceSelection(e.state.sublimeKilled,null,"paste")},t.showInCenter=function(e){var t=e.cursorCoords(null,"local");e.scrollTo(null,(t.top+t.bottom)/2-e.getScrollInfo().clientHeight/2)},t.findUnder=function(e){h(e,!0)},t.findUnderPrevious=function(e){h(e,!1)},t.findAllUnder=function(e){var t=d(e);if(t){for(var n=e.getSearchCursor(t.query),r=[],o=-1;n.findNext();)r.push({anchor:n.from(),head:n.to()}),n.from().line<=t.from.line&&n.from().ch<=t.from.ch&&o++;e.setSelections(r,o)}};var m=e.keyMap;m.macSublime={"Cmd-Left":"goLineStartSmart","Shift-Tab":"indentLess","Shift-Ctrl-K":"deleteLine","Alt-Q":"wrapLines","Ctrl-Left":"goSubwordLeft","Ctrl-Right":"goSubwordRight","Ctrl-Alt-Up":"scrollLineUp","Ctrl-Alt-Down":"scrollLineDown","Cmd-L":"selectLine","Shift-Cmd-L":"splitSelectionByLine",Esc:"singleSelectionTop","Cmd-Enter":"insertLineAfter","Shift-Cmd-Enter":"insertLineBefore","Cmd-D":"selectNextOccurrence","Shift-Cmd-Space":"selectScope","Shift-Cmd-M":"selectBetweenBrackets","Cmd-M":"goToBracket","Cmd-Ctrl-Up":"swapLineUp","Cmd-Ctrl-Down":"swapLineDown","Cmd-/":"toggleCommentIndented","Cmd-J":"joinLines","Shift-Cmd-D":"duplicateLine",F5:"sortLines","Shift-F5":"reverseSortLines","Cmd-F5":"sortLinesInsensitive","Shift-Cmd-F5":"reverseSortLinesInsensitive",F2:"nextBookmark","Shift-F2":"prevBookmark","Cmd-F2":"toggleBookmark","Shift-Cmd-F2":"clearBookmarks","Alt-F2":"selectBookmarks",Backspace:"smartBackspace","Cmd-K Cmd-D":"skipAndSelectNextOccurrence","Cmd-K Cmd-K":"delLineRight","Cmd-K Cmd-U":"upcaseAtCursor","Cmd-K Cmd-L":"downcaseAtCursor","Cmd-K Cmd-Space":"setSublimeMark","Cmd-K Cmd-A":"selectToSublimeMark","Cmd-K Cmd-W":"deleteToSublimeMark","Cmd-K Cmd-X":"swapWithSublimeMark","Cmd-K Cmd-Y":"sublimeYank","Cmd-K Cmd-C":"showInCenter","Cmd-K Cmd-G":"clearBookmarks","Cmd-K Cmd-Backspace":"delLineLeft","Cmd-K Cmd-1":"foldAll","Cmd-K Cmd-0":"unfoldAll","Cmd-K Cmd-J":"unfoldAll","Ctrl-Shift-Up":"addCursorToPrevLine","Ctrl-Shift-Down":"addCursorToNextLine","Cmd-F3":"findUnder","Shift-Cmd-F3":"findUnderPrevious","Alt-F3":"findAllUnder","Shift-Cmd-[":"fold","Shift-Cmd-]":"unfold","Cmd-I":"findIncremental","Shift-Cmd-I":"findIncrementalReverse","Cmd-H":"replace",F3:"findNext","Shift-F3":"findPrev",fallthrough:"macDefault"},e.normalizeKeyMap(m.macSublime),m.pcSublime={"Shift-Tab":"indentLess","Shift-Ctrl-K":"deleteLine","Alt-Q":"wrapLines","Ctrl-T":"transposeChars","Alt-Left":"goSubwordLeft","Alt-Right":"goSubwordRight","Ctrl-Up":"scrollLineUp","Ctrl-Down":"scrollLineDown","Ctrl-L":"selectLine","Shift-Ctrl-L":"splitSelectionByLine",Esc:"singleSelectionTop","Ctrl-Enter":"insertLineAfter","Shift-Ctrl-Enter":"insertLineBefore","Ctrl-D":"selectNextOccurrence","Shift-Ctrl-Space":"selectScope","Shift-Ctrl-M":"selectBetweenBrackets","Ctrl-M":"goToBracket","Shift-Ctrl-Up":"swapLineUp","Shift-Ctrl-Down":"swapLineDown","Ctrl-/":"toggleCommentIndented","Ctrl-J":"joinLines","Shift-Ctrl-D":"duplicateLine",F9:"sortLines","Shift-F9":"reverseSortLines","Ctrl-F9":"sortLinesInsensitive","Shift-Ctrl-F9":"reverseSortLinesInsensitive",F2:"nextBookmark","Shift-F2":"prevBookmark","Ctrl-F2":"toggleBookmark","Shift-Ctrl-F2":"clearBookmarks","Alt-F2":"selectBookmarks",Backspace:"smartBackspace","Ctrl-K Ctrl-D":"skipAndSelectNextOccurrence","Ctrl-K Ctrl-K":"delLineRight","Ctrl-K Ctrl-U":"upcaseAtCursor","Ctrl-K Ctrl-L":"downcaseAtCursor","Ctrl-K Ctrl-Space":"setSublimeMark","Ctrl-K Ctrl-A":"selectToSublimeMark","Ctrl-K Ctrl-W":"deleteToSublimeMark","Ctrl-K Ctrl-X":"swapWithSublimeMark","Ctrl-K Ctrl-Y":"sublimeYank","Ctrl-K Ctrl-C":"showInCenter","Ctrl-K Ctrl-G":"clearBookmarks","Ctrl-K Ctrl-Backspace":"delLineLeft","Ctrl-K Ctrl-1":"foldAll","Ctrl-K Ctrl-0":"unfoldAll","Ctrl-K Ctrl-J":"unfoldAll","Ctrl-Alt-Up":"addCursorToPrevLine","Ctrl-Alt-Down":"addCursorToNextLine","Ctrl-F3":"findUnder","Shift-Ctrl-F3":"findUnderPrevious","Alt-F3":"findAllUnder","Shift-Ctrl-[":"fold","Shift-Ctrl-]":"unfold","Ctrl-I":"findIncremental","Shift-Ctrl-I":"findIncrementalReverse","Ctrl-H":"replace",F3:"findNext","Shift-F3":"findPrev",fallthrough:"pcDefault"},e.normalizeKeyMap(m.pcSublime);var g=m.default==m.macDefault;m.sublime=g?m.macSublime:m.pcSublime}));let i={};const l={exports:i};!function(e){"object"==typeof i&&"object"==typeof l?e(annotatescrollbarEe1D33Fa._,annotatescrollbarEe1D33Fa.b):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../scroll/annotatescrollbar"],e):e(CodeMirror)}((function(e){function t(e,t,n,r){this.cm=e,this.options=r;var o={listenForChanges:!1};for(var i in r)o[i]=r[i];o.className||(o.className="CodeMirror-search-match"),this.annotation=e.annotateScrollbar(o),this.query=t,this.caseFold=n,this.gap={from:e.firstLine(),to:e.lastLine()+1},this.matches=[],this.update=null,this.findMatches(),this.annotation.update(this.matches);var l=this;e.on("change",this.changeHandler=function(e,t){l.onChange(t)})}e.defineExtension("showMatchesOnScrollbar",(function(e,n,r){return"string"==typeof r&&(r={className:r}),r||(r={}),new t(this,e,n,r)}));function n(e,t,n){return e<=t?e:Math.max(t,e+n)}t.prototype.findMatches=function(){if(this.gap){for(var t=0;t<this.matches.length;t++){if((o=this.matches[t]).from.line>=this.gap.to)break;o.to.line>=this.gap.from&&this.matches.splice(t--,1)}for(var n=this.cm.getSearchCursor(this.query,e.Pos(this.gap.from,0),{caseFold:this.caseFold,multiline:this.options.multiline}),r=this.options&&this.options.maxMatches||1e3;n.findNext();){var o;if((o={from:n.from(),to:n.to()}).from.line>=this.gap.to)break;if(this.matches.splice(t++,0,o),this.matches.length>r)break}this.gap=null}},t.prototype.onChange=function(t){var r=t.from.line,o=e.changeEnd(t).line,i=o-t.to.line;if(this.gap?(this.gap.from=Math.min(n(this.gap.from,r,i),t.from.line),this.gap.to=Math.max(n(this.gap.to,r,i),t.from.line)):this.gap={from:t.from.line,to:o+1},i)for(var l=0;l<this.matches.length;l++){var a=this.matches[l],s=n(a.from.line,r,i);s!=a.from.line&&(a.from=e.Pos(s,a.from.ch));var f=n(a.to.line,r,i);f!=a.to.line&&(a.to=e.Pos(f,a.to.ch))}clearTimeout(this.update);var c=this;this.update=setTimeout((function(){c.updateAfterChange()}),250)},t.prototype.updateAfterChange=function(){this.findMatches(),this.annotation.update(this.matches)},t.prototype.clear=function(){this.cm.off("change",this.changeHandler),this.annotation.clear()}}));let a={};const s={exports:a};!function(e){"object"==typeof a&&"object"==typeof s?e(annotatescrollbarEe1D33Fa._):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){function t(t,n,o,i){if(o&&o.call){var l=o;o=null}else l=r(t,o,"rangeFinder");"number"==typeof n&&(n=e.Pos(n,0));var a=r(t,o,"minFoldSize");function s(e){var r=l(t,n);if(!r||r.to.line-r.from.line<a)return null;if("fold"===i)return r;for(var o=t.findMarksAt(r.from),s=0;s<o.length;++s)if(o[s].__isFold){if(!e)return null;r.cleared=!0,o[s].clear()}return r}var f=s(!0);if(r(t,o,"scanUp"))for(;!f&&n.line>t.firstLine();)n=e.Pos(n.line-1,0),f=s(!1);if(f&&!f.cleared&&"unfold"!==i){var c=function(e,t,n){var o=r(e,t,"widget");"function"==typeof o&&(o=o(n.from,n.to));if("string"==typeof o){var i=document.createTextNode(o);(o=document.createElement("span")).appendChild(i),o.className="CodeMirror-foldmarker"}else o&&(o=o.cloneNode(!0));return o}(t,o,f);e.on(c,"mousedown",(function(t){u.clear(),e.e_preventDefault(t)}));var u=t.markText(f.from,f.to,{replacedWith:c,clearOnEnter:r(t,o,"clearOnEnter"),__isFold:!0});u.on("clear",(function(n,r){e.signal(t,"unfold",t,n,r)})),e.signal(t,"fold",t,f.from,f.to)}}e.newFoldFunction=function(e,n){return function(r,o){t(r,o,{rangeFinder:e,widget:n})}},e.defineExtension("foldCode",(function(e,n,r){t(this,e,n,r)})),e.defineExtension("isFolded",(function(e){for(var t=this.findMarksAt(e),n=0;n<t.length;++n)if(t[n].__isFold)return!0})),e.commands.toggleFold=function(e){e.foldCode(e.getCursor())},e.commands.fold=function(e){e.foldCode(e.getCursor(),null,"fold")},e.commands.unfold=function(e){e.foldCode(e.getCursor(),{scanUp:!1},"unfold")},e.commands.foldAll=function(t){t.operation((function(){for(var n=t.firstLine(),r=t.lastLine();n<=r;n++)t.foldCode(e.Pos(n,0),{scanUp:!1},"fold")}))},e.commands.unfoldAll=function(t){t.operation((function(){for(var n=t.firstLine(),r=t.lastLine();n<=r;n++)t.foldCode(e.Pos(n,0),{scanUp:!1},"unfold")}))},e.registerHelper("fold","combine",(function(){var e=Array.prototype.slice.call(arguments,0);return function(t,n){for(var r=0;r<e.length;++r){var o=e[r](t,n);if(o)return o}}})),e.registerHelper("fold","auto",(function(e,t){for(var n=e.getHelpers(t,"fold"),r=0;r<n.length;r++){var o=n[r](e,t);if(o)return o}}));var n={rangeFinder:e.fold.auto,widget:"↔",minFoldSize:0,scanUp:!1,clearOnEnter:!0};function r(e,t,r){if(t&&void 0!==t[r])return t[r];var o=e.options.foldOptions;return o&&void 0!==o[r]?o[r]:n[r]}e.defineOption("foldOptions",null),e.defineExtension("foldOption",(function(e,t){return r(this,e,t)}))}));let f={};const c={exports:f};!function(e){"object"==typeof f&&"object"==typeof c?e(annotatescrollbarEe1D33Fa._):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./foldcode"],e):e(CodeMirror)}((function(e){e.defineOption("foldGutter",!1,(function(t,r,o){o&&o!=e.Init&&(t.clearGutter(t.state.foldGutter.options.gutter),t.state.foldGutter=null,t.off("gutterClick",s),t.off("changes",f),t.off("viewportChange",c),t.off("fold",u),t.off("unfold",u),t.off("swapDoc",f)),r&&(t.state.foldGutter=new n(function(e){!0===e&&(e={});null==e.gutter&&(e.gutter="CodeMirror-foldgutter");null==e.indicatorOpen&&(e.indicatorOpen="CodeMirror-foldgutter-open");null==e.indicatorFolded&&(e.indicatorFolded="CodeMirror-foldgutter-folded");return e}(r)),a(t),t.on("gutterClick",s),t.on("changes",f),t.on("viewportChange",c),t.on("fold",u),t.on("unfold",u),t.on("swapDoc",f))}));var t=e.Pos;function n(e){this.options=e,this.from=this.to=0}function r(e,n){for(var r=e.findMarks(t(n,0),t(n+1,0)),o=0;o<r.length;++o)if(r[o].__isFold){var i=r[o].find(-1);if(i&&i.line===n)return r[o]}}function o(e){if("string"==typeof e){var t=document.createElement("div");return t.className=e+" CodeMirror-guttermarker-subtle",t}return e.cloneNode(!0)}function i(e,n,i){var a=e.state.foldGutter.options,s=n-1,f=e.foldOption(a,"minFoldSize"),c=e.foldOption(a,"rangeFinder"),u="string"==typeof a.indicatorFolded&&l(a.indicatorFolded),d="string"==typeof a.indicatorOpen&&l(a.indicatorOpen);e.eachLine(n,i,(function(n){++s;var i=null,l=n.gutterMarkers;if(l&&(l=l[a.gutter]),r(e,s)){if(u&&l&&u.test(l.className))return;i=o(a.indicatorFolded)}else{var h=t(s,0),m=c&&c(e,h);if(m&&m.to.line-m.from.line>=f){if(d&&l&&d.test(l.className))return;i=o(a.indicatorOpen)}}(i||l)&&e.setGutterMarker(n,a.gutter,i)}))}function l(e){return new RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}function a(e){var t=e.getViewport(),n=e.state.foldGutter;n&&(e.operation((function(){i(e,t.from,t.to)})),n.from=t.from,n.to=t.to)}function s(e,n,o){var i=e.state.foldGutter;if(i){var l=i.options;if(o==l.gutter){var a=r(e,n);a?a.clear():e.foldCode(t(n,0),l)}}}function f(e){var t=e.state.foldGutter;if(t){var n=t.options;t.from=t.to=0,clearTimeout(t.changeUpdate),t.changeUpdate=setTimeout((function(){a(e)}),n.foldOnChangeTimeSpan||600)}}function c(e){var t=e.state.foldGutter;if(t){var n=t.options;clearTimeout(t.changeUpdate),t.changeUpdate=setTimeout((function(){var n=e.getViewport();t.from==t.to||n.from-t.to>20||t.from-n.to>20?a(e):e.operation((function(){n.from<t.from&&(i(e,n.from,t.from),t.from=n.from),n.to>t.to&&(i(e,t.to,n.to),t.to=n.to)}))}),n.updateViewportTimeSpan||400)}}function u(e,t){var n=e.state.foldGutter;if(n){var r=t.line;r>=n.from&&r<n.to&&i(e,r,r+1)}}}));let u={};const d={exports:u};!function(e){"object"==typeof u&&"object"==typeof d?e(annotatescrollbarEe1D33Fa._):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){e.registerHelper("fold","brace",(function(t,n){var r,o=n.line,i=t.getLine(o);function l(l){for(var a=n.ch,s=0;;){var f=a<=0?-1:i.lastIndexOf(l,a-1);if(-1!=f){if(1==s&&f<n.ch)break;if(r=t.getTokenTypeAt(e.Pos(o,f+1)),!/^(comment|string)/.test(r))return f+1;a=f-1}else{if(1==s)break;s=1,a=i.length}}}var a,s,f,c=l("{"),u=l("[");if(null!=c&&(null==u||u>c))f=c,a="{",s="}";else{if(null==u)return;f=u,a="[",s="]"}var d,h,m=1,g=t.lastLine();e:for(var p=o;p<=g;++p)for(var v=t.getLine(p),C=p==o?f:0;;){var L=v.indexOf(a,C),S=v.indexOf(s,C);if(L<0&&(L=v.length),S<0&&(S=v.length),(C=Math.min(L,S))==v.length)break;if(t.getTokenTypeAt(e.Pos(p,C+1))==r)if(C==L)++m;else if(!--m){d=p,h=C;break e}++C}if(null!=d&&o!=d)return{from:e.Pos(o,f),to:e.Pos(d,h)}})),e.registerHelper("fold","import",(function(t,n){function r(n){if(n<t.firstLine()||n>t.lastLine())return null;var r=t.getTokenAt(e.Pos(n,1));if(/\S/.test(r.string)||(r=t.getTokenAt(e.Pos(n,r.end+1))),"keyword"!=r.type||"import"!=r.string)return null;for(var o=n,i=Math.min(t.lastLine(),n+10);o<=i;++o){var l=t.getLine(o).indexOf(";");if(-1!=l)return{startCh:r.end,end:e.Pos(o,l)}}}var o,i=n.line,l=r(i);if(!l||r(i-1)||(o=r(i-2))&&o.end.line==i-1)return null;for(var a=l.end;;){var s=r(a.line+1);if(null==s)break;a=s.end}return{from:t.clipPos(e.Pos(i,l.startCh+1)),to:a}})),e.registerHelper("fold","include",(function(t,n){function r(n){if(n<t.firstLine()||n>t.lastLine())return null;var r=t.getTokenAt(e.Pos(n,1));return/\S/.test(r.string)||(r=t.getTokenAt(e.Pos(n,r.end+1))),"meta"==r.type&&"#include"==r.string.slice(0,8)?r.start+8:void 0}var o=n.line,i=r(o);if(null==i||null!=r(o-1))return null;for(var l=o;;){if(null==r(l+1))break;++l}return{from:e.Pos(o,i+1),to:t.clipPos(e.Pos(l))}}))}));let h={};const m={exports:h};!function(e){"object"==typeof h&&"object"==typeof m?e(annotatescrollbarEe1D33Fa._):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){function t(t,n){var r=t.getLine(n),o=r.search(/\S/);return-1==o||/\bcomment\b/.test(t.getTokenTypeAt(e.Pos(n,o+1)))?-1:e.countColumn(r,null,t.getOption("tabSize"))}e.registerHelper("fold","indent",(function(n,r){var o=t(n,r.line);if(!(o<0)){for(var i=null,l=r.line+1,a=n.lastLine();l<=a;++l){var s=t(n,l);if(-1==s);else{if(!(s>o))break;i=l}}return i?{from:e.Pos(r.line,n.getLine(r.line).length),to:e.Pos(i,n.getLine(i).length)}:void 0}}))}));let g={};const p={exports:g};!function(e){"object"==typeof g&&"object"==typeof p?e(annotatescrollbarEe1D33Fa._):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){e.registerGlobalHelper("fold","comment",(function(e){return e.blockCommentStart&&e.blockCommentEnd}),(function(t,n){var r=t.getModeAt(n),o=r.blockCommentStart,i=r.blockCommentEnd;if(o&&i){for(var l,a=n.line,s=t.getLine(a),f=n.ch,c=0;;){var u=f<=0?-1:s.lastIndexOf(o,f-1);if(-1!=u){if(1==c&&u<n.ch)return;if(/comment/.test(t.getTokenTypeAt(e.Pos(a,u+1)))&&(0==u||s.slice(u-i.length,u)==i||!/comment/.test(t.getTokenTypeAt(e.Pos(a,u))))){l=u+o.length;break}f=u-1}else{if(1==c)return;c=1,f=s.length}}var d,h,m=1,g=t.lastLine();e:for(var p=a;p<=g;++p)for(var v=t.getLine(p),C=p==a?l:0;;){var L=v.indexOf(o,C),S=v.indexOf(i,C);if(L<0&&(L=v.length),S<0&&(S=v.length),(C=Math.min(L,S))==v.length)break;if(C==L)++m;else if(!--m){d=p,h=C;break e}++C}if(null!=d&&(a!=d||h!=l))return{from:e.Pos(a,l),to:e.Pos(d,h)}}}))}));let v={};const C={exports:v};!function(e){"object"==typeof v&&"object"==typeof C?e(annotatescrollbarEe1D33Fa._):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){var t="CodeMirror-activeline",n="CodeMirror-activeline-background",r="CodeMirror-activeline-gutter";function o(e){for(var o=0;o<e.state.activeLines.length;o++)e.removeLineClass(e.state.activeLines[o],"wrap",t),e.removeLineClass(e.state.activeLines[o],"background",n),e.removeLineClass(e.state.activeLines[o],"gutter",r)}function i(e,i){for(var l=[],a=0;a<i.length;a++){var s=i[a],f=e.getOption("styleActiveLine");if("object"==typeof f&&f.nonEmpty?s.anchor.line==s.head.line:s.empty()){var c=e.getLineHandleVisualStart(s.head.line);l[l.length-1]!=c&&l.push(c)}}(function(e,t){if(e.length!=t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!=t[n])return!1;return!0})(e.state.activeLines,l)||e.operation((function(){o(e);for(var i=0;i<l.length;i++)e.addLineClass(l[i],"wrap",t),e.addLineClass(l[i],"background",n),e.addLineClass(l[i],"gutter",r);e.state.activeLines=l}))}function l(e,t){i(e,t.ranges)}e.defineOption("styleActiveLine",!1,(function(t,n,r){var a=r!=e.Init&&r;n!=a&&(a&&(t.off("beforeSelectionChange",l),o(t),delete t.state.activeLines),n&&(t.state.activeLines=[],i(t,t.listSelections()),t.on("beforeSelectionChange",l)))}))})),window.CodeMirror=annotatescrollbarEe1D33Fa._}();
