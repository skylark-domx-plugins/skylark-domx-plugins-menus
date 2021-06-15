define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus"
],function(langx,$,lists,plugins,menus){


  var Foldable = plugins.Plugin.inherit({
    klassName : "Foldable",

    pluginName : "lark.menus.foldable",

    _construct : function(elm,options) {
        this.overrided(elm,options);

        lists.multitier(elm,langx.mixin({
        },this.options));
    }

  });


  plugins.register(Foldable);

  return menus.Foldable = Foldable; 
});