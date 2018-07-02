import passport from 'passport';

exports.apiAuth = passport.authenticate('localapikey', { session: false });
