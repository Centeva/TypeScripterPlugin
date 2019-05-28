import { compile, compileFromFile } from 'json-schema-to-typescript';
import * as fs from "fs";

export interface Options {
  schemaFile: string
}

export default class TypeScripterPlugin {
    startTime = Date.now();
    prevTimestamps = {};
    options: Options;

    constructor(options: Options){
      this.options = options;
    }

    apply(compiler) {
      compiler.plugin('emit', function(compilation, callback) {
        
        var changedFiles = Object.keys(compilation.fileTimestamps).filter(function(watchfile) {
          return (this.prevTimestamps[watchfile] || this.startTime) < (compilation.fileTimestamps[watchfile] || Infinity);
        }.bind(this));
        this.prevTimestamps = compilation.fileTimestamps;

        // compile from file
        compileFromFile(this.options.schemaFile)
          .then(ts => fs.writeFileSync('foo.d.ts', ts))

        callback();
      }.bind(this));
    };
  }
  