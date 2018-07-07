const passport = require('passport');

exports.apiAuth = passport.authenticate('localapikey', { session: false });
