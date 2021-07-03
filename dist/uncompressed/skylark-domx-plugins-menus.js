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
define('skylark-domx-plugins-menus/accordion-menu',[
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
 define('skylark-domx-plugins-menus/cascade-menu',[
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
 define('skylark-domx-plugins-menus/tree-menu',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus",
  "skylark-domx-plugins-toggles"
],function(langx,$,lists,plugins,menus){
  'use strict'


  var TreeMenu = plugins.Plugin.inherit({
    klassName : "Tree",

    pluginName : "lark.menus.tree",

    _construct : function(elm,options) {
        plugins.Plugin.prototype._construct.call(this,elm,options);

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
    "./tree-menu"
], function(menus) {
    return menus;
});
define('skylark-domx-plugins-menus', ['skylark-domx-plugins-menus/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-plugins-menus.js.map
