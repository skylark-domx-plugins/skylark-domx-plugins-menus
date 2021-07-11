define([
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./animate"
],function(langx,styler,fx,animate) {
    /*   
     * Adjust the opacity of an element.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {Number or String} opacity
     * @param {String} easing
     * @param {Function} callback
     */
    function fade(elm, opacity,options, callback) {
        if (langx.isFunction(options)) {
            callback = options;
            options = {};
        }
        options = options || {};
        
        animate(elm, { opacity: opacity }, options.duration, options.easing, callback);
        return this;
    }


    return fx.fade = fade;
});