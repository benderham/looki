import passport from 'passport';
import { Strategy as LocalAPIKeyStrategy } from 'passport-localapikey';
import ApiUser from '../models/ApiUser';

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
