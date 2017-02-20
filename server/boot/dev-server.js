/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const historyAPIFallback = require('connect-history-api-fallback');
const webpackConfig = process.env.NODE_ENV === 'testing' ?
  require('../../build/webpack.prod.conf') :
  require('../../build/webpack.dev.conf');

const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  // serverSideRender: true,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { },
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({
      action: 'reload',
    });
    cb();
  });
});


module.exports = (app, port) => {
  // handle fallback for HTML5 history API
  app.use(historyAPIFallback());

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  const uri = `http://localhost:${port}`;

  devMiddleware.waitUntilValid(() => {
    // eslint-disable-next-line
    console.log(`> Listening at ${uri}\n`);
  });
};
