# MongoDB Crash Course

## Reference

This crash course is based on Traversy Media's [MongoDB in 30 minutes](https://www.youtube.com/watch?v=pWbMrx5rVBE) video.

## General Description

This is a super fast crash course on MongoDB based on Traversy Media's MongoDB in 30min video. It will include pictures and code snippets.

## What is MongoDB

### Introduction

MongoDB is a NoSQL database solution/ software, where NoSQL is a type of *non-relational database*. The data in a NoSQL database is stored in a JSON-like syntax and is much more flexible than a relational database/ SQL database.
- In a SQL database, you need to define columns, tables, and even data-types
- Reference notes on SQL vs NoSQL

### Basic commands

Note that all of the syntax here is written as if it were using the VSCode integrated terminal. So every user input is preceded with a `>`

To start MongoDB in the command line, use:
```
> mongo
```

Once MongoDB is started with the above you can show a list of databases with the below:
```
> show dbs
```

To make a new database use:
  ```
  > use mycustomers
  switched to db mycustomers
  ```
- Note that MongoDB automatically switched you to the new database

To check the current database use:
```
> db
```

## Syntax

for an example entry it looks like:
```js
  {
    first_name: "John",
    last_name: "Doe"
  }
```