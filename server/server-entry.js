const path = require('path');
const Vue = require('vue');

const App = require(path.resolve(__dirname, '../client/App.vue'));  // eslint-disable-line import/no-dynamic-require

const app = new Vue(App);

// TODO:
exports = (context) => {
  return app;
};
