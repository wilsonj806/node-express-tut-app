const express = require('express');
const router = express().Router();
const expressValidator = require('express-validator');

const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  const { name, email, username, password, password2 } = req.body;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords don\'t match').equals(password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    let newUser = new username({
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
        } else {
          newUser.password = hash;
        }
      })
    });
    newUser.save((err) => {
      if(err) {
        console.log(err)
      } else {
        req.flash('sucess', 'New user registered');
        res.redirect('/user/login');
      }
    })
  }
})