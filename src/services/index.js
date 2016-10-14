'use strict';
const v1stash = require('./v1stash');
const stash = require('./stash');
const reviews = require('./reviews');
const catalog = require('./catalog');
const authentication = require('./authentication');
const user = require('./user');
module.exports = function() {
  const app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(catalog);
  app.configure(reviews);
  app.configure(stash);
  app.configure(v1stash);
};
