const logger = require('../logger');

// eslint-disable-next-line
module.exports = (req, res, next) => {
  logger.info(JSON.stringify(req.body));
  res.sendStatus(200);
};
