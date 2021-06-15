 define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus"
],function(langx,$,lists,plugins,menus){


  var Cascadable = plugins.Plugin.inherit({
    klassName : "Cascadable",

    pluginName : "lark.menus.cascadable",

    _construct : function(elm,options) {
        this.overrided(elm,options);

        lists.multitier(elm,langx.mixin({
          "mode" : "cascade"
        },this.options));
    }

  });


  plugins.register(Cascadable);

  return menus.Cascadable = Cascadable;	
});