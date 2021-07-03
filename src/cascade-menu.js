 define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus"
],function(langx,$,lists,plugins,menus){


  var CascadeMenu = plugins.Plugin.inherit({
    klassName : "CascadeMenu",

    pluginName : "lark.menus.cascade",

    _construct : function(elm,options) {
        this.overrided(elm,options);

        lists.multitier(elm,langx.mixin({
          "mode" : "cascade"
        },this.options));
    }

  });


  plugins.register(CascadeMenu);

  return menus.CascadeMenu = CascadeMenu;	
});