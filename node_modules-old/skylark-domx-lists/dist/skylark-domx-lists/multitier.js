/**
 * skylark-domx-lists - The skylark lists library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx","skylark-domx-query","./lists"],function(s,l,e){return e.multitier=function(e,i){var t=(i=s.mixin({classes:{active:"active",collapse:"collapse",in:"in"},selectors:{item:"li",sublist:"ul",hasSublist:":has(ul)",toggler:" > a"},mode:"",levels:2,multiExpand:!1,show:function(s){s.show()},hide:function(s){s.hide()},toggle:function(s){s.toggle()}},i,!0)).selectors.item,a=l(t,e),o=i.classes.active,n="."+o,c=(i.mode,i.selectors.sublist);multiExpand=i.multiExpand,togglerSelector=i.selectors.toggler,collapseClass=i.classes.collapse,inClass=i.classes.in,inSelector="."+inClass,hide=i.hide,toggle=i.toggle,a.has(c).find(togglerSelector).on("click.multitier",function(s){let e;s.preventDefault(),multiExpand||($clildren=l(this).closest(t).siblings().removeClass(o).children(c+"."+i.classes.in),e&&hide(e)),(e=l(this).closest(t).toggleClass(o).children(i.selectors.sublist))&&toggle(e)}),a.filter(n).has(c).children(c).addClass(collapseClass).addClass(inClass),a.not(n).has(c).children(c).addClass(collapseClass)}});
//# sourceMappingURL=sourcemaps/multitier.js.map
