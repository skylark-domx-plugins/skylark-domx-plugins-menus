/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus"],function(n,i,r,e,s){var o=e.Plugin.inherit({klassName:"AccordionMenu",pluginName:"lark.menus.accordion",_construct:function(i,e){this.overrided(i,e),r.multitier(i,n.mixin({},this.options))}});return e.register(o),s.AccordionMenu=o});
//# sourceMappingURL=sourcemaps/accordion-menu.js.map
