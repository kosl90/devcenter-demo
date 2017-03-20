// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

const projectRoot = path.resolve(__dirname, '..');
const clientRoot = path.resolve(__dirname, '../client');
const serverRoot = path.resolve(__dirname, '../server');
const staticRoot = path.resolve(__dirname, '../static');

const env = process.env.NODE_ENV || 'development';

// TODO: remove build and dev.
const config = {
  isProd: env === 'production',
  isDev: env === 'development',
  isTest: env === 'test',
  projectRoot,
  clientRoot,
  serverRoot,
  staticRoot,
  viewDirectory: './views',
  sessionStore: require('./session'),
  server: Object.assign({
    type: 'http',  // http/https/http2
  }, require('./server'), {
      host: 'localhost',
      port: 8080,
    }),
  build: {
    env: require('./env/prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./env/dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};

// TODO: test, work?
Object.freeze(config);

module.exports = config;
