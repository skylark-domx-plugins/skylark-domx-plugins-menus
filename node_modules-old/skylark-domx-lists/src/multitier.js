define([
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