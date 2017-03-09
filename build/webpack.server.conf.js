var path = require('path');
var webpack = require('webpack');
var FriendlyErrors = require('friendly-errors-webpack-plugin');
var VueSSRPlugin = require('vue-ssr-webpack-plugin');
var config = require('../config');
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../');


module.exports = {
  target: 'node',
  devtool: false,
  entry: {
    server: './server/server-entry.js',
  },
  output: {
    path: config.build.assetsPath,
    filename: path.resolve(config.build.assetsRoot, 'server.bundle.js'),
    libraryTarget: 'commonjs2',
  },
  module: {
    noParse: /es6-promise\.js$/,
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ].concat(utils.styleLoaders()),
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '~src': path.resolve(__dirname, '../client'),
      '~assets': path.resolve(__dirname, '../client/assets'),
      '~style': path.resolve(__dirname, '../client/style'),
      '~components': path.resolve(__dirname, '../client/components'),
      '~containers': path.resolve(__dirname, '../client/containers'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env': config.dev.env,
      'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
      'process.env.VUE_ENV': '"server"',
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
    new webpack.NoErrorsPlugin(),
    new VueSSRPlugin({
      entry: 'server',
    }),
    new FriendlyErrors(),
  ],
    eslint: {
    formatter: require('eslint-friendly-formatter'),
    failOnError: true,
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  externals: Object.keys(require('../package.json').dependencies),
};
