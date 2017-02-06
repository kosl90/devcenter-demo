require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ?
  require('./webpack.prod.conf') :
  require('./webpack.dev.conf')

var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
app.use(bodyParser.urlencoded({
  extended: true,
}))

const env = process.env;
const sessionStore = new RedisStore({
  host: env['sessionStoreHost'],
  port: env['sessionStorePort'],
  logErrors: true,
});

app.use(session({
  store: sessionStore,
  secret: env['secret'],
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 10,
    // secure: true,  // for https-enabled website.
  }
}));

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(context, options))
})

app.get('/', function (req, res, next) {
  const url = req.url;
  console.log('sessionID:', req.sessionID);
  console.log('loginContext:', req.session.loginContext);
  if (!url.match(/\.js$|__webpack_hmr/)) {
    console.log(url);
    console.log(req.session.id);
  }
  next();
})

const loginContext = 'loginContext';

app.get('/login', function (req, res) {
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
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
