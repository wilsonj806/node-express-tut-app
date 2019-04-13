let mongoose = require('mongoose');

// Article Schema
/* This is a basic schema for your articles, looks sort of like how TypeScript does typing */
let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

let Article = module.exports = mongoose.model('Article', articleSchema, 'articles');
