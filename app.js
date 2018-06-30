const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');
const errorHandlers = require('./handlers/errorHandlers');
const routes = require('./routes');

// create express app
const app = express();

// serve static files from public build folder. This is our built react app.
app.use(express.static(path.join(__dirname, 'public/build')));

// take raw requests and turn them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populate req.cookies with any cookies in the request
app.use(cookieParser());

// flash middleware let's us use req.flash('error', 'ruh oh!'), which passes
// on message to next page a user requests.
app.use(flash());

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
module.exports = app;
