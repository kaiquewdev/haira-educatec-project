'use strict';

const service = require('feathers-sequelize');
const v1stash = require('./v1stash-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: v1stash(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/v1stashes', service(options));

  // Get our initialize service to that we can bind hooks
  const v1stashService = app.service('/v1stashes');

  // Set up our before hooks
  v1stashService.before(hooks.before);

  // Set up our after hooks
  v1stashService.after(hooks.after);
};
