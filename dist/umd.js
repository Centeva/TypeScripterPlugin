(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['webpack-typescripter-plugin'] = factory());
}(this, function () { 'use strict';

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

  return TypeScripterPlugin;

}));
