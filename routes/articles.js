/** Articles Route
 *
 *
 *
 */

const express = require('express');
const { body, validationResult } = require('express-validator/check');
const router = express.Router();

let Article = require('../models/article');
let User = require('../models/user');

// GET edit single article form route
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (article.author !== req.user._id) {
      req.flash('danger', 'Not authorized to access this resource');
      res.redirect('/');
    } else if (err) {
      console.log(err);
      return;
    } else {
      res.render('edit_article', {
        title: "Edit Article",
        article: article
      });
    }
  })
});


// Add articles route
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add_article', {
    title: 'Add Article',
  });
});

// POST Add submit form route
router.post('/add',
  [
    body('title', 'Title is required').exists({checkFalsy: true}),
    // body('author', 'Author is required').exists({checkFalsy: true}),
    body('body', 'Body is required').exists({checkFalsy: true})
  ],
  (req, res) => {
  // GET errors if any
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render('add_article', {
      title: 'Add Article',
      errors: errors.mapped()
    })
  } else {
    let article = new Article();
    const { title, body } = req.body;
    article.title = title;
    // add the loggined in User's id in as the author
    article.author = req.user._id;
    article.body = body;

    article.save((error) => {
      if (error) {
        console.error(`Error ahead:${error}`)
      } else {
        req.flash('success', 'Article Added');
        res.redirect('/');
      }
    });
  }
});

// POST Update single article route
router.post('/edit/:id', (req, res) => {
  let article = {};
  const { title, author, body } = req.body;
  article.title = title;
  article.author = author;
  article.body = body;

  let query = {_id: req.params.id}

  Article.update(query, article, function(error){
    if (error) {
      console.error(`Error ahead:${error}`)
    } else {
      res.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });
});

// DELETE Delete request
router.delete('/:id', (req, res) => {
  if (!req.user._id) {
    res.status(500).send();
  }
  let query = {_id: req.params.id};
  Article.findById(req.params.id, (err, article) => {
    if (article.author !== req.user._id) {
      res.status(500).send();
    } else {
      Article.remove(query, (err) => {
        err ? console.log(err) : res.send('Success, delete request completed');
      });
    }
  });
});

// GET single article route
router.get('/:id',(req, res) => {
  Article.findById(req.params.id, (err, article) => {
    User.findById(article.author, (err, user) => {
      err ? console.error(err) : res.render('article', {
        article: article,
        author: user.name
      });
    });
  })
});

/** Access control
 * Express doesn't like it if you use arrow functions inside stuff
 *
 * */

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else{
    req.flash('danger', 'Not logged in, please log in');
    res.redirect('/users/login');
  }
};

module.exports = router;