'use strict';
const reviews = require('./reviews');
const reviews = require('./reviews');
const catalog = require('./catalog');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(catalog);
  app.configure(reviews);
  app.configure(reviews);
};
