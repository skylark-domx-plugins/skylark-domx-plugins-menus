/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","skylark-domx-geom","skylark-domx-noder","skylark-domx-query","./fx","./animate","./show","./hide"],function(i,e,t,o,s,a,l,n,d){return a.explode=function(i,o,a){e.show(i),e.css(i,"visibility","hidden");var l,n,d,r,h,p=o.pieces?Math.round(Math.sqrt(o.pieces)):3,c=p,f="show"===o.mode,y=t.pagePosition(i),u=t.marginSize(i),v=Math.ceil(u.width/c),k=Math.ceil(u.height/p),m=[];function x(){m.push(this),m.length===p*c&&(e.css(i,{visibility:"visible"}),s(m).remove(),a())}for(var g=0;g<p;g++)for(d=y.top+g*k,h=g-(p-1)/2,l=0;l<c;l++)n=y.left+l*v,r=l-(c-1)/2,s(i).clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-l*v,top:-g*k}).parent().addClass(o.explodeClass||"ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:k,left:n+(f?r*v:0),top:d+(f?h*k:0),opacity:f?0:1}).animate({left:n+(f?0:r*v),top:d+(f?0:h*k),opacity:f?1:0},o.duration||500,o.easing,x);return this}});
//# sourceMappingURL=sourcemaps/explode.js.map
