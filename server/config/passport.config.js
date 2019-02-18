const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    console.log('passport');
    User.findOne({ email: username }, function (err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'TheBestKeptSecret'
  },
  function (jwt_payload, done) {
    User.findOneById()
  }
))
