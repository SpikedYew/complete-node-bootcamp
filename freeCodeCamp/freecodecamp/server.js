const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// to use post and body we need ither rxpress.json() or body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//
app.use(express.static(path.join(__dirname + "/public")));
require("dotenv").config();

//If you switch intertnet or wehre you are you have switch ip in mongodb atlas.
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log(`Connected, ${res}`);
  })
  .catch((err) => {
    console.log(`Unable to connect: ${err}`);
  });

//api

app.route("/api/:date").get((req, res) => {
  const dateType = req.params.date;
  let parsedDate;

  // Check if the input contains a hyphen (for "YYYY-MM-DD" format)
  if (dateType.includes("-")) {
    parsedDate = new Date(dateType);
  }
  // Check if the input is a valid UNIX timestamp (number only)
  else {
    parsedDate = new Date(Number(dateType));
  }

  // Check if the date is invalid (NaN)
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

app
  .route("/karina/:id")
  .get((req, res) => {
    console.log("Received POST request!");
    console.log("Request Body:", req.body);
    const loveInd = req.query.love;
    const loveType = req.query.type;
    const idType = req.params.id;

    res.send(
      `Karina loves me ${loveInd} and in type of ${loveType}. Love id: ${idType}`
    );
  })
  .post((req, res) => {
    const loveInd = req.body.loveInd;
    const loveType = req.body.loveType;
    const idType = req.params.id;
    console.log("Received POST request!");
    console.log("Request Body:", req.body);
    res.json({
      message: "Data received successfully!",
      loveInd: loveInd,
      loveType: loveType,
      idType: idType,
    });
  });

app.get(
  "/app",
  (req, res, next) => {
    req.time = new Date().toString();

    next();
  },
  (req, res) => {
    res.json({
      "Cur Time": req.time,
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;

  res.json({
    echo: word,
  });
});

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

app.listen(3000, (req, res) => {
  console.log("Server is runing at port 3000");
});
