var path = require('path')
var webpack = require('webpack')
var FriendlyErrors = require('friendly-errors-webpack-plugin');
var config = require('../config')
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.config');
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
var isProduction = env === 'production';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

var webpackConfig = {
  // entry: {
  //   app: './client/main.js',
  //   login: './client/login.js',
  // },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        enforce: 'pre',
        include: [
          path.join(projectRoot, 'client')
        ],
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          failOnError: true,
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '~src': path.resolve(__dirname, '../client'),
      '~assets': path.resolve(__dirname, '../client/assets'),
      '~style': path.resolve(__dirname, '../client/style'),
      '~components': path.resolve(__dirname, '../client/components'),
      '~containers': path.resolve(__dirname, '../client/containers'),
    }
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
}

webpackConfig.module.rules = webpackConfig.module.rules.concat(utils.styleLoaders({
  sourceMap: isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap,
  extract: isProduction
}))
module.exports = webpackConfig;
