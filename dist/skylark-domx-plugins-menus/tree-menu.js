/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus","./menu","skylark-domx-plugins-toggles"],function(s,e,t,l,n,i){"use strict";var r=i.inherit({klassName:"Tree",pluginName:"lark.menus.tree",_construct:function(e,l){i.prototype._construct.call(this,e,l),t.multitier(e,s.mixin({hide:function(e){e.plugin("lark.toggles.collapse").hide()},toggle:function(e){e.plugin("lark.toggles.collapse").toggle()}},this.options))}});return l.register(r),n.TreeMenu=r});
//# sourceMappingURL=sourcemaps/tree-menu.js.map
