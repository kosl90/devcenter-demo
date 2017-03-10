/* eslint-disable */
const chalk = require('chalk');
const path = require('path');
const nodemon = require('nodemon');
const serverCompiler = require('./webpack.server');

let first = true;
const mainScript = './server/main.js';

// TODO: tune parameters
nodemon({
  script: mainScript,
  watch: [path.resolve('./server')],
  ignore: ['dev-server.js'],
})
  .on('start', () => {
    console.log(chalk.green(`[server] starting \`${mainScript}\``));
  })
  .on('restart', () => {
    console.log(chalk.green('[server] restarting due to changes...'));
  })
  .on('crash', () => {
    console.log(chalk.red('[server] crashed'));
  })

serverCompiler.watch({}, (err, stats) => {
  if (err) {
    console.error('Compile error: ', err);
    return;
  }

  nodemon.emit(first ? 'start' : 'restart');
});
