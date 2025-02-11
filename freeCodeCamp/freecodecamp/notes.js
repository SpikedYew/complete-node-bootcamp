const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

//Module that loads enviroment variables from .env file intro process.env
require("dotenv").config();

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
