define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus"
],function(langx,$,lists,plugins,menus){


  var AccordionMenu = plugins.Plugin.inherit({
    klassName : "AccordionMenu",

    pluginName : "lark.menus.accordion",

    _construct : function(elm,options) {
        this.overrided(elm,options);

        lists.multitier(elm,langx.mixin({
        },this.options));
    }

  });


  plugins.register(AccordionMenu);

  return menus.AccordionMenu = AccordionMenu; 
});