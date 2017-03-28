var webpack = require('webpack');
var merge = require('webpack-merge');
var VueSSRPlugin = require('vue-ssr-webpack-plugin');
var baseConfig = require('./webpack.base.conf');
var config = require('../config');

var webpackConfig = merge(baseConfig, {
  target: 'node',
  devtool: false,
  entry: {
    server: './src/server/server-entry.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"',
    }),
    new VueSSRPlugin({
      entry: 'server',
    }),
  ],
  externals: Object.keys(require('../package.json').dependencies),
});

module.exports = webpackConfig;
