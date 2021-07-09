/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-plugins-menus/menus',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("domx.plugins.menus");
});
define('skylark-domx-plugins-menus/menu',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus"
],function(langx,$,lists,plugins,menus){
  'use strict'


  var Menu = plugins.Plugin.inherit({
    klassName : "Menu",

    pluginName : "lark.menus.menu",

    options : {
      template : "",

      classes : {
        base : "lark-menu"
      },

      selectors : {
        container : null
      },

      item : {
        templates : {
          general : '<li class="menu-item"><a href="#" class="link"><%= title %></a></li>',
          separator : "",
          hasChildren : '<li class="menu-item hasChildren"><a href="#" class="link"><%= title %></a><ul class="submenu"></ul>',
        },

        classes : {
          base : "menu-item",
          hasChildren : "hasChildren"
        }
      },

      children : {
        template : "<ul></ul>",
        classes : {
          base : "submenu"
        },
        selector : "> .submenu"
      },

      data : {
        ///items : []
      },

      onAction : null
    },

    _construct : function(elm,options) {
        plugins.Plugin.prototype._construct.call(this,elm,options);

        this._$container = this.$(this.options.selectors.container);

        if (this.options.onAction) {
          this.listenTo(this._$container,"click",`.${this.options.item.classes.base}`,(e)=>{
              var itemData = $(e.currentTarget).data("item");
              this.options.onAction(itemData);

          });
        }

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
      if (!this._renderGeneralItemHtml) {
        let itemTpl = this.options.item.templates.general;
        if (langx.isString(itemTpl)) {
          this._renderGeneralItemHtml = langx.template(itemTpl);
        } else if (langx.isFunction(itemTpl)) {
          this._renderGeneralItemHtml = itemTpl;
        }
      }
      return $(this._renderGeneralItemHtml(itemData));
    },

    renderHasChildrenMenuItem : function(itemData) {
      if (!this._renderHasChildrenItemHtml) {
        let itemTpl = this.options.item.templates.hasChildren;
        if (langx.isString(itemTpl)) {
          this._renderHasChildrenItemHtml = langx.template(itemTpl);
        } else if (langx.isFunction(itemTpl)) {
          this._renderHasChildrenItemHtml = itemTpl;
        }
      }

      return $(this._renderHasChildrenItemHtml(itemData));
    }   


  });


  plugins.register(Menu);

  return menus.Menu = Menu; 
});
define('skylark-domx-plugins-menus/accordion-menu',[
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

        lists.multitier(elm,langx.mixin({
          togglable : true
        },this.options));
    }

  });


  plugins.register(AccordionMenu);

  return menus.AccordionMenu = AccordionMenu; 
});
define('skylark-domx-plugins-menus/cascade-menu',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus",
  "./menu"
],function(langx,$,lists,plugins,menus,Menu){
  'use strict'

  var CascadeMenu = Menu.inherit({
    klassName : "CascadeMenu",

    pluginName : "lark.menus.cascade",

    _construct : function(elm,options) {
        Menu.prototype._construct.call(this,elm,options);

        lists.multitier(elm,langx.mixin({
          togglable : true
        },this.options));
    }

  });


  plugins.register(CascadeMenu);

  return menus.CascadeMenu = CascadeMenu;	
});
define('skylark-domx-plugins-menus/nav-menu',[
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

    options : {
      item : {
        templates : {
        } 
      }
    },

    _construct : function(elm,options) {
        Menu.prototype._construct.call(this,elm,options);

        if (this.options.data.items) {
          this.resetItems(this.options.data.items);
        }

        lists.multitier(elm,langx.mixin({
          /*
          show : function($el) {
            $el;
          },

          hide : function($el) {
            $el;

          },

          toggle : function($el) {
            $el;

          }
          */
        },this.options));
    },

    resetItems : function(itemsData) {
      let self = this;

      function renderItem(itemData,$container) {
        let $item;
        if (itemData.children) {
          $item = self.renderHasChildrenMenuItem(itemData);
        } else {
          $item = self.renderGeneralMenuItem(itemData);
        }

        $item.data("item",itemData);
        $container.append($item)

        if (itemData.children) {
          let $childrenContainer = $item.find(self.options.children.selector);
          itemData.children.forEach((childItemData) => {
            renderItem(childItemData,$childrenContainer);            
          });
        }
      }
        
      let $itemsContainer = this.$(this.options.selectors.container)

      itemsData.forEach((itemData)=>{
        renderItem(itemData,$itemsContainer);
      });
    }

  });


  plugins.register(NavMenu);

  return menus.NavMenu = NavMenu;	
});
 define('skylark-domx-plugins-menus/tree-menu',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus",
  "./menu",
  "skylark-domx-plugins-toggles"
],function(langx,$,lists,plugins,menus,Menu){
  'use strict'

  var TreeMenu = Menu.inherit({
    klassName : "Tree",

    pluginName : "lark.menus.tree",

    _construct : function(elm,options) {
        Menu.prototype._construct.call(this,elm,options);

        lists.multitier(elm,langx.mixin({
          hide : function($el) {
            $el.plugin("lark.toggles.collapse").hide();
          },
          toggle : function($el) {
            $el.plugin("lark.toggles.collapse").toggle();
          }
        },this.options));
    }

  });


  plugins.register(TreeMenu);

  return menus.TreeMenu = TreeMenu;	
});
define('skylark-domx-plugins-menus/main',[
    "./menus",
    "./accordion-menu",
    "./cascade-menu",
    "./nav-menu",
    "./tree-menu"
], function(menus) {
    return menus;
});
define('skylark-domx-plugins-menus', ['skylark-domx-plugins-menus/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-plugins-menus.js.map
