const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// init mongoose and database connection
mongoose.connect('mongodb://localhost:27017/nodkb', {useMongoClient: true});
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

// bring in DB Models
let Article = require('./models/article');


// Load Pug, the View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function(req, res) {
  // fetch articles, pass the articles into the response for rendering
  Article.find({}, (error, articles) => {
    if (error) {
      console.log(error);
    } else {
      res.render('index', {
        "title": 'Hello',
        "articles": articles
      });
    }
  });
});

// Add articles route

app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article',
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