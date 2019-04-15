/** Articles Route
 *
 *
 *
 */

const express = require('express');
const { body, validationResult } = require('express-validator/check');
const router = express.Router();

let Article = require('../models/article');

// GET edit single article form route
router.get('/edit/:id',(req, res) => {
  Article.findById(req.params.id, (err, article) => {
    err ? console.error(err) : res.render('edit_article', {
      title: "Edit Article",
      article: article
    });
  })
});


// Add articles route
router.get('/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article',
  });
});

// POST Add submit form route
router.post('/add',
  [
    // .isEmpty() enforces empty fields being true
    body('title', 'Title is required').exists({checkFalsy: true}),
    body('author', 'Author is required').exists({checkFalsy: true}),
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
    const { title, author, body } = req.body;
    article.title = title;
    article.author = author;
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
  let query = {_id: req.params.id};
  Article.remove(query, (err) => {
    err ? console.log(err) : res.send('Success, delete request completed');
  })
});

// GET single article route
router.get('/:id',(req, res) => {
  Article.findById(req.params.id, (err, article) => {
    err ? console.error(err) : res.render('article', {
      article: article
    });
  })
});


module.exports = router;