# Notes For the Project

## References

Below are a list of references to use/ that will be used throughout:

- [Basic Node Tutorial](https://github.com/wilsonj806/basic-node-tut)
- [Express Tutorial](https://github.com/wilsonj806/express-tut)

## Additional Notes

Additional notes/ repos for reference below:

- [MongoDB Crash Course](./mongodb-crash.md)

## Basic Notes For Packages

### Pug.js

- [Pug.js website](https://pugjs.org/api/getting-started.html)

Pug.js or Jade.js as it was previously known is a templating engine for writing HTML templates in JavaScript. Other commonly used templating engines are Handlebars and EJS.

The syntax is weird in comparison to other templating engines or even JSX since it uses indentation for nesting/ dom modeling in a .pug file. See below for an example:
```pug
//- I am a .pug comment
html
  head
    title #{title}
  body
    h1 'Hello World'
```

### Mongoose

- [Mongoose website](https://mongoosejs.com/)

Mongoose is an Object Relational Mapping tool for MongoDB. MongoDB is a type of NoSQL database as covered in the [MongoDB crash course](./mongodb-crash.md) and is very flexible. However, because it's super flexible it doesn't really have structure to how you relate your data to each other.

Mongoose lets you structure your data on a lighter level than SQL and on an application level.

### Express

Express has been covered already in the tutorial linked in the References section of this doc, so this section is pretty much adding onto it.

As of Express v4.x, ALL BUILT-IN MIDDLEWARE HAS BEEN REMOVED FROM Express.
- This means you need to download the individual packages if you want to use them
- i.e no more of this:
  ```js
  // DEPRECIATED
  const app = express();
  app.use(express.json());

  // USE THIS INSTEAD
  const app = express();
  const bodyParser = require('body-parser');
  app.user(bodyParser.json());
  ```
#### Express Middleware Notes

Note that for the express `express-validator` middleware, the scripting to use it, found in the `./depreciated` directory, is different from the `express-validator` docs. Be sure to check the docs for more.
- the below syntax is depreciated as of [**v4.x**](https://express-validator.github.io/docs/legacy-api.html) and up of `express-validator`
  ```js
    const expressValidator = require('express-validator);
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
  ```
- For additional validation methods, check the [repository for validator.js](https://github.com/chriso/validator.js)
### PassportJS and BCryptJs

Passport.js is a simple middleware for Node.js for authentication. Installation is fairly simple but you need to install both the core module **AND** the strategy for how you want to authenticate. For this project, we use the *local strategy* as seen in the below NPM command line script:
  ```bat
    npm i passport passport-local
  ```
- Additional strategies can be found in the [Passport.js page](http://www.passportjs.org/packages/) for it

It's pretty standard to store your passport strategy inside a config folder.


[BCrypt](http://bcrypt.sourceforge.net/) is "a cross-platform file encryption utility". It's used to encrypt sensitive data so that **you're not storing data in plain text**.
