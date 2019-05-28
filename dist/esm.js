var TypeScripterPlugin = /** @class */ (function () {
    function TypeScripterPlugin(options) {
        this.startTime = Date.now();
        this.prevTimestamps = {};
    }
    TypeScripterPlugin.prototype.apply = function (compiler) {
        compiler.plugin('emit', function (compilation, callback) {
            var changedFiles = Object.keys(compilation.fileTimestamps).filter(function (watchfile) {
                return (this.prevTimestamps[watchfile] || this.startTime) < (compilation.fileTimestamps[watchfile] || Infinity);
            }.bind(this));
            this.prevTimestamps = compilation.fileTimestamps;
            callback();
        }.bind(this));
    };
    return TypeScripterPlugin;
}());

export default TypeScripterPlugin;
