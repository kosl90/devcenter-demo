const session = require('express-session');
const config = require('../../config');

const isProd = process.env.NODE_ENV === 'production';

const sessionOpt = {
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

module.exports = session(sessionOpt);
