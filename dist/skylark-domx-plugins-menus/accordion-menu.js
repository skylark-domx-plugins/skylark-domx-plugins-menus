/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus","./menu"],function(n,i,r,s,t,e){"use strict";var o=e.inherit({klassName:"AccordionMenu",pluginName:"lark.menus.accordion",_construct:function(i,s){e.prototype._construct.call(this,i,s),r.multitier(i,n.mixin({},this.options))}});return s.register(o),t.AccordionMenu=o});
//# sourceMappingURL=sourcemaps/accordion-menu.js.map
