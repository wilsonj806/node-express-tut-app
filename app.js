const express = require('express');
const path = require('path');

// init express, set port
const app = express();
const PORT = process.env.PORT || 5000;

// Load Pug, the View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route

app.get('/', (req, res) => {
  let articles = [
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
  ];
  res.render('index', {
    "title": 'Hello',
    "articles": articles
  });
});

// Add route

app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article',
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));