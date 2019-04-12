# MongoDB Crash Course

## Table of Contents

- [Reference](#reference)
- [General Description](#general-description)
- [What is MongoDB](#what-is-mongodb)
  - [Introduction](#introduction)
  - [Basic Commands](#basic-commands)
- [Syntax](#syntax)
  - [Collections](#collections)
    - [Setup](#setup)
    - [Adding Records](#adding-records)
    - [Collection Method Operators](#collection-method-operators)
    - [Remove Entries](#remove-entries)
  - [Lookups](#lookups)
    - [Querying Objects](#querying-objects)
    - [Querying Arrays](#querying-arrays)
    - [Sorting](#sorting)

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

**Note: Here's a link to the MongoDB reference for [collection methods](https://docs.mongodb.com/manual/reference/method/js-collection/)**

In addition, some of the methods used here, have the following, general format in some way:
```
  > db.collection.methodName({searchCriteria}, {thingToUpdateIfAny}, {additionalOptions})
```

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

If we then run `db.customers.find()` then it returns our three entries, with the "Joan Johnson" entry having a gender field even though the other two don't. In addition, MongoDB didn't yell at us for adding a new "gender" field, whereas in a relational database, it would yell at you for trying to add a field that's not been specified first.
- we can also run `db.customers.find().pretty()` to make the returned output look nicer; this is optional though

#### Updating Records

We'll also need to be able to update records, and that's done with the below example:
```
db.customers.update({first_name: "John"}, {first_name: "John", last_name: "Doe", gender: "male"});
```

- More generally speaking you use `db.customers.update()` like so:
    ```
      > db.customers.update({lookupCriteria}, {updatedEntry})
    ```

It's worth noting that if you're `lookupCriteria` field matches multiple entries, then MongoDB will update all of those. This functions pretty much the same way that SQL handles updates, so it's highly recommended that you don't use fields such as `first_name` for lookups.

#### Collection Method Operators

Note that you had to respecify the `first_name` and `last_name` fields even though they stayed the same/ were already there. If we didn't include it, then that entire entry would updated to **only** have the `gender` field rather than all three. We can use the `$set` keyword to only set the fields we want.

```
db.customers.update({first_name: "Steve"}, {$set: {gender: "male"}});
```
- This naturally works with currently existing fields as well

We can also use the `$inc` field to increment fields like so:
  ```
    > db.customers.update({first_name: "Steve"}, {$inc: {age: 5}});
  ```
- To use it we need to spec the follwing: `{fieldName: number_to_increment_by}
  - in the above example, we're telling MongoDB to increment the `age` field for any entry with a `first_name` field of "Steve" by 5

There's also an `$unset` operator for removing fields from a record/ entry. It's used like so:
  ```
    > db.customers.update({first_name: "Steve"}, {$unset: {age: ""}});
  ```
- Note that the value for the field that you want to use `$unset` on doesn't affect the end result of the unset operation
- If the field that you're trying to `$unset` doesn't exist, then MongoDB doesn't make any changes

If a field doesn't exist and we want to add that in, then we can use the `upsert` option like so:

  ```
    > db.customers.update({first_name: "Mary"}, {first_name: "Mary", last_name: "Samson"}, {upsert: true});
    WriteResult({
      "nMatched" : 0,
      "nUpserted" : 1,
      "nModifed" : 0,
      "_id" : ObjectId("foobar")
    })
  ```
- The upsert lets you add new entries into your collection even if they don't exist as noted by the `"nUpserted" : 1` field in the write result

We can also use the `$rename` operator to rename a field. Syntax below:
```
  > db.customers.update({first_name: "Steve"}, {$rename: {"gender" : "sex"}});
```

#### Remove Entries

To remove stuff use:
```
  > db.customers.remove({first_name: "Steve"});
```

Note that by default it'd try to match every entry with the `first_name` of "Steve". We can use other options to modify the way MongoDB performs the op.

For instance, to change the first entry that matches the search criteria we can use the `justOne` option as seen below:
```
  > db.customers.remove({first_name: "Steve"}, {justOne: true});
```

### Lookups

To find stuff, as mentioned earlier, we can use `db.collection.find({searchCriteria})`. If we wanted to find one entry or another entry, we'd need to use the `$or` operator like below:
  ```
    > db.customers.find({$or: [
      {first_name: "Sharon"},
      {first_name: "Troy"}
    ]});
  ```

We also have greater than and less than operators. To use them, see the below syntax:
```
  > db.customers.find({age: {
    $lt: 40
  }});
```
- where `$gt` is greater than and `$lt` is less than
- the above query would fetch every customer that's younger than 40

In addition to greater than and less than, we have greater than or equal to and less than or equal to.
- they're represented with the `$gte` and `$lte` operators respectively

#### Querying Objects

Within our example database, if we wanted to find residents in Boston, that's part of the address object within the entry. To perform a lookup for it, we'd need to use the below:
  ```
    > db.customers.find({"address.city": "Boston"});
  ```
- First, note that `address` is an object that looks like the below:
  ```
    {
      address: {
        street: "foo",
        city: "bar",
        state: "baz"
      }
    }
  ```
- Also note that we had to wrap `address.city` in quotes
  - if we didn't wrap it in quotes, MongoDB would give us a syntax error

#### Querying Arrays

Our example database also has arrays of values within fields. To query those we'd need to use the below:
  ```
    > db.customers.find({memberships: "mem1"});
  ```
- This will return every entry that has "mem1" as a value inside the array

#### Sorting

We can also sort whatever we find with whatever criteria we want. To sort by last name in ascending order, we'd use the below:
  ```
    > db.customers.find().sort({last_name: 1});
  ```
- For descending, we'd set it to `db.customers.find().sort({last_name: -1});`

We can also count entries as seen below:
  ```
    > db.customers.find().count()
    8
  ```
- and we can perform fancier counts by including a search criteria inside the `.find()` method like so:
  ```
    > db.customers.find({"address.city": "Boston"}).count();
  ```

We can also limit the entries returned like so:
```
  > db.customers.find().limit(4);
```

And naturally we can chain all of these methods together like so:
```
  > db.customers.find().limit(4).sort({last_name: 1}).pretty();
```

We can also loop over each field that matches a search criteria with `forEach()` as seen below:
```
  > db.customers.find().forEach(function(doc){print("Customer Name:" + doc.first_name)});
```
- This pretty much works the same way that JavaScript does it with some differences
  - we can still concat strings as seen above
  - we use the `print()` method to print out a string to the console
