const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// init mongoose and database connection
mongoose.connect('mongodb://localhost:27017/nodkb', {useNewUrlParser: true});
let db = mongoose.connection;

// check connection
db.once('open', function(){
  console.log('Connected to MongoDB')
});

// check for DB errors
db.on('error', function(error){console.error(error)});

// init express, set port
const app = express();
const PORT = process.env.PORT || 5000;

  // init Express built in middleware that replaces body-parser
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

// bring in DB Models
let Article = require('./models/article');

// Load Pug, the View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

  // set static Public folder
  app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  // fetch articles, pass the articles into the response for rendering
  Article.find({}, (error, articles) => {
    if (error) {
      console.log(error);
    } else {
      res.render('index', {
        "title": 'Articles',
        "articles": articles
      });
    }
  });
});

// GET single article route
app.get('/article/:id',(req, res) => {
  Article.findById(req.params.id, (err, article) => {
    err ? console.error(err) : res.render('article', {
      article: article
    });
  })
})

// Add articles route
app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article',
  });
});

// POST Add submit form route
app.post('/articles/add', (req, res) => {
  let article = new Article();
  const { title, author, body } = req.body;
  article.title = title;
  article.author = author;
  article.body = body;

  article.save(function(error){
    error ? console.error(`Error ahead:${error}`) : res.redirect('/');
  });
});

app.listen(PORT, function() {console.log(`Server started on port ${PORT}`)});

/* let articles = [
  {
    id: 1,
    title: 'Article 1',
    author: 'brad traversy',
    body: 'This is article 1'
  },
  {
    id: 2,
    title: 'Article 2',
    author: 'wilson',
    body: 'This is article 2'
  },
  {
    id: 3,
    title: 'Article 3',
    author: 'john doe',
    body: 'This is article 3'
  }
]; */