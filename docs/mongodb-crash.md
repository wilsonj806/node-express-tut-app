# MongoDB Crash Course

## Table of Contents

- [Reference](#reference)
- [General Description](#general-description)
- [What is MongoDB](#what-is-mongodb)
  - [Introduction](##introduction)
  - [Basic Commands](##basic-commands)
- [Syntax](#syntax)
  - [Collections](##collections)
    - [Setup](##setup)
    - [Adding Records](##adding-records)

## Reference

This crash course is based on Traversy Media's [MongoDB in 30 minutes](https://www.youtube.com/watch?v=pWbMrx5rVBE) video.

Also reference the [MongoDB docs](https://docs.mongodb.com/manual/reference/)

## General Description

This is a super fast crash course on MongoDB based on Traversy Media's MongoDB in 30min video. It will include pictures and code snippets.

## What is MongoDB

### Introduction

MongoDB is a NoSQL database solution/ software, where NoSQL is a type of *non-relational database*. The data in a NoSQL database is stored in a JSON-like syntax and is much more flexible than a relational database/ SQL database.
- In a SQL database, you need to define columns, tables, and even data-types
- Reference notes on SQL vs NoSQL

### Basic commands

Note that all of the syntax here is written as if it were using the VSCode integrated terminal. So every user input is preceded with a `>`

- To start MongoDB in the command line, use:
    ```
    > mongo
    ```

- Once MongoDB is started with the above you can show a list of databases with the below:
    ```
    > show dbs
    ```

- To make a new database use:
    ```
    > use mycustomers
    switched to db mycustomers
    ```
  - Note that MongoDB automatically switched you to the new database

- To check the current database use:
  ```
  > db
  ```

## Syntax

A lot of the MongoDB syntax resembles JavaScript, which is part of the reason why the MEAN(Mongo, Express, Angular, Node) stack is so popular; you don't ever have to use any other syntax besides JavaScript.

The syntax for adding a new entry pretty much looks like JavaScript objects/ JSON. This means you can have values of strings, arrays, arrays of objects, objects in an entry as seen below:
  ```js
    {
      first_name: "John",
      last_name: "Doe",
      memberships: ["mem1", "mem2"],
      address: {
        street: "123 fake street",
        city: "Boston",
      },
      contacts: [
        {
          name: "Brad",
          email: "bt@btmedia.com"
        },
        {
          name: "Jane"
          email: "janeDoe@yahoo.com"
        }
      ]
    }
  ```

### Collections

#### Setup

Before we go through making and adding things to our database, we need to add a collection. A collection is pretty much analogous to tables in SQL, but here they hold documents/ records.

- To make a collection use the below:
  ```
  > db.createCollection('customers');
  { "ok": 1}
  ```
  - The "ok" key tells you if the operatino was successful
  - You can also use `> show collections` to show collections inside a database

#### Adding Records

Now that we have our collection started, we can start adding documents and records.

To insert a record/ document into the collection we use:
  ```
    > db.customers.insert({
      first_name: "John",
      last_name: "Doe"
    });
    WriteResult({ "nInserted" : 1});
  ```
  - MongoDB then returns the write result and reports how many entries were added

We can then find documents/ records in a database with the below:
  ```
    > db.customers.find();
    { "_id": ObjectId("5caf75bb90d93c359c1d905c"), "first_name":"John", "last_name":"Doe" }
  ```
- Note that MongoDB returns a "_id" field with an ObjectId value
  - this "_id" field is automatically created whereas in a SQL database you'd need to manually set the "id" field to `AUTO_INCREMENT`, and that it'd be a `PRIMARY KEY`


Adding multiple users is pretty easy and more or less functions the same way as seen below:
  ```
    > db.customers.insert([
      {first_name: "Steve", last_name: "Smith"},
      {first_name: "Joan", last_name: "Johnson", gender: "female"}
    ]);
    BulkWriteResult({
      "writeErrors" : [ ],
      "writeConcernErrors" : [ ],
      "nInserted" : 2,
      "nUpserted" : 0,
      ...
      "upserted" : [ ]
    })
  ```

### Users

To create a user use:
```
  > db.createUser({
    user: "wilson",
    pwd: "1234",
    roles: ["readWrite", "dbAdmin"]
  });
```

