// Polyfill fn.bind() for PhantomJS
/* eslint-disable */
Function.prototype.bind = require('function-bind');

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const componentContext = require.context('~components', true, /^\.\/(?!main(\.js)?$)/);
componentContext.keys().forEach(componentContext);

const containerContext = require.context('~containers', true, /^\.\/(?!main(\.js)?$)/);
containerContext.keys().forEach(containerContext);
