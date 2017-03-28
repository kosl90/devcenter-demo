const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const proxy = require('./middleware/proxy');
const session = require('./middleware/session');
const logger = require('../logger');
const config = require('../config');
const loginServiceRouter = require('../router/loginService');
const ssrTestRouter = require('../router/ssrTest');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(...proxy);
  app.use(session);

  // TODO: set in config file or accordingly?
  // http://stackoverflow.com/questions/27906551/node-js-logging-use-morgan-and-winston
  app.use(morgan('tiny', { stream: logger.stream }));

  // serve pure static assets
  const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
  app.use(staticPath, express.static('./static'));

  if (isProd) {
    app.use(express.static('./dist'));
  }

  app.use('/loginService', loginServiceRouter);
  app.use('/test', ssrTestRouter);

  app.use((err, req, res, next) => { // eslint-disable-line
    res.sendStatus(500);
  });


  if (!isProd) {
    require('./dev/webpack.client')(app);  // eslint-disable-line
  }
};
