/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","./fx","./slideDown","./slideUp"],function(e,n,i,l,g){return i.slideToggle=function(e,i,o){return 0==n.height(e)?l(e,i,o):g(e,i,o),this}});
//# sourceMappingURL=sourcemaps/slideToggle.js.map
