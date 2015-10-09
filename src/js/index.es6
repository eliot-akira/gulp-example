// In browser code
require("babelify/polyfill");

console.log('Hello from index.es6');

{ let a = 'I am declared inside an anonymous block'; }

console.log(a); // ReferenceError: a is not defined
