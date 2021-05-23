'use strict';

///////////////////////////////////////
// Default Parameters

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers //NOTE can use params defined before the current param
) {
  //   // old way ES5: using short cirtuit
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', undefined, 1000); // NOTE trick: setting undefined is the same as not setting it

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 24739479284) {
    // alert('Check in'); //UNCOMMENT
  } else {
    // alert('Wrong passport!'); //UNCOMMENT
  }
};
checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};
newPassport(jonas);
checkIn(flight, jonas);
console.log(jonas);

///////////////////////////////////////
// Functions Accepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`); // NOTE function also has properties
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5); // NOTE
['Jonas', 'Martha', 'Adam'].forEach(high5); // NOTE

///////////////////////////////////////
// Functions Returning Functions

// NOTE traditional way, less confusing
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');
greet('Hello')('Jonas'); // NOTE

const greet2 = greeting => name => console.log(`${greeting} ${name}`); // NOTE arrow function version, confusing
greet2('Hi')('Jonas');

///////////////////////////////////////
// The call and apply Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {} NOTE old syntax
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // NOTE copy the method and create external function

// // Does Not Work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams'); // NOTE
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// NOTE call is the same and better:
book.call(swiss, ...flightData);

///////////////////////////////////////
// The bind Method
book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

// partial application
const bookEW23 = book.bind(eurowings, 23); // NOTE preset the flightNum to 23, then we only need name to call the function
bookEW23('Jonas');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this); // NOTE actually points to the button element before adding bind()
  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // NOTE

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // NOTE set null for thisArg
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
// the same as:
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number 
of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3,
   increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number a
   nd if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string
 as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array',
  simply display the results array as it is, using console.log(). This should be the default 
  option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. 
Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! 
So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    console.log(this);
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    // console.log(typeof input);
    if (
      typeof answer === 'number' &&
      answer >= 0 &&
      answer < this.answers.length
    )
      this.answers[answer]++;
    // // NOTE short circuiting example:
    // typeof answer === 'number' &&
    //   answer >= 0 &&
    //   answer < this.answers.length &&
    //   this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults: function (type = 'array') {
    // console.log(this);
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); // NOTE use .bind() otherwise .this will be the button

poll.displayResults.call({ answers: [5, 2, 3] }, 'string'); // NOTE manually set this to a new object, which contains the property
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)

// NOTE IIFE function expression has to be in an expression, so use ()
(function () {
  console.log('This will never run again');
  const isPrivate = 23; // data encapsulate/privacy
})();

// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

// block {} also create data privary
{
  const isPrivate2 = 2;
  var notPrivate = 3;
}
// console.log(isPrivate2);
console.log(notPrivate);

///////////////////////////////////////
// Closures
// NOTE used in JS all the time
// Defn: A closure is the closed-over variable environment of the execution context in which a function was created, even after
//   that execution context is gone.
// NOTE less formal Defn: A closure gives a function access to all the variables of its parent function, even after that parent function
//   has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// even less formal Defn: A closure makes sure that a function does not lose connection to variables that existed at the function's birth place
// less less formal Defn: A closure is like a "backpack" that a function carries around wherever it goes.
//   This backpack has all the variables that were present in the environment where the function was created.
// NOTE closure has priority over scope chain

const secureBooking = function () {
  let passengerCount = 0; // NOTE closure makes a function remember all the variables that existed at the function's birth place
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker); // NOTE

///////////////////////////////////////
// More Closure Examples

// Example 1

let f; // f is not even defined inside its parent function, but closure still exists
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f(); // a is inside the "backpack" of f

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
console.dir(f);

// re-assigning f function:
h();
f();
console.dir(f); // NOTE old closure 'a' disappears and new closure becomes 'b' as the function is re-assigned, reborn

// Example 2

// setTimeout(function () {
//   console.log('Timer');
// }, 1000); // 1000 mili sec =  1 sec

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  // NOTE
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};
// const perGroup = 1000; // closure has priority over scope chain
boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event 
listener that changes the color of the selected h1 element ('header')
 to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the
 time you need. Think about WHEN exactly the callback function is executed,
  and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
