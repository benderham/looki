/**
 * Catch Errors Handler
 *
 * Instead of using try{} catch(e) {} in each controller, we wrap functions in
 * catchErrors(), catch any error thrown, then pass along express middleware.
 */
exports.catchErrors = fn => function (req, res, next) {
  return fn(req, res, next).catch(next);
};

/**
 * Not Found Handler
 *
 * If a route is not found, mark it as 404 and pass it along to the next error
 * handler to display.
 */
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

/**
 * Development Error Handler
 *
 * In development, show detailed error messages.
 */
exports.developmentErrors = (err, req, res, next) => {
  const errorStack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: errorStack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      res.render('error', errorDetails);
    }, // Form Submit, reload the page
    'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
  });
};

/**
 * Production Error Handler
 *
 * No stacktrace leaked to user
 */
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.reder('error', {
    message: err.message,
    error: {},
  });
};
