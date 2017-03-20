var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var baseConfig = require('./webpack.base.conf');
var utils = require('./utils')
var config = require('../config')

var isProduction = config.isProd;

var webpackConfig = merge(baseConfig, {
  entry: {
    index: './client/main.js',
    login: './client/login.js',
  },
  devtool: isProduction ?
    config.build.productionSourceMap ?
      '#source-map' :
      false
    : "#cheap-module-eval-source-map",
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"',
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(utils.htmlPluginConfig('index', isProduction ? ['vendor', 'manifest'] : [])),
    new HtmlWebpackPlugin(utils.htmlPluginConfig('login', isProduction ? ['vendor', 'manifest'] : []))
  ]
})


if (isProduction) {
  // extract css into its own file
  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  );
}


if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}


module.exports = webpackConfig;
