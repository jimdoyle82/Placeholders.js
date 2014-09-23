(function ($) {

    "use strict";

    var originalValFn = $.fn.val,
        originalPropFn = $.fn.prop;

    if (!Placeholders.nativeSupport) {

        $.fn.val = function (val) {
            var originalValue = originalValFn.apply(this, arguments).toString(),
                placeholder = this.eq(0).data("placeholder-value").toString(),
                wasEdited = this.eq(0).data("was-edited");
            // Once the user has edited the field once, it no longer returns an empty string
            if (this.is(":focus")) {
                this.eq(0).data("was-edited", true);
            }
            if (val === undefined && this.eq(0).data("placeholder-active") && originalValue === placeholder && !wasEdited) {
                return "";
            }
            return originalValue;
        };

        $.fn.prop = function (name, val) {
            if (val === undefined && this.eq(0).data("placeholder-active") && name === "value") {
                return "";
            }
            return originalPropFn.apply(this, arguments);
        };
    }

}(jQuery));
