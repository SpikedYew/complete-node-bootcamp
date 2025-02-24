const EventEmitter = require("events");
const http = require("http");
// const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
  constructor() {
    //gain access to all functions from eventemitter
    super();
  }
}
const myEmitter = new Sales();

//Obswervers for events from emiters
myEmitter.on("newSale", () => {
  console.log("New item was sold!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Bart");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left`);
});

// objects that emits
myEmitter.emit("newSale", 9);

///////////////

//Small web server

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  console.log(req.url);
  res.end("Request received!");
});
server.on("request", (req, res) => {
  console.log("Another Request received!");
});
server.on("close", (req, res) => {
  console.log("Server closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for requests...");
});
