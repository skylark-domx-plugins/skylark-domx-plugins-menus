/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus"],function(e,t,n,r,s){var i=r.Plugin.inherit({klassName:"Menu",pluginName:"lark.menus.menu",options:{template:"",classes:{base:"lark-menu"},selectors:{},item:{templates:{general:"",separator:"",hasChildern:""}},chidren:{template:"<ul></ul>",classes:{base:"children-menu"}},data:{}},_construct:function(e,t){r.Plugin.prototype._construct.call(this,e,t)},renderMenuItemHtml:function(t){if(!this._renderItemHtml){let t=this.options.item.template;e.isString(t)?this._renderItemHtml=e.template(t):e.isFunction(t)&&(this._renderItemHtml=t)}return this._renderItemHtml(t)},renderGeneralMenuItem:function(t){if(!this._renderItemHtml){let t=this.options.item.template;e.isString(t)?this._renderItemHtml=e.template(t):e.isFunction(t)&&(this._renderItemHtml=t)}},renderHasChildrenMenuItem:function(e){}});return r.register(i),s.Menu=i});
//# sourceMappingURL=sourcemaps/menu.js.map
