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