/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./animate"],function(n,a,i,t){return i.fade=function(a,i,e,r){return n.isFunction(e)&&(r=e,e={}),t(a,{opacity:i},(e=e||{}).duration,e.easing,r),this}});
//# sourceMappingURL=sourcemaps/fade.js.map
