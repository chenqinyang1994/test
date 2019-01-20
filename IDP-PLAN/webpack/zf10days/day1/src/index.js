// import $ from 'jquery';
// console.log($);
// require('@babel/polyfill');
// let str = require('./a.js');
// console.log(str);

require('./index.css');

let fn = () => {
    console.log(666);
}
fn()

class A {
    a = 1;
}
let a = new A();
console.log(a.a);

console.log('aaa'.includes('a'));

// let logo = require('./wj.jpeg');
// let img = new Image();
// img.src = logo;
// document.body.appendChild(img);