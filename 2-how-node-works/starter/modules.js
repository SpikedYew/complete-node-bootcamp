// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports

// const calc2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 5));

// caching

// it loads 'Hello from the module once"
// and it loads Log this beatiful text 3x times, because it is stored in the cache of node js, and console.log() which is not exported gets called once, becuse its top-level and it doesnt get stored in node cache
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
