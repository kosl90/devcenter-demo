require('../build/check-versions')();
let config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
let path = require('path');
let express = require('express');
let webpack = require('webpack');
// var opn = require('opn')
let proxyMiddleware = require('http-proxy-middleware');
let webpackConfig = process.env.NODE_ENV === 'testing' ?
  require('../build/webpack.prod.conf') :
  require('../build/webpack.dev.conf');

let session = require('express-session');
// var RedisStore = require('connect-redis')(session);
let bodyParser = require('body-parser');

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.dev.proxyTable;

let app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));

const env = process.env;
// const sessionStore = new RedisStore({
//   host: env['sessionStoreHost'],
//   port: env['sessionStorePort'],
//   logErrors: true,
// });

app.use(session({
  // store: sessionStore,
  secret: env.secret,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 10,
    // secure: true,  // for https-enabled website.
  },
}));

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

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {
      target: options,
    };
  }
  app.use(proxyMiddleware(context, options));
});

app.get('/', (req, res, next) => {
  const url = req.url;
  console.log('sessionID:', req.sessionID);
  console.log('loginContext:', req.session.loginContext);
  if (!url.match(/\.js$|__webpack_hmr/)) {
    console.log(url);
    console.log(req.session.id);
  }
  next();
});

const loginContext = 'loginContext';

app.get('/login', (req, res) => {
  console.log('sessionID', req.sessionID);

  req.session.loginContext = loginContext;

  // NB: express-session rewrites the `request.end` function,
  // so that cookie is set accordingly, the session data will
  // be saved into `sessionStore`. The session data can be
  // fetched from `sessionStore` in the future, and the session
  // also will be touched automatically.
  res.sendStatus(200);
});


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

let uri = `http://localhost:${  port}`;

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${  uri  }\n`);
});

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  // when env is testing, don't need open it
  // if (process.env.NODE_ENV !== 'testing') {
  //   opn(uri)
  // }
});
