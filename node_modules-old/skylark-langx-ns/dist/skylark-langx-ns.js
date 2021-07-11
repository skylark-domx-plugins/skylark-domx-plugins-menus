/**
 * skylark-langx-ns - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,r){var t=r.define,require=r.require,e="function"==typeof t&&t.amd,o=!e&&"undefined"!=typeof exports;if(!e&&!t){var a={};t=r.define=function(n,r,t){"function"==typeof t?(a[n]={factory:t,deps:r.map(function(r){return function(n,r){if("."!==n[0])return n;var t=r.split("/"),e=n.split("/");t.pop();for(var o=0;o<e.length;o++)"."!=e[o]&&(".."==e[o]?t.pop():t.push(e[o]));return t.join("/")}(r,n)}),resolved:!1,exports:null},require(n)):a[n]={factory:null,resolved:!0,exports:t}},require=r.require=function(n){if(!a.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var module=a[n];if(!module.resolved){var t=[];module.deps.forEach(function(n){t.push(require(n))}),module.exports=module.factory.apply(r,t)||null,module.resolved=!0}return module.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,require){n("skylark-langx-ns/_attach",[],function(){return function(n,r,t){"string"==typeof r&&(r=r.split("."));for(var e=r.length,o=n,a=0,s=r[a++];a<e;)o=o[s]=o[s]||{},s=r[a++];return o[s]=t||{},o[s]}}),n("skylark-langx-ns/ns",["./_attach"],function(n){var r={attach:function(t,e){return n(r,t,e)}};return r}),n("skylark-langx-ns/main",["./ns"],function(n){return n}),n("skylark-langx-ns",["skylark-langx-ns/main"],function(n){return n})}(t),!e){var s=require("skylark-langx-ns");o?module.exports=s:r.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-ns.js.map
