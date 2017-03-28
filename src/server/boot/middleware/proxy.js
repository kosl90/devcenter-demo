/* eslint-disable import/no-extraneous-dependencies */
const proxyMiddleware = require('http-proxy-middleware');
const config = require('../../config');

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = process.env.NODE_ENV === 'development' ? config.dev.proxyTable : {};

// make sure there is a valid middleware
const proxy = [(req, res, next) => next()];

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {
      target: options,
    };
  }
  proxy.push(proxyMiddleware(context, options));
});


module.exports = proxy;
