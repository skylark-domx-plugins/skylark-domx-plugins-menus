/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus","./menu"],function(n,s,t,e,i,r){"use strict";var a=r.inherit({klassName:"NavMenu",pluginName:"lark.menus.nav",_construct:function(s,e){r.prototype._construct.call(this,s,e),t.multitier(s,n.mixin({},this.options))}});return e.register(a),i.NavMenu=a});
//# sourceMappingURL=sourcemaps/nav-menu.js.map
