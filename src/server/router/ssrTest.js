const path = require('path');
const Router = require('express').Router;
const config = require('../config');
const logger = require('../logger');

const app = new Router();

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
// FIXME: window is not defined
app.get('/', (req, res, next) => {
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

module.exports = app;
