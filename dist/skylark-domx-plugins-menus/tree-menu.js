/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus","skylark-domx-plugins-toggles"],function(e,l,n,s,t){"use strict";var i=s.Plugin.inherit({klassName:"Tree",pluginName:"lark.menus.tree",_construct:function(l,t){s.Plugin.prototype._construct.call(this,l,t),n.multitier(l,e.mixin({hide:function(e){e.plugin("lark.toggles.collapse").hide()},toggle:function(e){e.plugin("lark.toggles.collapse").toggle()}},this.options))}});return s.register(i),t.TreeMenu=i});
//# sourceMappingURL=sourcemaps/tree-menu.js.map
