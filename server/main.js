require('../build/check-versions')();
const express = require('express');
const path = require('path');
const config = require('../config');
const setupServer = require('./boot/setup-server');
const logger = require('./logger');


if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.server.port || 8080;
const hostname = process.env.HOST || config.server.hostname || 'localhost';
const serverType = config.server.type;

const app = express();
app.locals.port = port;
app.locals.hostname = hostname;
app.locals.scheme = serverType === 'http' ? 'http' : 'https';

setupServer(app);

function createRenderer(bundle) {
  /* eslint-disable global-require */
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
  });
}

// TODO: ssr
const bundlePath = path.resolve(__dirname, '../dist/server.bundle.js');
const render = createRenderer(bundlePath);  // eslint-disable-line

// TODO: extract routers.
app.post('/loginService', (rep, res) => {
  logger.info(JSON.stringify(rep.body));
  res.sendStatus(200);
});


app.listen(port, (err) => {
  if (err) {
    logger.error(err);
    return;
  }
});
