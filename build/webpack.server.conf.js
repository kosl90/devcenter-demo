var path = require('path');
var config = require('../config');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    server: './server/server-entry.js',
  },
  output: {
    path: config.build.assetsPath,
    filename: path.resolve(config.build.assetsRoot, 'server.bundle.js'),
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
