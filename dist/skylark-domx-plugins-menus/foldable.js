/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus"],function(l,e,i,n,s){var r=n.Plugin.inherit({klassName:"Foldable",pluginName:"lark.menus.foldable",_construct:function(e,n){this.overrided(e,n),i.multitier(e,l.mixin({},this.options))}});return n.register(r),s.Foldable=r});
//# sourceMappingURL=sourcemaps/foldable.js.map
