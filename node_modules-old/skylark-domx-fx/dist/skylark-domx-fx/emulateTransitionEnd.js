/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","./fx"],function(n,t,r,e){return e.emulateTransitionEnd=function(n,e){var i=!1;return r.one(n,"transitionEnd",function(){i=!0}),setTimeout(function(){i||r.trigger(n,t.support.transition.end)},e),this}});
//# sourceMappingURL=sourcemaps/emulateTransitionEnd.js.map
