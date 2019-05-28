import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/plugin.ts',
  output: [{
      file: 'dist/umd.js',
      name: 'webpack-typescripter-plugin',
      format: 'umd'
  },{
      file: 'dist/esm.js',
      format: 'esm'
  }],
  plugins: [
    typescript()
  ]
}