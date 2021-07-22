define([
  "skylark-langx/langx",
  "skylark-devices-keyboard/keys",
  "skylark-domx-noder",
  "skylark-domx-styler",
  "skylark-domx-query",
  "skylark-domx-lists",
  "skylark-domx-plugins-base",
  "./menus",
  "./menu"
],function(langx,keys,noder,styler, $,lists,plugins,menus,Menu){
  'use strict'

  	var PopupMenu = Menu.inherit({

    	klassName : "PopupMenu",

    	pluginName : "lark.menus.popup",

		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-caret-1-e"
			},
			///items: "> *",
			///menus: "ul",
			position: {
				my: "left top",
				at: "right top"
			},

			role: "menu",

			classes : {
				base : "ui-menu"
			},

			item : {
				classes : {
					base : "ui-menu-item"
				},
				selector : "> *"
			},

			// Callbacks
			blur: null,
			focus: null,
			select: null
		},

    	_construct : function(elm,options) {
        	Menu.prototype._construct.call(this,elm,options);
			this.element = this.$();

			this.activeMenu = this.element;

			// Flag used to prevent firing of the click handler
			// as the event bubbles up through nested menus
			this.mouseHandled = false;
			this.lastMousePosition = { x: null, y: null };
			this.element
				.attr( {
					role: this.options.role,
					tabIndex: 0
				} );

			this.element.addClass( "ui-menu ui-widget ui-widget-content" );
			this.listenTo(this.element, {

				// Prevent focus from sticking to links inside menu after clicking
				// them (focus should always stay on UL during navigation).
				"mousedown .ui-menu-item": function( event ) {
					event.preventDefault();

					this._activateItem( event );
				},
				"click .ui-menu-item": function( event ) {
					var target = $( event.target );
					//var active = $( $.ui.safeActiveElement( this.document[ 0 ] ) );
					var active = $(noder.active());
					if ( !this.mouseHandled && target.not( ".ui-state-disabled" ).length ) {
						this.select( event );

						// Only set the mouseHandled flag if the event will bubble, see #9469.
						if ( !event.isPropagationStopped() ) {
							this.mouseHandled = true;
						}

						// Open submenu on click
						if ( target.has( ".ui-menu" ).length ) {
							this.expand( event );
						} else if ( !this.element.is( ":focus" ) &&
								active.closest( ".ui-menu" ).length ) {

							// Redirect focus to the menu
							this.element.trigger( "focus", [ true ] );

							// If the active item is on the top level, let it stay active.
							// Otherwise, blur the active item since it is no longer visible.
							if ( this.active && this.active.parents( ".ui-menu" ).length === 1 ) {
								clearTimeout( this.timer );
							}
						}
					}
				},
				"mouseenter .ui-menu-item": "_activateItem",
				"mousemove .ui-menu-item": "_activateItem",
				"mouseleave": "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				"focus": function( event, keepActiveItem ) {

					// If there's already an active item, keep it active
					// If not, activate the first item
					var item = this.active || this._menuItems().first();

					if ( !keepActiveItem ) {
						this.focus( event, item );
					}
				},
				"blur": function( event ) {
					this._delay( function() {
						var notContained = !langx.contains(
							this.element[ 0 ],
							//$.ui.safeActiveElement( this.document[ 0 ] )
							noder.active()
						);
						if ( notContained ) {
							this.collapseAll( event );
						}
					} );
				},
				"keydown": "_keydown"
			} );

			this.refresh();

			// Clicks outside of a menu collapse any open menus
			this.listenTo( $(document), {
				click: function( event ) {
					if ( this._closeOnDocumentClick( event ) ) {
						this.collapseAll( event, true );
					}

					// Reset the mouseHandled flag
					this.mouseHandled = false;
				}
			} );
		},

		_activateItem: function( event ) {

			// Ignore mouse events while typeahead is active, see #10458.
			// Prevents focusing the wrong item when typeahead causes a scroll while the mouse
			// is over an item in the menu
			if ( this.previousFilter ) {
				return;
			}

			// If the mouse didn't actually move, but the page was scrolled, ignore the event (#9356)
			if ( event.clientX === this.lastMousePosition.x &&
					event.clientY === this.lastMousePosition.y ) {
				return;
			}

			this.lastMousePosition = {
				x: event.clientX,
				y: event.clientY
			};

			var actualTarget = $( event.target ).closest( ".ui-menu-item" ),
				target = $( event.currentTarget );

			// Ignore bubbled events on parent items, see #11641
			if ( actualTarget[ 0 ] !== target[ 0 ] ) {
				return;
			}

			// If the item is already active, there's nothing to do
			if ( target.is( ".ui-state-active" ) ) {
				return;
			}

			// Remove ui-state-active class from siblings of the newly focused menu item
			// to avoid a jump caused by adjacent elements both having a class with a border
			///this._removeClass( target.siblings().children( ".ui-state-active" ),
			///	null, "ui-state-active" );
			target.siblings().children( ".ui-state-active" ).removeClass("ui-state-active");
			this.focus( event, target );
		},

		_destroy: function() {
			var items = this.element.find( ".ui-menu-item" )
					.removeAttr( "role aria-disabled" ),
				submenus = items.children( ".ui-menu-item-wrapper" )
					.removeUniqueId()
					.removeAttr( "tabIndex role aria-haspopup" );

			// Destroy (sub)menus
			this.element
				.removeAttr( "aria-activedescendant" )
				.find( ".ui-menu" ).addBack()
					.removeAttr( "role aria-labelledby aria-expanded aria-hidden aria-disabled " +
						"tabIndex" )
					.removeUniqueId()
					.show();

			submenus.children().each( function() {
				var elem = $( this );
				if ( elem.data( "ui-menu-submenu-caret" ) ) {
					elem.remove();
				}
			} );
		},

		_keydown: function( event ) {
			var match, prev, character, skip,
				preventDefault = true;

			switch ( event.keyCode ) {
			case keys.PAGE_UP:
				this.previousPage( event );
				break;
			case keys.PAGE_DOWN:
				this.nextPage( event );
				break;
			case keys.HOME:
				this._move( "first", "first", event );
				break;
			case keys.END:
				this._move( "last", "last", event );
				break;
			case keys.UP:
				this.previous( event );
				break;
			case keys.DOWN:
				this.next( event );
				break;
			case keys.LEFT:
				this.collapse( event );
				break;
			case keys.RIGHT:
				if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
					this.expand( event );
				}
				break;
			case keys.ENTER:
			case keys.SPACE:
				this._activate( event );
				break;
			case keys.ESC:
				this.collapse( event );
				break;
			default:
				preventDefault = false;
				prev = this.previousFilter || "";
				skip = false;

				// Support number pad values
				character = event.keyCode >= 96 && event.keyCode <= 105 ?
					( event.keyCode - 96 ).toString() : String.fromCharCode( event.keyCode );

				clearTimeout( this.filterTimer );

				if ( character === prev ) {
					skip = true;
				} else {
					character = prev + character;
				}

				match = this._filterMenuItems( character );
				match = skip && match.index( this.active.next() ) !== -1 ?
					this.active.nextAll( ".ui-menu-item" ) :
					match;

				// If no matches on the current filter, reset to the last character pressed
				// to move down the menu to the first item that starts with that character
				if ( !match.length ) {
					character = String.fromCharCode( event.keyCode );
					match = this._filterMenuItems( character );
				}

				if ( match.length ) {
					this.focus( event, match );
					this.previousFilter = character;
					this.filterTimer = this._delay( function() {
						delete this.previousFilter;
					}, 1000 );
				} else {
					delete this.previousFilter;
				}
			}

			if ( preventDefault ) {
				event.preventDefault();
			}
		},

		_activate: function( event ) {
			if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
				if ( this.active.children( "[aria-haspopup='true']" ).length ) {
					this.expand( event );
				} else {
					this.select( event );
				}
			}
		},

		refresh: function() {
			var menus, items, newSubmenus, newItems, newWrappers,
				that = this,
				icon = this.options.icons.submenu,
				//submenus = this.element.find( this.options.menus );
				submenus = this.element.find( this.options.submenu.selectors.descendant );

			///this._toggleClass( "ui-menu-icons", null, !!this.element.find( ".ui-icon" ).length );
			this.element.toggleClass("ui-menu-icons",!!this.element.find( ".ui-icon" ).length);


			// Initialize nested menus
			newSubmenus = submenus.filter( ":not(.ui-menu)" )
				.hide()
				.attr( {
					role: this.options.role,
					"aria-hidden": "true",
					"aria-expanded": "false"
				} )
				.each( function() {
					var menu = $( this ),
						item = menu.prev(),
						submenuCaret = $( "<span>" ).data( "ui-menu-submenu-caret", true );

					///that._addClass( submenuCaret, "ui-menu-icon", "ui-icon " + icon );
					submenuCaret.addClass(["ui-menu-icon", "ui-icon " + icon]);
					item
						.attr( "aria-haspopup", "true" )
						.prepend( submenuCaret );
					menu.attr( "aria-labelledby", item.attr( "id" ) );
				} );

			//this._addClass( newSubmenus, "ui-menu", "ui-widget ui-widget-content ui-front" );
			newSubmenus.addClass([ "ui-menu", "ui-widget", "ui-widget-content", "ui-front"]);

			menus = submenus.add( this.element );
			///items = menus.find( this.options.items );
			items = menus.find(this.options.item.selector);

			// Initialize menu-items containing spaces and/or dashes only as dividers
			items.not( ".ui-menu-item" ).each( function() {
				var item = $( this );
				if ( that._isDivider( item ) ) {
					///that._addClass( item, "ui-menu-divider", "ui-widget-content" );
					item.addClass(["ui-menu-divider", "ui-widget-content"] )
				}
			} );

			// Don't refresh list items that are already adapted
			newItems = items.not( ".ui-menu-item, .ui-menu-divider" );
			newWrappers = newItems.children()
				.not( ".ui-menu" )
					.attr( {
						tabIndex: -1,
						role: this._itemRole()
					} );
			newItems.addClass("ui-menu-item");
			newWrappers.addClass("ui-menu-item-wrapper");

			// Add aria-disabled attribute to any disabled menu item
			items.filter( ".ui-state-disabled" ).attr( "aria-disabled", "true" );

			// If the active item has been removed, blur the menu
			if ( this.active && !langx.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
				this.blur();
			}
		},

		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[ this.options.role ];
		},

		focus: function( event, item ) {
			var nested, focused, activeParent;
			this.blur( event, event && event.type === "focus" );

			this._scrollIntoView( item );

			this.active = item.first();

			focused = this.active.children( ".ui-menu-item-wrapper" );
			///this._addClass( focused, null, "ui-state-active" );
			focused.addClass("ui-state-active");

			// Only update aria-activedescendant if there's a role
			// otherwise we assume focus is managed elsewhere
			if ( this.options.role ) {
				this.element.attr( "aria-activedescendant", focused.attr( "id" ) );
			}

			// Highlight active parent menu item, if any
			activeParent = this.active
				.parent()
					.closest( ".ui-menu-item" )
						.children( ".ui-menu-item-wrapper" );
			///this._addClass( activeParent, null, "ui-state-active" );
			activeParent.addClass("ui-state-active" );

			if ( event && event.type === "keydown" ) {
				this._close();
			} else {
				this.timer = this._delay( function() {
					this._close();
				}, this.delay );
			}

			nested = item.children( ".ui-menu" );
			if ( nested.length && event && ( /^mouse/.test( event.type ) ) ) {
				this._startOpening( nested );
			}
			this.activeMenu = item.parent();

			///this._trigger( "focus", event, { item: item } );
			this.trigger("focus",{item : item})
		},

		_scrollIntoView: function( item ) {
			var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
			if ( this._hasScroll() ) {
				borderTop = parseFloat( styler.css( this.activeMenu[ 0 ], "borderTopWidth" ) ) || 0;
				paddingTop = parseFloat( styler.css( this.activeMenu[ 0 ], "paddingTop" ) ) || 0;
				offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
				scroll = this.activeMenu.scrollTop();
				elementHeight = this.activeMenu.height();
				itemHeight = item.outerHeight();

				if ( offset < 0 ) {
					this.activeMenu.scrollTop( scroll + offset );
				} else if ( offset + itemHeight > elementHeight ) {
					this.activeMenu.scrollTop( scroll + offset - elementHeight + itemHeight );
				}
			}
		},

		blur: function( event, fromFocus ) {
			if ( !fromFocus ) {
				clearTimeout( this.timer );
			}

			if ( !this.active ) {
				return;
			}

			///this._removeClass( this.active.children( ".ui-menu-item-wrapper" ),
			///	null, "ui-state-active" );
			this.active.children( ".ui-menu-item-wrapper" ).removeClass("ui-state-active");

			///this._trigger( "blur", event, { item: this.active } );
			this.trigger( "blur", { item: this.active } );
			this.active = null;
		},

		_startOpening: function( submenu ) {
			clearTimeout( this.timer );

			// Don't open if already open fixes a Firefox bug that caused a .5 pixel
			// shift in the submenu position when mousing over the caret icon
			if ( submenu.attr( "aria-hidden" ) !== "true" ) {
				return;
			}

			this.timer = this._delay( function() {
				this._close();
				this._open( submenu );
			}, this.delay );
		},

		_open: function( submenu ) {
			var position = langx.extend( {
				of: this.active
			}, this.options.position );

			clearTimeout( this.timer );
			this.element.find( ".ui-menu" ).not( submenu.parents( ".ui-menu" ) )
				.hide()
				.attr( "aria-hidden", "true" );

			submenu
				.show()
				.removeAttr( "aria-hidden" )
				.attr( "aria-expanded", "true" )
				.position( position );
		},

		collapseAll: function( event, all ) {
			clearTimeout( this.timer );
			this.timer = this._delay( function() {

				// If we were passed an event, look for the submenu that contains the event
				var currentMenu = all ? this.element :
					$( event && event.target ).closest( this.element.find( ".ui-menu" ) );

				// If we found no valid submenu ancestor, use the main menu to close all
				// sub menus anyway
				if ( !currentMenu.length ) {
					currentMenu = this.element;
				}

				this._close( currentMenu );

				this.blur( event );

				// Work around active item staying active after menu is blurred
				///this._removeClass( currentMenu.find( ".ui-state-active" ), null, "ui-state-active" );
				currentMenu.find( ".ui-state-active" ).removeClass("ui-state-active" );

				this.activeMenu = currentMenu;
			}, all ? 0 : this.delay );
		},

		// With no arguments, closes the currently active menu - if nothing is active
		// it closes all menus.  If passed an argument, it will search for menus BELOW
		_close: function( startMenu ) {
			if ( !startMenu ) {
				startMenu = this.active ? this.active.parent() : this.element;
			}

			startMenu.find( ".ui-menu" )
				.hide()
				.attr( "aria-hidden", "true" )
				.attr( "aria-expanded", "false" );
		},

		_closeOnDocumentClick: function( event ) {
			return !$( event.target ).closest( ".ui-menu" ).length;
		},

		_isDivider: function( item ) {

			// Match hyphen, em dash, en dash
			return !/[^\-\u2014\u2013\s]/.test( item.text() );
		},

		collapse: function( event ) {
			var newItem = this.active &&
				this.active.parent().closest( ".ui-menu-item", this.element );
			if ( newItem && newItem.length ) {
				this._close();
				this.focus( event, newItem );
			}
		},

		expand: function( event ) {
			var newItem = this.active && this._menuItems( this.active.children( ".ui-menu" ) ).first();

			if ( newItem && newItem.length ) {
				this._open( newItem.parent() );

				// Delay so Firefox will not hide activedescendant change in expanding submenu from AT
				this._delay( function() {
					this.focus( event, newItem );
				} );
			}
		},

		next: function( event ) {
			this._move( "next", "first", event );
		},

		previous: function( event ) {
			this._move( "prev", "last", event );
		},

		isFirstItem: function() {
			return this.active && !this.active.prevAll( ".ui-menu-item" ).length;
		},

		isLastItem: function() {
			return this.active && !this.active.nextAll( ".ui-menu-item" ).length;
		},

		_menuItems: function( menu ) {
			return ( menu || this.element )
				.find( this.options.items )
				.filter( ".ui-menu-item" );
		},

		_move: function( direction, filter, event ) {
			var next;
			if ( this.active ) {
				if ( direction === "first" || direction === "last" ) {
					next = this.active
						[ direction === "first" ? "prevAll" : "nextAll" ]( ".ui-menu-item" )
						.last();
				} else {
					next = this.active
						[ direction + "All" ]( ".ui-menu-item" )
						.first();
				}
			}
			if ( !next || !next.length || !this.active ) {
				next = this._menuItems( this.activeMenu )[ filter ]();
			}

			this.focus( event, next );
		},

		nextPage: function( event ) {
			var item, base, height;

			if ( !this.active ) {
				this.next( event );
				return;
			}
			if ( this.isLastItem() ) {
				return;
			}
			if ( this._hasScroll() ) {
				base = this.active.offset().top;
				height = this.element.height();
				this.active.nextAll( ".ui-menu-item" ).each( function() {
					item = $( this );
					return item.offset().top - base - height < 0;
				} );

				this.focus( event, item );
			} else {
				this.focus( event, this._menuItems( this.activeMenu )
					[ !this.active ? "first" : "last" ]() );
			}
		},

		previousPage: function( event ) {
			var item, base, height;
			if ( !this.active ) {
				this.next( event );
				return;
			}
			if ( this.isFirstItem() ) {
				return;
			}
			if ( this._hasScroll() ) {
				base = this.active.offset().top;
				height = this.element.height();
				this.active.prevAll( ".ui-menu-item" ).each( function() {
					item = $( this );
					return item.offset().top - base + height > 0;
				} );

				this.focus( event, item );
			} else {
				this.focus( event, this._menuItems( this.activeMenu ).first() );
			}
		},

		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop( "scrollHeight" );
		},

		select: function( event ) {

			// TODO: It should never be possible to not have an active item at this
			// point, but the tests don't trigger mouseenter before click.
			this.active = this.active || $( event.target ).closest( ".ui-menu-item" );
			var ui = { item: this.active };
			if ( !this.active.has( ".ui-menu" ).length ) {
				this.collapseAll( event, true );
			}
			///this._trigger( "select", event, ui );
			this.trigger( "select", ui );
		},

		_filterMenuItems: function( character ) {
			var escapedCharacter = character.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ),
				regex = new RegExp( "^" + escapedCharacter, "i" );

			return this.activeMenu
				.find( this.options.items )

					// Only match on items, not dividers or other content (#10571)
					.filter( ".ui-menu-item" )
						.filter( function() {
							return regex.test(
								langx.trim( $( this ).children( ".ui-menu-item-wrapper" ).text() ) );
						} );
		}
	} );

  plugins.register(PopupMenu);

  return menus.PopupMenu = PopupMenu;	

});
