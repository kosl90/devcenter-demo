require('../build/check-versions')();
const config = require('../config');
const express = require('express');
const setupServer = require('./boot/setup-server');

const logger = require('./logger');


if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port || 8080;
const host = process.env.HOST || config.dev.host || 'localhost';
const isProd = process.env.NODE_ENV === 'production';


const app = express();
setupServer(app, port);

// TODO: extract routers.
app.post('/loginService', (rep, res) => {
  logger.warn(JSON.stringify(rep.body));
  res.sendStatus(200);
});


// TODO: server side render
function createRenderer(bundle) {
  /* eslint-disable global-require */
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
  });
}


app.listen(port, (err) => {
  if (err) {
    logger.error(err);
    return;
  }

  if (isProd) {
    logger.info(`listening at ${host}:${port}`);
  }
});
