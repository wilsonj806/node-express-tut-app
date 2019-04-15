const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  // Local strategy implementation
  passport.use(new LocalStrategy((username, password, done) => {
    // Match username
    let query = {username: username};
    User.findOne(query, function(err, user) {
      if(err) throw new Error(`${err}`);
      if(!user) {
        return done(null, false, {message: 'No user found'});
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw new Error(`${err}`);
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      })
    })
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
}