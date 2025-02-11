const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

app.use("/", express.static(path.join(__dirname + "/public")));

app.use(
  "/app",
  (req, res, next) => {
    req.time = new Date().toString();
    req.hm = req.params;

    next();
  },
  (req, res) => {
    res.send({
      "Cur Time": req.time,
    });
    console.log(req.hm);
  }
);

// this is setting params for eg word is a param
/*
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}

This is info for egzample that someone wants to fetch from our api route_path is a param route parameter
*/
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;

  res.json({
    echo: word,
  });
});
app.get("/app", (req, res) => {});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(3000, (req, res) => {});
