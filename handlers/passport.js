const passport = require('passport');
const LocalAPIKeyStrategy = require('passport-localapikey').Strategy;
const ApiUser = require('./../models/ApiUser');

passport.use(
  new LocalAPIKeyStrategy((apikey, done) => {
    ApiUser.findOne({ apikey }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  }),
);
