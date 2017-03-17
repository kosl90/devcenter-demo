var path = require('path');
var webpack = require('webpack');
var FriendlyErrors = require('friendly-errors-webpack-plugin');
var VueSSRPlugin = require('vue-ssr-webpack-plugin');
var config = require('../config');
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

var webpackConfig = {
  target: 'node',
  devtool: false,
  entry: {
    server: './server/server-entry.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: path.resolve(config.build.assetsRoot, 'server.bundle.js'),
    libraryTarget: 'commonjs2',
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          failOnError: true,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ].concat(utils.styleLoaders()),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '~src': resolve('client'),
      '~assets': resolve('client/assets'),
      '~style': resolve('client/style'),
      '~components': resolve('client/components'),
      '~containers': resolve('client/containers'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueSSRPlugin({
      entry: 'server',
    }),
    new FriendlyErrors(),
  ],
  externals: Object.keys(require('../package.json').dependencies),
};

module.exports = webpackConfig;
