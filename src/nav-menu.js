define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus",
  "./menu"
],function(langx,$,lists,plugins,menus,Menu){
  'use strict'

  var NavMenu = Menu.inherit({
    klassName : "NavMenu",

    pluginName : "lark.menus.nav",

    _construct : function(elm,options) {
        Menu.prototype._construct.call(this,elm,options);

        lists.multitier(elm,langx.mixin({
        },this.options));
    }

  });


  plugins.register(NavMenu);

  return menus.NavMenu = NavMenu;	
});