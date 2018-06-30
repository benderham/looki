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
 * MongoDB Validation Error Handler
 *
 * Detect if there is any MongoDB validation errors that can be shown via
 * flash messages.
 */
exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach(key => req.flash('error', err.errors[key].message));
  res.redirect('back');
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
  res.json(errorDetails);
};

/**
 * Production Error Handler
 *
 * No stacktrace leaked to user
 */
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
};
