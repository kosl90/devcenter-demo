/* eslint-disable import/no-extraneous-dependencies */
const proxyMiddleware = require('http-proxy-middleware');
const config = require('../../config');

module.exports = (app) => {
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  const proxyTable = process.env.NODE_ENV === 'development' ? config.dev.proxyTable : {};

  // proxy api requests
  Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = {
        target: options,
      };
    }
    app.use(proxyMiddleware(context, options));
  });
};
