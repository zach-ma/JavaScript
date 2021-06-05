'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator

// constructor function:
const Person = function (firstName, birthYear) {
  console.log(this); // Person {}
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NOTE Never create a method inside of a constructor function, not performant!! we should use prototype instead
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas); // Person {firstName: "Jonas", birthYear: 1991}

// NOTE new operator 4 steps:
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} is linked to prototype -> this.firstName = firstName; -> this.birthYear = birthYear;
// 4. function automatically return {}, i.e. {firstName: ..., birthYear: ...}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);

///////////////////////////////////////
// Prototypes
console.log(Person.prototype);

// add calcAge method to each of the objects
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__); // check prototype of jonas
console.log(jonas.__proto__ === Person.prototype);

// NOTE Person.prototype is not prototype of person, but prototype of linked objects
// better name of .prototype is .prototypeOfLinkedObjects
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// set properties on prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// check if the property is the object's own property
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));
console.log(jonas.hasOwnProperty('nnnnnn'));

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__); // constructor is constructor function
// NOTE Object.prototype (top of prototype chain):
console.log(jonas.__proto__.__proto__); // constructor is object
console.log(jonas.__proto__.__proto__.__proto__); // null

// console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3]; // NOTE  new Array === [], created by array constructor
console.log(arr.__proto__); // prototype of array => inherites all the methods from its prototype
console.log(arr.__proto__ === Array.prototype); // NOTE
console.log(arr.__proto__.__proto__);

// NOTE add unique() to all arrays, i.e. extending the prototype of built-in object
// NOTE try to avoid doing this:
// 1. next version of JS may add method with the same name, probabaly will break the code
// 2. create many bugs in a team
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); // check the __proto__ of each layer, it is very deep
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. 
The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

///////////////////////////////////////
// ES6 Classes

// class expression
// const PersonCl = class {};

// NOTE class declaration, better use this
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // NOTE Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(' ')) {
      this.fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
}
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);
console.log(jessica.age);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.fullName}`);
// };
jessica.greet();

// NOTE
// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens (can pass them into functions and return them from functions)
// 3. Classes are executed in strict mode

///////////////////////////////////////
// Setters and Getters

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],
  // NOTE we can access latest as if it was just a property but not a function
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest); // NOTE useful when we want to read something as a property, but still need to do some calculations before
account.latest = 50; // NOTE
console.log(account.latest);
