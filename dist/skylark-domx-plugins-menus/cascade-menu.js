/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus","./menu"],function(s,e,n,a,t,i){"use strict";var r=i.inherit({klassName:"CascadeMenu",pluginName:"lark.menus.cascade",_construct:function(e,a){i.prototype._construct.call(this,e,a),n.multitier(e,s.mixin({},this.options))}});return a.register(r),t.CascadeMenu=r});
//# sourceMappingURL=sourcemaps/cascade-menu.js.map
