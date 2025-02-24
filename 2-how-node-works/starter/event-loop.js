const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

// Expired timer callback (second)
setTimeout(() => {
  console.log("timer 1 finished");
}, 0);

setImmediate(() => {
  console.log("Immidiate 1 finished");
});

// I/O pooling and callbacks (third)
fs.readFile("text-file.txt", () => {
  console.log("I/O finished");

  console.log("--------- below come from event loop ------");
  // close callbacks (last)

  // why did setImmidiet got executed before setTImout 2 ?
  // Event loops waits for poll phase where I/O is exectuted
  setTimeout(() => {
    console.log("timer 2 finished");
  }, 0);

  // here it exits the app after 3 seconds
  setTimeout(() => {
    console.log("timer 3 finished");
  }, 3000);

  //(fourth)
  setImmediate(() => {
    console.log("Immidiate 2 finished");
  });

  //missleading name, it gets executed first after each phase ( for advance use )
  process.nextTick(() => console.log("Process.nextTick"));

  // This blocks the entire execution when its done synchronously, even when we use 4 threads it still is executed one by one
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted");

  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "Password Encrypted");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "Password Encrypted");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "Password Encrypted");
  // });
});

//Top level code (first)
console.log("Hello from the top-level code");
