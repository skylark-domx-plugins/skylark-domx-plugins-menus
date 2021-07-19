/**
 * skylark-domx-plugins-menus - The skylark menu plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-menus/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-lists","skylark-domx-plugins-base","./menus","./menu"],function(e,a,s,i,n,r){"use strict";var l=r.inherit({klassName:"MegaMenu",pluginName:"lark.menus.mega",options:{menuBehaviour:"click",stickyHeader:!0,selector:a(this),caret:!1,caretArrows:[{up:"caret-up",down:"caret-down",upUrl:"",downUrl:""}],highlighter:!0,followingHighlighter:!1,highlightColor:"",textHighlighter:!1,textHighlighterColor:"",animation:!1,animationClass:""},_construct:function(e,s){r.prototype._construct.call(this,e,s);let i=this.options;i.selector;var n=a(".main-links ul li a"),l=a(".menu-dropdown .menu-item-wrapper"),t=[],o=[],h=(a("#"+l.attr("id")),defaults.caretArrows[0].up),d=defaults.caretArrows[0].down;if(!1===i.stickyHeader?a(".mega-menu").removeClass("sticky-header"):a(".mega-menu").addClass("sticky-header"),!0===i.caret)h=i.caretArrows[0].up,d=i.caretArrows[0].down;(i.caretArrows[0].up||i.caretArrows[0].down)&&(i.caretArrows[0].upUrl=null,i.caretArrows[0].downUrl=null),a("a[data-submenu]").append('<span class="caret '+d+'"></span>'),!0===i.caret&&""!==i.caretArrows[0].downUrl&&(a(".mega-menu span.caret").removeClass("undefined"),a(".mega-menu span.caret").addClass("caret-img down"),a(".mega-menu span.caret.caret-img.down").css({"background-image":"url("+i.caretArrows[0].downUrl+")"})),a("<style>\n            .mega-menu .main-links ul li a:hover{\n              border-color:"+i.highlightColor+"}\n          </style>").appendTo("head"),n.on(i.menuBehaviour,function(){n.removeClass("highlight"),n.css({"border-color":""})}),""===i.menuBehaviour&&(i.menuBehaviour="click"),n.each(function(e){var s=a(this).attr("data-submenu");t.push(a(this).attr("data-submenu")),a(this).on(i.menuBehaviour,function(){var r=jQuery.inArray(s,o),c=a(this).find(".caret.caret-img");(n.find("span").removeClass(h),n.find("span").addClass(d),t[e]!=o[r]||a(l[r]).hasClass("active")?(a(l[r]).removeClass("active"),a(this).find("span").removeClass(h),a(this).find("span").addClass(d)):(l.removeClass("active"),a(l[r]).addClass("active"),a(this).find("span").removeClass(d),a(this).find("span").addClass(h)),a(".menu-dropdown").find(".menu-item-wrapper").hasClass("active")&&(a(".mega-menu span.caret").addClass("down"),a(".mega-menu span.caret").css({"background-image":"url("+i.caretArrows[0].downUrl+")"})),c.hasClass("down")?(c.removeClass("down"),c.addClass("up"),c.css({"background-image":"url("+i.caretArrows[0].upUrl+")"})):(c.removeClass("up"),c.addClass("down"),c.css({"background-image":"url("+i.caretArrows[0].downUrl+")"})),(n.find("span").hasClass("caret-up")||a(this).find("span").hasClass("up")&&!a(this).hasClass("highlight"))&&(a(this).addClass("highlight"),a(this).css({"border-color":i.highlightColor})),l.hasClass("dropdown"))&&a("#"+o[r]+".dropdown").css({left:a(this).offset().left})})}),!0===i.followingHighlighter&&(a(".main-links ul").append('<div class="follow-highlighter"></div>'),n.mouseover(function(e,s){e.pageX,a(this).offset().left,a(this).innerWidth();a(".follow-highlighter").css({display:"block"}),a(".main-links ul").addClass("follow-highlighter-enabled"),a(".follow-highlighter").css({width:a(this).innerWidth(),left:a(this).offset().left,"background-color":i.highlightColor})})),a(".main-links ul").each(function(){a(this).mouseleave(function(){a(".main-links ul").removeClass("follow-highlighter-enabled"),a(".follow-highlighter").css({display:"none",left:a(n[0]).offset().left})})}),!1===i.highlighter&&(a(".main-links").addClass("disable-highlighter"),a(".follow-highlighter").remove()),!0===i.textHighlighter&&a(".main-links").addClass("text-highlighter"),i.textHighlighterColor&&a("style").append(".mega-menu .text-highlighter.main-links ul li a:hover{\n            color:"+i.textHighlighterColor+"}"),l.each(function(e){o.push(a(l[e]).attr("id"))}),!0===i.animation&&l.addClass(i.animationClass),a(".mobile-nav-icon a").click(function(){a(".follow-highlighter").remove(),a(".main-links").hasClass("active")?(a(".main-links").removeClass("active"),a(".menu-dropdown").hide()):(a(".main-links").addClass("active"),a(".menu-dropdown").show())}),a(".menu-item-wrapper").prepend('<a href="#" class="back-link">Back</a>'),a(window).resize(function(){a(window).width()<768?a(".mega-menu").hasClass("sticky-header")&&(a(".mega-menu").addClass("responsive-menu"),a(".main-links").css({"margin-top":a(".mobile-nav-icon").outerHeight()+"px"})):a(".main-links").css({"margin-top":"0px"})}),a(document).ready(function(){a(".back-link").on("click",function(){n.trigger("click"),a(n[n.length-1]).trigger("click")})})}});return i.register(l),n.MegaMenu=l});
//# sourceMappingURL=sourcemaps/mega-menu.js.map