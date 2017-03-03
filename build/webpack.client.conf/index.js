const env = process.env.NODE_ENV || 'development';

module.exports = env === 'development' ? require('./webpack.dev.conf') : require('./webpack.prod.conf');
