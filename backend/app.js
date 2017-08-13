/*
Basic Working Express/Node.js Boilerplate
MongoDB, Session, and Passport made available to app
*/

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';

import path from 'path';
import lessMiddleware from 'less-middleware';

// Configure .env path
dotenv.load({path: '.env'});

// import routes below
import index from './routes/index';

// init mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.LOCALDB_URI);

const app = express();
const server = require('http').Server(app);
const debug = Debug('node-plate:app');

// Passport configuration
// const passportConfig = require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/*
Express session set up
*/
// connect mongodb with session
const MongoStore = require('connect-mongo')(session);
const sessionStore = new MongoStore({
  url: process.env.LOCALDB_URI,
  autoReconnect: true,
  clear_interval: 3600
});

// init express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  store: sessionStore,
  cookieParser: cookieParser
}));

// init passport
app.use(passport.initialize());
// allow passport to update persistent session
app.use(passport.session());

// set routes
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

// set port
app.set('port', process.env.PORT || 3000);

// Start express server
server.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:' + app.get('port'));
});
