const express = require('express');
const router = express.Router();
const passport = require('passport');

// middleware
const { body, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

// Bring in Users Model
let User = require('../models/user');

/** User Registration Route
 *
 *
 *
 *
 */
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register User'
  });
});

// POST Register process
router.post('/register',
[
  body('name', 'Name is required').exists({checkFalsy: true}),
  body('email', 'Email is required').exists({checkFalsy: true}),
  body('email', 'Email is invalid').isEmail(),
  body('username', 'Username is required').exists({checkFalsy: true}),
  body('password', 'Password is required').exists({checkFalsy: true}),
  body('password2', 'Passwords don\'t match').exists()
  .custom((value, { req }) => value === req.body.password)
], (req, res) => {
  const { name, email, username, password } = req.body;
  let errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.render('register', {
      title: 'Register User',
      errors: errors.mapped()
    });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    // use bCrypt for encrypting the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) {
          console.log(err);
          return;
        } else {
          newUser.password = hash;
          newUser.save((err) => {
            if(err) {
              console.log(err);
              return;
            } else {
              req.flash('success', 'New user registered');
              res.redirect('/users/login');
            }
          });
        }
      });

    });
  }
});

/** Login Route
 *
 *
 *
 *
 */

// GET Login form
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'User Login'
  })
});

// POST Login process
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    successFlash: true,
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout as user
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out');
  res.redirect('/users/login');
})

module.exports = router;

