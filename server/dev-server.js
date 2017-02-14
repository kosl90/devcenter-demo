module.exports = (app, port) => {
  let webpack = require('webpack');
  // var opn = require('opn')
  let webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('../build/webpack.prod.conf') :
    require('../build/webpack.dev.conf');

  let compiler = webpack(webpackConfig);

  let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
  });

  let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
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

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')());

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);


  let uri = `http://localhost:${port}`;

  devMiddleware.waitUntilValid(() => {
    console.log(`> Listening at ${uri}\n`);
  });
};
