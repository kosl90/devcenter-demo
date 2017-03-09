const Vue = require('vue');

const App = require('~containers/App.vue');  // eslint-disable-line import/no-dynamic-require

const app = new Vue(App);

// TODO:
module.exports = (context) => { // eslint-disable-line no-unused-vars, arrow-body-style
  return Promise.resolve(app);
};
