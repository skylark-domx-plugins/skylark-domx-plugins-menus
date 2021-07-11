/**
 * skylark-domx-lists - The skylark lists library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
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

define('skylark-domx-lists/lists',[
	"skylark-langx-ns",
	"skylark-domx-query",
	"skylark-domx-data",
	"skylark-domx-geom",
	"skylark-domx-finder",
	"skylark-domx-noder",
	"skylark-domx-styler"
],function(skylark){
	return skylark.attach("domx.lists");
});
define('skylark-domx-lists/multitier',[
	"skylark-langx",
	"skylark-domx-query",
	"./lists"
],function(langx,$,lists){
	function multitier(elm,options) {
		options = langx.mixin({
			classes : {
				active : "active",
				collapse : "collapse",
				in : "in",
			},

			selectors : {
				item : "li",                   // ".list-group-item"
				sublist : "ul",  // "> .list-group"
				hasSublist : ":has(ul)",
				toggler : " > a"
			},

			mode   : "",  // "tree" or "accordion" or "popover"

			levels : 2,

			multiExpand : false,

			show : function($el) {
				$el.show();
			},

			hide : function($el) {
				$el.hide();
			},

			toggle : function($el) {
				$el.toggle();
			}
		},options,true);

    var itemSelector = options.selectors.item,
        $items = $(itemSelector,elm),

        activeClass = options.classes.active,
        activeSelector = "." + activeClass,

		multitierMode = options.mode,

        sublistSelector = options.selectors.sublist;           
        multiExpand = options.multiExpand,
        togglerSelector = options.selectors.toggler,

        collapseClass = options.classes.collapse,
        inClass = options.classes.in,
        inSelector = "." + inClass,

        hide = options.hide,
        toggle = options.toggle;

     $items.has(sublistSelector).find(togglerSelector).on("click.multitier", function(e) {
          e.preventDefault();

          let $children;

          if (!multiExpand) {
              ///langx.scall($(this).closest(itemSelector).siblings().removeClass("active").children(sublistSelector+".in").plugin("domx.toggles.collapse"),"hide");
              $clildren = $(this).closest(itemSelector).siblings().removeClass(activeClass).children(sublistSelector+"."+options.classes.in);
              if ($children) {
	              hide($children);
              }
          }
          //$(this).closest(itemSelector).toggleClass(activeClass).children(sublistSelector).plugin("domx.toggles.collapse").toggle();
          $children = $(this).closest(itemSelector).toggleClass(activeClass).children(options.selectors.sublist);
          if ($children) {
	          toggle($children);
	      }
      });

      $items.filter(activeSelector).has(sublistSelector).children(sublistSelector).addClass(collapseClass).addClass(inClass);
      $items.not(activeSelector).has(sublistSelector).children(sublistSelector).addClass(collapseClass);


	}

	return lists.multitier = multitier
});
define('skylark-domx-lists/main',[
	"./lists",
	"./multitier"
],function(lists){
	return lists;
});
define('skylark-domx-lists', ['skylark-domx-lists/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-lists.js.map
