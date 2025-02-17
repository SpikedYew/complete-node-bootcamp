const fs = require("fs");

setTimeout(() => {
  console.log("timer 1 finished");
}, 0);

setImmediate(() => {
  console.log("Immidiate 1 finished");
});

fs.readFile("text-file.txt", () => {
  console.log("I/O finished");

  setTimeout(() => {
    console.log("timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("timer 3 finished");
  }, 0);

  setImmediate(() => {
    console.log("Immidiate 2 finished");
  });
});

//Top level code
console.log("Hello from the top-level code");
