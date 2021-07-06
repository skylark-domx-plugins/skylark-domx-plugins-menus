define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus"
],function(langx,$,lists,plugins,menus){


  var Menu = plugins.Plugin.inherit({
    klassName : "Menu",

    pluginName : "lark.menus.menu",

    options : {
      template : "",

      classes : {
        base : "lark-menu"
      },

      selectors : {

      },

      item : {
        templates : {
          general : "",
          separator : "",
          hasChildern : ""
        } 
      },

      chidren : {
        template : "<ul></ul>",
        classes : {
          base : "children-menu"
        }
      },

      data : {
        ///items : []
      }
    },

    _construct : function(elm,options) {
        plugins.Plugin.prototype._construct.call(this,elm,options);

    },

    renderMenuItemHtml : function(itemData) {
      if (!this._renderItemHtml) {
        let itemTpl = this.options.item.template;
        if (langx.isString(itemTpl)) {
          this._renderItemHtml = langx.template(itemTpl);
        } else if (langx.isFunction(itemTpl)) {
          this._renderItemHtml = itemTpl;
        }
      }

      return this._renderItemHtml(itemData);
    },

    renderGeneralMenuItem : function(itemData) {
      if (!this._renderItemHtml) {
        let itemTpl = this.options.item.template;
        if (langx.isString(itemTpl)) {
          this._renderItemHtml = langx.template(itemTpl);
        } else if (langx.isFunction(itemTpl)) {
          this._renderItemHtml = itemTpl;
        }
      }
    },

    renderHasChildrenMenuItem : function(itemData) {

    }   


  });


  plugins.register(Menu);

  return menus.Menu = Menu; 
});