/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./animate"],function(n,e,r,l){return r.scrollToTop=function(e,r,l,t){var a=parseInt(e.scrollTop),o=0,s=1e3*l/5,c=parseInt(r),i=setInterval(function(){++o<=s&&(e.scrollTop=(c-a)/s*o+a),o>=s+1&&(clearInterval(i),t&&n.debounce(t,1e3)())},5);return this}});
//# sourceMappingURL=sourcemaps/scrollToTop.js.map
