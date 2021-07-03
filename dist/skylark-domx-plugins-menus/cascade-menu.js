/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus"],function(e,s,a,n,i){var r=n.Plugin.inherit({klassName:"CascadeMenu",pluginName:"lark.menus.cascade",_construct:function(s,n){this.overrided(s,n),a.multitier(s,e.mixin({mode:"cascade"},this.options))}});return n.register(r),i.CascadeMenu=r});
//# sourceMappingURL=sourcemaps/cascade-menu.js.map
