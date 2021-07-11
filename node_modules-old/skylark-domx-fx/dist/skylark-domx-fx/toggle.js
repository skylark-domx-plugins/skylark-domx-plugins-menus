/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./show","./hide"],function(n,e,i,l,r){return i.toggle=function(n,i,s){return e.isInvisible(n)?l(n,i,s):r(n,i,s),this}});
//# sourceMappingURL=sourcemaps/toggle.js.map
