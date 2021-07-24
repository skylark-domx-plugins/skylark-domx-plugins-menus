define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus",
  "./menu"
],function(langx,$,lists,plugins,menus,Menu){
  'use strict'
  
   var AccordionMenu = Menu.inherit({
    klassName : "AccordionMenu",

    pluginName : "lark.menus.accordion",

    _construct : function(elm,options) {
        Menu.prototype._construct.call(this,elm,options);

        lists.multitier(elm, {
          togglable : true,

          classes : {
            active :  this.options.item.classes.active  // active
           /// collapse : "collapse",
           /// in : "in",
          },

          selectors : {
            item : this.options.item.selectors.general,          //li
            sublist : this.options.submenu.selectors.descendant, //"ul",
            hasSublist : this.options.item.selectors.hasChildren//":has(ul)",
            ///handler : " > a"
          },

          multiExpand : false

        });
    }

  });


  plugins.register(AccordionMenu);

  return menus.AccordionMenu = AccordionMenu; 
});