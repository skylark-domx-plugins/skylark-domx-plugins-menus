/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./fx","./animate"],function(n,e,t,s,r){return s.shake=function(t,s,u){var i=1,a=s.direction||"left",f=s.distance||20,o=s.times||3,c=2*o+1,l=Math.round(s.duration/c),d="up"===a||"down"===a?"top":"left",h="up"===a||"left"===a,p={},g={},k={},m={},v=n.Deferred;function x(n,e,t,s){return function(){var u=new v;return r(n,e,t,s,function(){u.resolve()}),u.promise}}for(start=e.relativePosition(t)[d],funcs=[],p[d]=start,g[d]=start+(h?-1:1)*f,k[d]=g[d]+(h?1:-1)*f*2,m[d]=k[d]+(h?-1:1)*f*2,funcs.push(x(t,g,l,s.easing));i<o;i++)funcs.push(x(t,k,l,s.easing)),funcs.push(x(t,m,l,s.easing));return funcs.push(x(t,p,l/2,s.easing)),funcs.push(u),funcs.reduce(function(n,e,t,s){return n.then(e)},v.resolve()),this}});
//# sourceMappingURL=sourcemaps/shake.js.map
