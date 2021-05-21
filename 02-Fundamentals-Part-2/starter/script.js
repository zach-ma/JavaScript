// 🔥 activate strict mode: to secure JS code, and avoid bugs
'use strict'; // must be at the top of the script, or it won't work


///////////////////////////////////////
// Activating Strict Mode
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio'; // reserved word 'interface'
// const if = 23; // reserved word 'if'


///////////////////////////////////////
// Functions
function logger() {
    console.log('My name is Jonas');
}
logger(); // calling/running/invoking function


function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);


///////////////////////////////////////
// Function Declarations vs. Expressions

// Function declaration: can call it before initialization
var age1 = calcAge1(1991);
function calcAge1(birthYeah) {
    return 2037 - birthYeah;
}

// Function expression(annonymous function): store function into a variable
const calcAge2 = function (birthYeah) {
    return 2037 - birthYeah;
}
var age2 = calcAge2(1991);

console.log(age1, age2);



///////////////////////////////////////
// Arrow functions: 1. faster to write 2. auto return the value
// 🔥 good for writing one line functions

// one line
const calcAge3 = birthYeah => 2037 - birthYeah;

var age3 = calcAge3(1991);
console.log(age3);

// multiple lines, multiple parameters
const yearsUntilRetirement = (birthYeah, firstName) => {
    const age = 2037 - birthYeah;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`;
}
console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));


///////////////////////////////////////
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
    return juice;
}
console.log(fruitProcessor(2, 3));


///////////////////////////////////////
// Reviewing Functions
/*
const calcAge = function (birthYeah) {
    return 2037 - birthYeah;
}

const yearsUntilRetirement = function (birthYeah, firstName) {
    const age = calcAge(birthYeah);
    const retirement = 65 - age;

    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years`);
        return retirement;
    } else {
        console.log(`${firstName} has already retired 🎉`);
        return -1;
    }
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'Mike'));
*/


///////////////////////////////////////
// Coding Challenge #1

/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), 
   and then logs the winner to the console, together with the victory points, 
   according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀
*/

const calcAverage = (a, b, c) => (a + b + c) / 3;

let avgDolphins = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);

const checkWinner = function (avgDolphins, avgKoalas) {
    let winner;
    if (avgDolphins >= avgKoalas * 2) {
        winner = 'Dolphins win';
    } else if (avgDolphins >= avgKoalas * 2) {
        winner = 'Koalas win';
    } else {
        winner = 'Draw';
    }
    console.log(`${winner} (${avgDolphins} vs. ${avgKoalas})`);
}

checkWinner(avgDolphins, avgKoalas);

avgDolphins = calcAverage(85, 54, 41);
avgKoalas = calcAverage(23, 34, 27);
checkWinner(avgDolphins, avgKoalas);



///////////////////////////////////////
// Introduction to Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

var friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

var years = new Array(1991, 1984, 2008, 2020);
console.log(years);

console.log(friends[0]);
console.log(friends[2]);

// 🔥 get length use .length NOT .length()
console.log(friends.length);
console.log(friends[friends.length - 1]);

// we can mutate element even it is friends is const
// but we can not reassign it another value
friends[2] = 'Jay';
console.log(friends);

const firstName = 'Jonas';
var jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);



///////////////////////////////////////
// Basic Array Operations (Methods)

// add elements: push() unshift()
var friends = ['Michael', 'Steven', 'Peter'];
var newLength = friends.push('Jay'); // push() auto returns length of new array
console.log(friends);
console.log(newLength);

friends.unshift('John');
console.log(friends);

// Remove elements: pop() shift()
friends.pop(); // Last
var popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // First
console.log(friends);


// indexOf()
console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); // return -1 since not in the list

// includes()
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
friends.push(23);
console.log(friends.includes('23')); // return false => use strict equality


///////////////////////////////////////
// Introduction to Objects
var jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);

///////////////////////////////////////
// Dot vs. Bracket Notation
console.log(jonas.lastName);
console.log(jonas['lastName']); // notice the ''

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);


const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends');

// take advantage of using undefined function
if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

// add element to object
jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

// Challenge
console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);



///////////////////////////////////////
// Object Methods

var jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    // function also can be inside function

    // calcAge: function (birthYeah) {
    //   return 2037 - birthYeah;
    // }

    // calcAge: function () {
    //   // console.log(this);
    //   return 2037 - this.birthYeah;
    // }

    // 🔥 this refers to the object itself, must use this
    calcAge: function () {
        this.age = 2037 - this.birthYeah;  // create new property 'age'
        return this.age; //
    },

    getSummary: function () {
        // 🔥 note we have to add () in this.calcAge() 
        return `${this.firstName} is a ${this.calcAge()}-year old teacher, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;
    }


};

console.log(jonas.calcAge());// 🔥 must call calcAge() to create new property 'age'

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

console.log(jonas.getSummary());


///////////////////////////////////////
// Coding Challenge #3

/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! 
Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). 
   Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. 
Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

GOOD LUCK 😀
*/

const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = (this.mass / this.height ** 2).toFixed(1);
        return this.bmi;
    }
};

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = (this.mass / this.height ** 2).toFixed(1);
        return this.bmi;
    }
};

mark.calcBMI();
john.calcBMI();

console.log(mark.bmi);
console.log(john.bmi);

if (mark.bmi > john.bmi) {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`);
} else {
    console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`);
}



///////////////////////////////////////
// Iteration: The for Loop

for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}


///////////////////////////////////////
// Looping Arrays, Breaking and Continuing
var jonas = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven'],
    true
];

var types = [];
for (let i = 0; i < jonas.length; i++) {
    console.log(jonas[i], typeof (jonas[i]));

    // filling types arr
    types[i] = typeof jonas[i];
    // types.push(typeof jonas[i]);
}
console.log(types);


var years = [1991, 2007, 1969, 2020];
var ages = [];
for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i]);
}
console.log(ages);


// continue and break
console.log('--- ONLY STRINGS ---');
for (let i = 0; i < jonas.length; i++) {
    if (typeof jonas[i] !== 'string') continue; // continue
    console.log(jonas[i], typeof (jonas[i]));
}

console.log('--- BREAK WITH NUMBER ---')
for (let i = 0; i < jonas.length; i++) {
    if (typeof jonas[i] === 'number') break; // break

    console.log(jonas[i], typeof jonas[i]);
}

///////////////////////////////////////
// Looping Backwards and Loops in Loops
var jonas = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven'],
    true
];

for (let i = jonas.length - 1; i >= 0; i--) {
    console.log(i, jonas[i]);
}


for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`-------- Starting exercise ${exercise}`);

    for (let rep = 1; rep < 6; rep++) {
        console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
    }
}


///////////////////////////////////////
// The while Loop
let rep = 1;
while (rep <= 10) {
    console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
    rep++;
}


// e.g. does not depend on counter
let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('Loop is about to end...');
}


