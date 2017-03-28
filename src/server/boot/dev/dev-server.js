/* eslint-disable */
const chalk = require('chalk');
const path = require('path');
const nodemon = require('nodemon');
const serverCompiler = require('./webpack.server');

let first = true;
const mainScript = './src/server/main.js';

// TODO: tune parameters
nodemon({
  script: mainScript,
  watch: [path.resolve('./src/server')],
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

serverCompiler.watch({}, (err, _stats) => {
  if (err) {
    console.error('Compile error: ', err);
    return;
  }

  const stats = _stats.toJson();
  stats.warnings.forEach(warn => console.warn(warn));
  stats.errors.forEach(err => console.error(err));

  nodemon.emit(first ? 'start' : 'restart');
});
