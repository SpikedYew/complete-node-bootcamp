const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

// 13.02

// We can't use .env data when file is named for eg mongo.env

// require("dotenv").config({ path: __dirname + "mongo.env" });

require("dotenv").config();
// require("dotenv").config({ path: __dirname + "/mongo.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//bodyParser if to use req.body it gets the data and can be used with post and of course parses it

/*

extended is a configuration option that tells body-parser which parsing needs to be used.
When extended=false it uses the classic encoding querystring library.
When extended=true it uses qs library for parsing.

When using extended=false, values can be only strings or arrays.
The object returned when using querystring does not prototypically inherit from the default JavaScript Object, which means functions like hasOwnProperty, toString will not be available.
The extended version allows more data flexibility, but it is outmatched by JSON.

*/
app.use("/", express.static(path.join(__dirname + "/public")));

// 12.02

//Module that loads enviroment variables from .env file intro process.env
require("dotenv").config();
// require("dotenv").config({ path: __dirname + "/mongo.env" });

/*
To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.
*/

//With this we don't need to write public in files that we want to make routes for
app.use("/", express.static(path.join(__dirname + "/public")));

//This creates error
// app.use("/json", express.static(path.join(__dirname + "/public")));

// Route 1
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Route 2
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    // res.json({ message: "Hello json" });
    res.sendFile(__dirname + "/public/index.html");
  }
});

// Starting server
app.listen(3000, (req, res) => {});

// this is setting params for eg word is a param
/*
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}

This is info for egzample that someone wants to fetch from our api route_path is a param route parameter
*/
