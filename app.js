const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const config = require('./config/database');

/** MongoDB/ Mongoose setup
 *
 *
 *
 */
// init mongoose and database connection
mongoose.connect(config.database, {useNewUrlParser: true});
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
  /**
   * creates a variable called locals to the response
   * also requiring express-messages
   */
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Use PassportJs config
require('./config/passport')(passport);

// PassportJs middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  // set up global user variable
  res.locals.user = req.user || null;
  next();
});

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

// Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);

let users = require('./routes/users');
app.use('/users', users);

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
