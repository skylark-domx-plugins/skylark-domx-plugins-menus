/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./animate"],function(n,i,a,e){return a.hide=function(a,t,l){return t?(!l&&n.isFunction(t)&&(l=t,t="normal"),e(a,{opacity:0,scale:"0,0"},t,function(){i.hide(a),l&&l.call(a)})):i.hide(a),this}});
//# sourceMappingURL=sourcemaps/hide.js.map
