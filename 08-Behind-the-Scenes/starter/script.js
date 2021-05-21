'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`; // Steven, not Jonas, current scope takes priority
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial); // var is function scoped
    console.log(output);
  }

  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);

///////////////////////////////////////
// Hoisting and TDZ in Practice

// Variables
console.log(me);
// console.log(job);
// console.log(year);
var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3)); // var is undefined
function addDecl(a, b) {
  return a + b;
}

// Example
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('all pro ducts deleted!');
}

var x = 1;
let y = 2;
const z = 2;
// window object
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

///////////////////////////////////////
// The this Keyword in Practice
console.log(this);

const calcAge2 = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined
};
calcAge2(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window (NOTE arrow function use this keyword of its parent scope, which is window)
};
calcAgeArrow(1980);

/*
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); // the jonas object
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

// NOTE: method borrowing
matilda.calcAge = jonas.calcAge;
matilda.calcAge(); // NOTE this is pointing to matilda, instead of the function it borrowed from

const f = jonas.calcAge;
// f(); //NOTE undefined
*/

///////////////////////////////////////
// Regular Functions vs. Arrow Functions

// var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
    // Solution 1
    // const self = this; // self or that NOTE
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillenial();

    // Solution 2
    const isMillenial = () => {
      // NOTE very useful example of arrow function !!!
      console.log(this); // NOTE use the this keyword from its parent scope, in this case, it is jonas
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },
  greet: () => console.log(`Hey ${this.firstName}`),
};
jonas.greet(); // undefined, because arrow function does not have its own this key words
jonas.calcAge();

const addExpr = function (a, b) {
  console.log(arguments); // NOTE arguments keyword
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

// var addArrow = (a, b) => {
//   console.log(arguments); // cannot use arguments keyword in arrow function
//   return a + b;
// };

///////////////////////////////////////
// Objects vs. primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me2 = {
  name: 'Jonas',
  age: 30,
};
const friend = me2;
friend.age = 27;
console.log('Friend:', friend);
console.log('Me:', me2);

///////////////////////////////////////
// Primitives vs. Objects in Practice

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis'; // NOTE although jessica is const, we can change properties of the object it points to in the heap
console.log('Before marriage:', jessica);
console.log('After marriage: ', marriedJessica);
// marriedJessica = {}; // NOTE we cannot assign a new value or completely change it

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const jessicaCopy = Object.assign({}, jessica2); // NOTE Object.assign() create a new object and merges two objects, but it is shallow copy, not deep clone
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2); // NOTE mutated as well => Object.assign() did shallow copy
console.log('After marriage: ', jessicaCopy);
