const config = require('../../config');

module.exports = Object.assign({}, config, {
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || 'secret: →_→',
});
