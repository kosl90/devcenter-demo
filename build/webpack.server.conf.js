var path = require('path');
var config = require('../config');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    server: './server/main.js',
  },
  output: {
    path: config.build.assetsPath,
    filename: 'server.js',
  },
  resolve: {
    alias: {
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'server')
        ],
        exclude: /node_modules/
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'server')
        ],
        exclude: /node_modules/
      }
    ]
  },
}
