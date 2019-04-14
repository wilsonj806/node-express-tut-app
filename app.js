const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

/** MongoDB/ Mongoose setup
 *
 *
 */
// init mongoose and database connection
mongoose.connect('mongodb://localhost:27017/nodkb', {useNewUrlParser: true});
let db = mongoose.connection;

// check connection
db.once('open', () => {
  console.log('Connected to MongoDB')
});

// check for DB errors
db.on('error', (error) => {console.error(error)});

/** Express, Pug.js, Middleware, and public folder setup
 *
 *
 */
const app = express();
const PORT = process.env.PORT || 5000;

// Use Express body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// Use Express messages middleware
app.use(flash());
app.use((req, res, next) => {
  // creates a variable called locals to the response
    // also requiring express-messages
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Use Express validator
// REVIEW
// TODO update this for express-validator v4.x and up
const expressValidator = require('express-validator');
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// bring in DB Models
let Article = require('./models/article');

// Load Pug, the View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

  // set static Public folder
  app.use(express.static(path.join(__dirname, 'public')));

/** Express Routing
 *
 *
 */

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
});

// GET edit single article form route
app.get('/article/edit/:id',(req, res) => {
  Article.findById(req.params.id, (err, article) => {
    err ? console.error(err) : res.render('edit_article', {
      title: "Edit Article",
      article: article
    });
  })
});


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

  article.save((error) => {
    if (error) {
      console.error(`Error ahead:${error}`)
    } else {
      req.flash('success', 'Article Added');
      res.redirect('/');
    }
  });
});

// POST Update single article route
app.post('/article/edit/:id', (req, res) => {
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
app.delete('/article/:id', (req, res) => {
  let query = {_id: req.params.id};
  Article.remove(query, (err) => {
    err ? console.log(err) : res.send('Success, delete request completed');
  })
})

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
