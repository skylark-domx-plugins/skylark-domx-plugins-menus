/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./animate"],function(n,a,s,t){return s.show=function(s,i,o){return a.show(s),i&&(!o&&n.isFunction(i)&&(o=i,i="normal"),a.css(s,"opacity",0),t(s,{opacity:1,scale:"1,1"},i,o)),this}});
//# sourceMappingURL=sourcemaps/show.js.map
