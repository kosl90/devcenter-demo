/* eslint-disable import/no-extraneous-dependencies */
const historyAPIFallback = require('connect-history-api-fallback');
const webpack = require('webpack');  // eslint-disable-line
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../../../build/webpack.client.conf');

module.exports = (app) => {
  const clientCompiler = webpack(webpackConfig);

  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    serverSideRender: true,
  });

  const hotMiddleware = webpackHotMiddleware(clientCompiler, {
    log: () => { },
  });

  // force page reload when html-webpack-plugin template changes
  clientCompiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({
        action: 'reload',
      });
      cb();
    });
  });

  // handle fallback for HTML5 history API
  app.use(historyAPIFallback());

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  const uri = `http://${app.locals.hostname}:${app.locals.port}`;

  devMiddleware.waitUntilValid(() => {
    // eslint-disable-next-line
    console.log(`> Listening at ${uri}\n`);
  });
};

