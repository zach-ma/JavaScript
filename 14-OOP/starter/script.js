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
///////////////////////////////////////
// Setters and Getters
///////////////////////////////////////
// Static methods

// class expression
// const PersonCl = class {};

// NOTE class declaration, better use this
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // - Instance methods
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
  // NOTE data validation using getter and setter
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name; // NOTE add '_' when setter try to set a property that already exist
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName; // NOTE
  }

  // - Static methods NOTE
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);
console.log(jessica.age);
console.log(jessica.fullName);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.fullName}`);
// };
jessica.greet();

// NOTE
// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens (can pass them into functions and return them from functions)
// 3. Classes are executed in strict mode

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

// from() is attached to Array constructor, not attached to prototype => arrays does not inherit the method
console.log(Array.from(document.querySelectorAll('h1')));
console.log(Number.parseFloat(12));

// Static methods

// create static methods for class
Person.hey = function () {
  console.log('Hey there');
};
Person.hey();
// jonas.hey(); // instances not inherited

PersonCl.hey();
// jessica.hey(); // inctances not inherited

// NOTE Object.create()
// Create a person object with the object as the prototype
// in object literal
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // manual way, different method from constructor
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto); // steven will be linked to Person Proto
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h 
(but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  // NOTE
  get speedUS() {
    return this.speed / 1.6;
  }
  // NOTE
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
ford.accelerate();
ford.accelerate();
console.log('---------');
console.log(ford.speed);
console.log(ford.speedUS);
console.log('---------');
ford.speedUS = 50; // NOTE
console.log(ford.speed);
console.log(ford.speedUS);
console.log('---------');

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

// Student inherits from Person
const Student = function (firstName, birthYear, course) {
  //   this.firstName = firstName; // from Person constructor
  //   this.birthYear = birthYear; // from Person constructor
  Person.call(this, firstName, birthYear); // NOTE thisArg: the value to use when calling func
  this.course = course; // additional property
};

// NOTE Linking prototypes
// Student.prototype = Person.prototype;
Student.prototype = Object.create(Person.prototype); // NOTE connection should be created before adding methods

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'CS');
mike.introduce();
mike.calcAge(); // Now it works

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(Student.prototype.constructor); // NOTE should be Student, not Person
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
Student.prototype.constructor = Student; // set to Student
console.log(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. 
Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. 
Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

const EV = function (make, speed, charge) {
  Car.call(this, make, speed); // NOTE call parent class
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype); // NOTE link the prototype

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// NOTE child class over write the accelerate method of parent class!
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `Tesla going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
console.log(tesla);
tesla.brake();
tesla.chargeBattery(100);
console.log(tesla);

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

// class hides a lot of details behind the scenes
// NOTE class is really just a layer of abstraction over constructor functions
// NOTE extends keyword + super function
class StudentCl extends PersonCl {
  // if no other properties are needed, then we do not need to write constructor function
  constructor(fullName, birthYear, course) {
    // always call super first, then we can use 'this'
    super(fullName, birthYear); // NOTE parent constructor
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  // overwrite the method in parent class
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}
const martha = new StudentCl('Martha Jones', 2012, 'CS');
console.log(martha);
martha.introduce();
martha.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };
// const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear); // NOTE
  this.course = course;

  StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  };
};

const jay = Object.create(StudentProto); // NOTE
jay.init('Jay', 2010, 'CS');
console.log(jay);
jay.introduce();
jay.calcAge();

// ES6 Classes is mostly used in the real world

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// NOTE
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // NOTE 1. Public fields: (instances, not in prototype)
  locale = navigator.language;

  // NOTE 2. Private fields:
  #movements = [];
  #pin; // NOTE

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // NOTE private field

    // protected property:
    // this._movements = []; // NOTE convention to hide the property, the team will know it should not be accessed outside of the class

    // this.locale = navigator.language; // add as public field

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3. Public methods:
  // Public interface(API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // NOTE to make method chainable
  }

  withdraw(val) {
    // this.movements.push(val);
    this.deposit(-val); // NOTE
    return this;
  }

  //   // NOTE should be internal use => use convention to protect it
  //   _approveLoan(val) {
  //     return true;
  //   }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
    return this;
  }

  static helper() {
    console.log('Helper');
  }

  // NOTE 4. Private methods: not supported now, but may work in the future
  //   #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// bad:
// acc1.movements.push(250);
// acc1.movements.push(-140);
// need to create deposit and withdraw method
acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);
console.log(acc1.pin); // NOTE should not be accessible
acc1.requestLoan(1000);

console.log(acc1.getMovements()); // NOTE so that we can still get the movements but can NOT set or manipulate it

console.log(acc1.movements); // get undefined, protected!
// console.log(acc1.#movements);  // get error, protected!
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan);

// acc1.helper();
Account.helper();

///////////////////////////////////////
// Chaining
// return the object after the function

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1);

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// class CarCl {
//     constructor(make, speed) {
//       this.make = make;
//       this.speed = speed;
//     }
//     accelerate() {
//       this.speed += 10;
//       console.log(`${this.make} is going at ${this.speed} km/h`);
//     }

//     brake() {
//       this.speed -= 5;
//       console.log(`${this.make} is going at ${this.speed} km/h`);
//     }

//     get speedUS() {
//       return this.speed / 1.6;
//     }

//     set speedUS(speed) {
//       this.speed = speed * 1.6;
//     }
//   }

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class,
//    and also update the 'brake' method in the 'CarCl' class. They experiment with chining!
class EVCL extends CarCl {
  #charge; // NOTE must be declared !!!
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `Rivian going at ${this.speed} km/h, with a charge of ${this.#charge}%`
    );
    return this;
  }
}
const rivian = new EVCL('Rivian', 120, 23);
console.log(rivian);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(rivian);
console.log(rivian.speedUS);
