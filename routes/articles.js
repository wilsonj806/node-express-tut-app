/** Articles Route
 *
 *
 *
 */

const express = require('express');
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
router.post('/add', (req, res) => {
  /**
   * REVIEW
   * TODO Check if the below and GET errors section is depreciated on express-validator v4.x+
   */
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  // GET errors if any
  let errors = req.validationErrors();

  if (errors) {
    res.render('add_article', {
      title: 'Add Article',
      errors: errors
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