const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const proxy = require('./middleware/proxy');
const session = require('./middleware/session');
const logger = require('../logger');
const config = require('../config');

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

  // TODO: extract routers.
  app.post('/loginService', (rep, res) => {
    logger.info(JSON.stringify(rep.body));
    res.sendStatus(200);
  });

  function createRenderer(bundle) {
    /* eslint-disable global-require */
    return require('vue-server-renderer').createBundleRenderer(bundle, {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
    });
  }

  const bundle = path.resolve(config.projectRoot, 'vue-ssr-bundle.json');
  const render = createRenderer(bundle);

  app.get('/test', (req, res, next) => {
    logger.info('render from server');

    render.renderToString(req, (err, html) => {
      if (err) {
        logger.error(`Render failed: ${err}\n${err.stack}`);
        next(err);
        return;
      }

      logger.info(html);
      res.send(html);
    });
  });

  app.use((err, req, res, next) => { // eslint-disable-line
    res.sendStatus(500);
  });


  if (!isProd) {
    require('./dev/webpack.client')(app);  // eslint-disable-line
  }
};
