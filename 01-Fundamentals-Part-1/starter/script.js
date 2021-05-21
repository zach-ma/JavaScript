let js = "amazing";
console.log(40 + 8 + 23 - 10); // console.log(): access develop console

console.log("Jonas");
console.log(23);


// signs allowed: $ _
let jonas_matilda = "JM";
let $function = 27;


// convensions:
let Person = "jonas"; // should not start with upper case letter
let PI = 3.14159; // all upper case => constant
let myFirstJob = "Programmer";
let myCurrentJob = "Teacher";
// more descriptive than:
let job1 = "Programmer";
let job2 = "Teacher";

// typeof
console.log(typeof true);
console.log(typeof 23);
console.log(typeof 'Jonas');

// dynamic typing
jsIsFun = true;
console.log(typeof jsIsFun);
jsIsFun = 'Yes';
console.log(typeof jsIsFun);

// undefined
let val;
console.log(val);
console.log(typeof val);
val = 3;
console.log(typeof val);

// null
console.log(typeof null); // shows it's an object


// should always declare variables



// cc1
var markWeight = 78;
var markHeight = 1.69;
var johnWeight = 92;
var johnHeight = 1.95;
var markBMI = markWeight / markHeight ** 2;
var johnBMI = johnWeight / johnHeight ** 2;
var markHigher = markBMI > johnBMI;
console.log(markBMI, johnBMI, markHigher);


// Strings and Template Literals
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;
// js type coercion
const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(jonas);
// <=>
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);
// newline
console.log('String with \n\
multiple \n\
lines');
// <=> (simpler)
console.log(`String with
multiple
lines`)



// Taking Decisions: if / else Statements

var age = 15;
if (age >= 18) {
    console.log('Sarah can start driving license 🚗');
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}


let century;
if (birthYear <= 2000) {
    let century = 20; // conditionally mutate century
} else {
    let century = 21;
}
console.log(century);


// Type Conversion and Coercion

// type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23);

// type coercion
console.log('I am ' + 23 + ' years old'); // auto convert to str

console.log('23' - '10' - 3); // - convert str to num
console.log('23' + '10' + 3); // + convert num to str
console.log('23' * '2');
console.log('a' * 2); // NaN
console.log('23' / '2');
console.log('23' > '18'); // true

// e.g.
let n = '1' + 1; // '11'
n = n - 1;
console.log(n); // 10

console.log(2 + 3 + 4 + '5'); // 9 + '5' => '95'

console.log('10' - '4' - '3' - 2 + '5'); // 1 + '5' => '15'


// Truthy and Falsy Values

// 5 falsy values: 0, '', undefined, null, NaN
// true o/w
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(''));
console.log(Boolean('Jonas'));
console.log(Boolean({})); // empty object -> truthy value

const money = 0;
if (money) {
    console.log("Don't spend it all");
} else {
    console.log("You should get a job");
}

// undefined case
let height = 0;
if (height) {
    console.log('YAY! Height is defined');
} else {
    console.log('Height is UNDEFINED');
}

// Equality Operators: == vs. ===
// == loose, with type coercion
// === strict, no type coercion
var age = 18;
if (age === 18) console.log('You just became an adult :D');

console.log('18' == 18);
console.log('18' === 18);

// NOTE: always try to avoid ==, use === by default

// case: use type conversion before ===
/*
var favourate = Number(prompt("What's your favourate number?"));
console.log(favourate);
console.log(typeof favourate);

if (favourate === 23) console.log('Cool! 23 is an amzaing number!');

if (favourate !== 23) console.log('Why not 23?');
*/


////////////////////////////////////
// Logical Operators
const hasDriversLicense = true; // A
const hasGoodVision = false; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log('Sarah is able to drive!');
} else {
    console.log('Someone else should drive...');
}


////////////////////////////////////
// The switch Statement

var day = 'wednesday';

switch (day) {
    case 'monday': // day === 'monday'
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break; // need break at the end of each block
    case 'tuesday':
        console.log('Prepare theory videos');
        break;
    // wednesday || thursday
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log('Record videos');
        break;
    case 'saturday':
    case 'sunday':
        console.log('Enjoy the weekend :D');
        break;
    default:
        console.log('Not a valid day!');
}

////////////////////////////////////
// Statements and Expressions

// expression: produce value
3 + 4
1991
true && false && !false

// statement: does not produce value
if (23 > 10) {
    const str = '23 is bigger';
}


////////////////////////////////////
// The Conditional (Ternary) Operator


var age = 17;
// another way to write if/else statement
age >= 18 ? console.log('I like to drink wine🍷') :
    console.log('I like to drink water💦');


// 🔥 a lot easier to write, useful in many cases
var drink = age >= 18 ? 'wine🍷' : 'water💦';
console.log(drink);

// too redundant
var drink2;
if (age >= 18) {
    drink2 = 'wine🍷';
} else {
    drink2 = 'water💦';
}
console.log(drink2);

// 🔥 conditional(ternary) operator + template literal
console.log(`I like to drink ${age >= 18 ? 'wine🍷' : 'water💦'}`);


////////////////////////////////////
// Coding Challenge #4
// q1
var bill = 275;
var tip = bill * (bill >= 50 && bill <= 300 ? 0.15 : 0.2);

// q2
console.log(`bill value: ${bill}
tip: ${tip}
final value: ${bill + tip}`);


// 🔥 use the latest chrome browser for development, and use Babel to transpile to ES5 after app is developed, since older browser
// does not support new JS features




