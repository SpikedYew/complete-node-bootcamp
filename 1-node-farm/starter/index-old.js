//Core modules

const fs = require("fs");
const http = require("http");

const url = require("url");

// 3rd Party Modules

const slugify = require("slugify");

// Our modules ( always after core modules )

const replaceTemplate = require("./modules/replaceTemplate");

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
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%PRODUCTNUTRIENTSNAME%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// This is now dependecny because code wouldn't work without this package. Project depends on it
const slugs = dataObj.map((el) =>
  slugify(el.productName, { lower: true, replacement: "-" })
);

console.log(slugify("Fresh Avocados", { lower: true, replacement: "-" }));

const server = http.createServer((req, res) => {
  //it is for reading differences in query, for eg /product?id=0, /product is defined but id is not as pathname
  const { query, pathname } = url.parse(req.url, true);

  // Overwier Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    //easiest way to get element based on query string
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // Api
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
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
