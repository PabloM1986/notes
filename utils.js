/**
 * Created by pablo on 22/06/14.
 */

module.exports.joinUrl = function () {
    var newUrl = "";
    if (arguments.length > 0 && (typeof arguments[0] == "string")) {
        var args = Array.prototype.slice.apply(arguments),
            startsWithSlash = args[0].indexOf("/") == 0;
        newUrl = args.map(function (each) {
            return each.replace(/^\/+|\/+$/, "");
        }).join("/");
        if (startsWithSlash) {
            newUrl = "/" + newUrl;
        }
    }
    return newUrl;
}
