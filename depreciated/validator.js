// NOTE This validator uses a DEPRECIATED version of 'express-validator'

const express = require('express');
const router = express().Router();
const expressValidator = require('express-validator');


router.use(expressValidator({
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


module.exports = router;