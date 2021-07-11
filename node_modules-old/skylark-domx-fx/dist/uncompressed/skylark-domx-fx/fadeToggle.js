define([
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./fadeIn",
    "./fadeOut"
],function(langx,styler,fx,fadeIn,fadeOut) {

    /*   
     * Display or hide an element by animating its opacity.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {String} ceasing
     * @param {Function} callback
     */
    function fadeToggle(elm, speed, easing, callback) {
        if (styler.isInvisible(elm)) {
            fadeIn(elm, speed, easing, callback);
        } else {
            fadeOut(elm, speed, easing, callback);
        }
        return this;
    }


    return fx.fadeToggle = fadeToggle;
});