/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./fadeIn","./fadeOut"],function(n,e,a,f,i){return a.fadeToggle=function(n,a,l,r){return e.isInvisible(n)?f(n,a,l,r):i(n,a,l,r),this}});
//# sourceMappingURL=sourcemaps/fadeToggle.js.map
