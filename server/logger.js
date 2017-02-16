const winston = require('winston');


const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: () => new Date(),
    }),
  ],
});

logger.stream = {
  write(message/* , encoding */) {
    logger.info(message);
  },
};

module.exports = logger;
