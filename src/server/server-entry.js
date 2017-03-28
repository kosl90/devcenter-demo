const Vue = require('vue');

const App = require('~containers/App');

const app = new Vue(App);

// TODO:
module.exports = (context) => { // eslint-disable-line no-unused-vars, arrow-body-style
  return Promise.resolve(app);
};
