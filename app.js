const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');
const errorHandlers = require('./handlers/errorHandlers');

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

// a default route, this will be moved to routes/ when actual routes are developed.
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

// if above routes don't work, we 404 them and pass to error handler.
app.use(errorHandlers.notFound);

// error handling
if (app.get('env') === 'development') {
  // Development Error Handler - gives stack trace
  app.use(errorHandlers.developmentErrors);
}

// Production Error Handler
app.use(errorHandlers.productionErrors);

module.exports = app;
