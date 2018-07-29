import bodyParser from 'body-parser';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import moment from 'moment';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import errorHandlers from './handlers/errorHandlers';
import './handlers/passport';
import helpers from './helpers';
import routes from './routes';

const MongoStore = require('connect-mongo')(session);

// Import environment variables from .env file
require('dotenv').config({ path: '.env' });

// create express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'admin-ui'));
app.set('view engine', 'pug');

// redirect admin ui css and js to uikit node_module
app.use('/admin/js', express.static(path.join(__dirname, '/node_modules/uikit/dist/js'))); // redirect uikit JS
app.use('/admin/css', express.static(path.join(__dirname, '/node_modules/uikit/dist/css'))); // redirect uikit CSS

// serve static files from public build folder. This is our built react app.
app.use(express.static(path.join(__dirname, 'client-ui/build')));

// take raw requests and turn them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populate req.cookies with any cookies in the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// auth handled by Passport JS
app.use(passport.initialize());

// flash middleware let's us use req.flash('error', 'ruh oh!'), which passes
// on message to next page a user requests.
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.moment = moment;
  res.locals.flashes = req.flash();
  res.locals.currentPath = req.path;
  next();
});

// handle routes
app.use('/', routes);

// if above routes don't work, we 404 them and pass to error handler.
app.use(errorHandlers.notFound);

// check to see if errors are just validation
app.use(errorHandlers.flashValidationErrors);

// error handling
if (app.get('env') === 'development') {
  // Development Error Handler - gives stack trace
  app.use(errorHandlers.developmentErrors);
}

// Production Error Handler
app.use(errorHandlers.productionErrors);

// done!
export default app;
