/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus"],function(a,s,e,i,n){var l=i.Plugin.inherit({klassName:"Cascadable",pluginName:"lark.menus.cascadable",_construct:function(s,i){this.overrided(s,i),e.multitier(s,a.mixin({mode:"cascade"},this.options))}});return i.register(l),n.Cascadable=l});
//# sourceMappingURL=sourcemaps/cascadable.js.map
