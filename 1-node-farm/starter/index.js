const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////

// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the avocados: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log(textOut);

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR!");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log(`Your file has be written`);
//       });
//     });
//   });
// });

// console.log("Will read file!");

////////////////////

// SERVER

// This code is not blocking, data will be loaded when you enter the page, but all request are asynchronous
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // This has to be gone if we want to do if/else with routing
  // res.end("Hello from the server!");

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERWIEW");
  } else if (pathName === "/product") {
    res.end("This is product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Contect-type": "application/json" });
    res.end(data);
  } else {
    // 404 error and header, specified as html
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    // Headers have to be set before we send contect to server
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

/*


} else if (pathName === "/api") {
  // res.end("API");
  // . represents directory of current folder
  // when we enter the /api it logs in terminal data
  fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    const productData = JSON.parse(data);
    // console.log(productData);
    // we need to send is as string and we need to say we are sending json
    res.writeHead(200, { "Contect-type": "application/json" });
    res.end(data);
  });
} else {

  */
