/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./fade"],function(n,a,s,r){return s.fadeIn=function(n,s,t){var e=a.css(n,"opacity");return e>0?a.css(n,"opacity",0):e=1,a.show(n),r(n,e,s,t),this}});
//# sourceMappingURL=sourcemaps/fadeIn.js.map
