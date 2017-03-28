const webpackConfig = require('../../../../build/webpack.server.conf');
const webpack = require('webpack');  // eslint-disable-line import/no-extraneous-dependencies

const compiler = webpack(webpackConfig);

module.exports = compiler;
