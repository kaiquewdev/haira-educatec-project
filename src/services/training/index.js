'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'trainings.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/trainings', service(options));

  // Get our initialize service to that we can bind hooks
  const trainingService = app.service('/trainings');

  // Set up our before hooks
  trainingService.before(hooks.before);

  // Set up our after hooks
  trainingService.after(hooks.after);
};
