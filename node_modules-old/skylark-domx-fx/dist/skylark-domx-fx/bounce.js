/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./fx","./animate"],function(e,t,n,i,o){return i.bounce=function(i,r,s){var u,a,c,p,f=r.mode,h="hide"===f,d="show"===f,l=r.direction||"up",m=r.distance,y=r.times||5,k=2*y+(d||h?1:0),v=r.duration/k,g=r.easing,w="up"===l||"down"===l?"top":"left",x="up"===l||"left"===l,b=0,z=e.Deferred,D=[];if(c=n.css(i,w),!m){var M=t.size(i);m=("top"===w?M.height:M.width)/3}function P(e,t,n,i){return function(){var r=new z;return o(e,t,n,i,function(){r.resolve()}),r.promise}}for(p=t.relativePosition(i)[w],d&&((a={opacity:1})[w]=c,n.css(i,"opacity",0),n.css(i,w,p+(x?2*-m:2*m)),D.push(P(i,a,v,g))),h&&(m/=Math.pow(2,y-1)),(a={})[w]=c;b<y;b++)(u={})[w]=p+(x?-m:m),D.push(P(i,u,v,g)),D.push(P(i,a,v,g)),m=h?2*m:m/2;return h&&((u={opacity:0})[w]=p+(x?-1*m:m),D.push(P(i,u,v,g))),D.push(s),D.reduce(function(e,t,n,i){return e.then(t)},z.resolve()),this}});
//# sourceMappingURL=sourcemaps/bounce.js.map
