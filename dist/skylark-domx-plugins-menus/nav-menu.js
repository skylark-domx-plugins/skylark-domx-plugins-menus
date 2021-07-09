/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus","./menu"],function(e,t,n,i,s,r){"use strict";var a=r.inherit({klassName:"NavMenu",pluginName:"lark.menus.nav",options:{item:{templates:{}}},_construct:function(t,i){r.prototype._construct.call(this,t,i),this.options.data.items&&this.resetItems(this.options.data.items),n.multitier(t,e.mixin({},this.options))},resetItems:function(e){let t=this;let n=this.$(this.options.selectors.container);e.forEach(e=>{!function e(n,i){let s;if((s=n.children?t.renderHasChildrenMenuItem(n):t.renderGeneralMenuItem(n)).data("item",n),i.append(s),n.children){let i=s.find(t.options.children.selector);n.children.forEach(t=>{e(t,i)})}}(e,n)})}});return i.register(a),s.NavMenu=a});
//# sourceMappingURL=sourcemaps/nav-menu.js.map
