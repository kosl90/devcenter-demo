require('../build/check-versions')();
let config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
let path = require('path');
let proxyMiddleware = require('http-proxy-middleware');
let express = require('express');

let session = require('express-session');
let bodyParser = require('body-parser');


// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port;

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';


let app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));


// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = isDev ? config.dev.proxyTable : {};

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


let sessionOpt = {
  secret: 'secret: →_→',  // TODO: get a better secret.
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 10,
    // secure: true,  // for https-enabled website.
  },
};

if (isProd) {
  /* eslint-disable global-require */
  const RedisStore = require('connect-redis')(session);

  const sessionStore = new RedisStore({
    host: config.sessionStore.host,
    port: config.sessionStore.port,
    logErrors: true,
  });
  sessionOpt.store = sessionStore;
}

app.use(session(sessionOpt));

// TODO: server side render
function createRenderer(bundle) {
  /* eslint-disable global-require */
  return require('vue-server-render').createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
  });
}


if (isProd) {
  app.use(express.static('./dist'));
}


// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));
if (!isProd) {
  require('./dev-server')(app, port);
}

const host = 'localhost';  // TODO: config it

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  if (isProd) {
    console.log(`listening at ${host}:${port}`);
  }
});
