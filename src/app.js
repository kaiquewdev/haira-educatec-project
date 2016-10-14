'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
// const Sequelize = require('sequelize');

const app = feathers();

// app.set('sequelize', new Sequelize('sequelize', '', '', {
//   dialect: 'sqlite',
//   storage: path.join(__dirname, 'db.sqlite'),
//   logging: false
// }));

app.configure(configuration(path.join(__dirname, '..')));

app
  .use((req, res, next) => {
    if (req.get('x-appengine-https') === 'on' && !req.get('x-forwarded-proto')) {
      req.headers['x-forwarded-proto'] = 'https';
    }
    next();
  })
  .use(compress())
  .options('*', cors())
  .use(cors({ origin: true }))
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

module.exports = app;
