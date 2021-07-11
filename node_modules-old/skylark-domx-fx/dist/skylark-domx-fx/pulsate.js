/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./fx","./animate"],function(e,n,r,i,s){return i.pulsate=function(n,i,t){var o=i.mode,a="show"===o||!o,u=a||"hide"===o,c=2*(i.times||5)+(u?1:0),f=i.duration/c,l=0,d=1;(a||r.isInvisible(n))&&(r.css(n,"opacity",0),r.show(n),l=1);var h=e.Deferred,p=[];function m(e,n,r,i){return function(){var t=new h;return s(e,n,r,i,function(){t.resolve()}),t.promise}}for(;d<c;d++)p.push(m(n,{opacity:l},f,i.easing)),l=1-l;return p.push(m(n,{opacity:l},f,i.easing)),p.push(t),p.reduce(function(e,n,r,i){return e.then(n)},h.resolve()),this}});
//# sourceMappingURL=sourcemaps/pulsate.js.map
