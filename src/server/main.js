require('../../build/check-versions')();
const express = require('express');
// const path = require('path');
const config = require('./config');
const setupServer = require('./boot/setup-server');
const logger = require('./logger');


if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.server.port || 8080;
const hostname = process.env.HOST || config.server.hostname || 'localhost';
const serverType = config.server.type;

const app = express();
app.locals.port = port;
app.locals.hostname = hostname;
app.locals.scheme = serverType === 'http' ? 'http' : 'https';

setupServer(app);

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
});
