const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const setupProxy = require('./proxy');
const setupSession = require('./session');
const setupDevServer = require('./dev-server');
const logger = require('../logger');
const config = require('../../config');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (app, port) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  setupProxy(app);
  setupSession(app);

  // TODO: set in config file or accordingly?
  // http://stackoverflow.com/questions/27906551/node-js-logging-use-morgan-and-winston
  app.use(morgan('tiny', { stream: logger.stream }));

  // serve pure static assets
  const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
  app.use(staticPath, express.static('./static'));

  if (isProd) {
    app.use(express.static('./dist'));
  }

  if (!isProd) {
    setupDevServer(app, port);
  }
};
