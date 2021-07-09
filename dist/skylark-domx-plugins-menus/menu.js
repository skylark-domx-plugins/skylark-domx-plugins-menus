/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus"],function(e,t,n,s,i){"use strict";var r=s.Plugin.inherit({klassName:"Menu",pluginName:"lark.menus.menu",options:{template:"",classes:{base:"lark-menu"},selectors:{container:null},item:{templates:{general:'<li class="menu-item"><a href="#" class="link"><%= title %></a></li>',separator:"",hasChildren:'<li class="menu-item hasChildren"><a href="#" class="link"><%= title %></a><ul class="submenu"></ul>'},classes:{base:"menu-item",hasChildren:"hasChildren"}},children:{template:"<ul></ul>",classes:{base:"submenu"},selector:"> .submenu"},data:{},onAction:null},_construct:function(e,n){s.Plugin.prototype._construct.call(this,e,n),this._$container=this.$(this.options.selectors.container),this.options.onAction&&this.listenTo(this._$container,"click",`.${this.options.item.classes.base}`,e=>{var n=t(e.currentTarget).data("item");this.options.onAction(n)})},renderMenuItemHtml:function(t){if(!this._renderItemHtml){let t=this.options.item.template;e.isString(t)?this._renderItemHtml=e.template(t):e.isFunction(t)&&(this._renderItemHtml=t)}return this._renderItemHtml(t)},renderGeneralMenuItem:function(n){if(!this._renderGeneralItemHtml){let t=this.options.item.templates.general;e.isString(t)?this._renderGeneralItemHtml=e.template(t):e.isFunction(t)&&(this._renderGeneralItemHtml=t)}return t(this._renderGeneralItemHtml(n))},renderHasChildrenMenuItem:function(n){if(!this._renderHasChildrenItemHtml){let t=this.options.item.templates.hasChildren;e.isString(t)?this._renderHasChildrenItemHtml=e.template(t):e.isFunction(t)&&(this._renderHasChildrenItemHtml=t)}return t(this._renderHasChildrenItemHtml(n))}});return s.register(r),i.Menu=r});
//# sourceMappingURL=sourcemaps/menu.js.map
