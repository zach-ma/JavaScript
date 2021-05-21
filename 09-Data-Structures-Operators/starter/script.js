'use strict';

// Data needed for a later exercise
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    // NOTE we can write like this instead of 'thu'
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  [`sat`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // NOTE ES6 enhanced object literals: can just write: "openingHour," instead of "openingHours: openingHours,"
  openingHours,

  // NOTE
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // NOTE
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  //NOTE we can omit function keyword in ES6
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

///////////////////////////////////////
// Destructuring arrays

const arr = [2, 3, 4];
const [x, y, z] = arr; // NOTE
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories; // NOTE
console.log(main, secondary);

// Switching variables

// // traditional method
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// easier switching
[main, secondary] = [secondary, main]; //NOTE destructuring
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0); // NOTE destructuring
console.log(starter, mainCourse);

// NOTE Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested; // NOTE
console.log(i, j, k);

// NOTE Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

///////////////////////////////////////
// Destructuring objects

// NOTE Destructuring objects, useful for getting data
const { name, openHours, categories } = restaurant;
console.log(name, openHours, categories);

// NOTE give new property names, helpful when dealing with third party object data
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// NOTE Setting default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
// NOTE when starting with {}, JS expects it as a code block, we cannot assign any code block,
// so the trick is to wrap the whole thing with ()
({ a, b } = obj);

// Nested objects
const { fri } = openingHours;
console.log(fri);

const {
  fri: { open: o, close: c }, // NOTE
} = openingHours;
console.log(o, c);

// NOTE
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
// use default values
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
});

///////////////////////////////////////
// Spread operator(...)
const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);
const newArr = [1, 2, ...arr2]; // NOTE ... takes all the element out of the array
console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // NOTE
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]; // shallow copy

// Join 2 arrays
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu2);

// NOTE (...) expands any iterables
// Iterables: arrays, strings, maps, sets, NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// console.log(`${...str}`); // NOTE does not work since it does not accept strings separated by comma in ${}

// UNCOMMENT
// // NOTE Real world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);
// // instead of this:
// // restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// // we use ...
// restaurant.orderPasta(...ingredients); // NOTE

// NOTE Objects
const newRestaurant = { foundIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'RR';
console.log(restaurantCopy.name);
console.log(restaurant.name); // NOTE does not change the original

///////////////////////////////////////
// rest pattern and parameters (pack elements into array, the opposite of ...)

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr3 = [1, 2, ...[3, 4]];
console.log(arr3);

// NOTE REST, because on LEFT side of =
const [m, n, ...others] = [1, 2, 3, 4, 5];
console.log(m, n, others);

// NOTE rest element must be last element
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// NOTE Objects
const { sat, ...weekdays2 } = restaurant.openingHours;
console.log(weekdays2);

// 2) Functions
// NOTE pack parameters using Rest
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};
console.log(add(2, 3));
console.log(add(5, 3, 7, 2));
console.log(add(8, 4, 2, 3, 1, 1, 2));

const s = [23, 5, 7];
console.log(add(...s));

// Real world example
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

///////////////////////////////////////
// short circuiting(&& and ||)

console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas'); // return the first truthy value
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null); // NOTE || returns last falsy value
console.log(undefined || 0 || '' || 'hello' || 23 || null);

restaurant.numGuests = 0;

// check if exists
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
// use ||
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas'); // NOTE && returns LAST value
console.log('Hello' && 23 && null && 'jonas');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushroom', 'spinach');
}
// <=> NOTE
restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach');

///////////////////////////////////////
// nullish coalescing operator(??)

// Nullish: null and undefined (NOT 0 or '')
// VERY USEFUL
// NOTE only if restaurant.numGuests is null or undefined, 10 will be assigned
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

///////////////////////////////////////
// Coding Challenge 1
/*
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. 
For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, 
and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. 
So create a new array ('players1Final') containing all the original team1 players 
plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of 
player names (not an array) and prints each of them to the console, along with 
the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console 
which team is more likely to win, without using an if/else statement or the ternary operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
Then, call the function again with players from game.scored
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const players1 = game.players[0];
const players2 = game.players[1];

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2]; // NOTE
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const team1 = game.odds.team1;
const draw = game.odds.x;
const team2 = game.odds.team2;

const printGoals = function (...playerNames) {
  for (let i = 0; i < playerNames.length; i++) {
    console.log(playerNames[i]);
  }
  console.log(`${playerNames.length} goals were scored`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// // my solution:
// // redundant
// const team1Wins = team1 < team2 && 'team 1 is likely to win';
// const team2Wins = team1 > team2 && 'team 2 is likely to win';
// const teamsDraw = team1 === team2 && 'likely to draw';
// console.log(team1Wins || teamsDraw || team2Wins);
// NOTE nice trick!!!
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

///////////////////////////////////////
// looping arrays: the for-of loop
const menu3 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu3) console.log(item); // NOTE for-of loop is a lot simpler

// NOTE .entries() method, returns index and the item
console.log([...menu3.entries()]);

for (const item of menu3.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}
// NOTE better way of doing it
for (const [i, el] of menu3.entries()) {
  console.log(`${i + 1}: ${el}`);
}

///////////////////////////////////////
// Optional Chaining(?.)

console.log(restaurant.openingHours.mon);

// in real life data, we do not know if it will open on monday or not
// NOTE so in traditional method, we need to check 1. if opening hour exists 2. if opening hour on monday exists
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// NOTE WITH optional chaining
// NOTE will get undefined if .mon does not exist
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open); // safer

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  //console.log(day);
  // const open = restaurant.openingHours[day]?.open || 'closed';
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // NOTE use ?? to deal with falsy value 0
  console.log(`On ${day}, we open at ${open}`);
}

// optional chaining works on methods
console.log(restaurant.order?.(0, 1) ?? 'Methods does not exist'); // NOTE
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Methods does not exist');

// optional chaining works on arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];
console.log(users[0]?.name ?? 'user array empty'); // NOTE
console.log(users[0]?.sss ?? 'user array empty');

///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries

// Property NAMES (Object.keys)
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES (Object.values)
const values = Object.values(openingHours);
console.log(values);

// Entire object (Object.entries)
const entries = Object.entries(openingHours);
console.log(entries);

// [key, value] NOTE
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already 
  studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note 
how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, 
and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1.
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

// 2.
// my solution
// const oddsKeys = Object.keys(game.odds);
// let [sum, counter] = [0, 0];
// for (let key of oddsKeys) {
//   counter++;
//   sum += game.odds[key];
// }
// console.log(`average odds: ${sum / counter}`);
// NOTE
let average = 0;
let odds = Object.values(game.odds);
for (const odd of odds) {
  average += odd;
}
average /= odds.length;
console.log(`average odds: ${average}`);

// 3.
// // my wrong solution:
// console.log(`Odd of victory ${game.team1}: ${game.odds.team1}`);
// console.log(`Odd of draw: ${game.odds.x}`);
// console.log(`Odd of victory ${game.team2}: ${game.odds.team2}`);
// NOTE
for (const [team, odd] of Object.entries(game.odds)) {
  if (game?.[team]) {
    console.log(`Odd of victory ${game[team]}: ${odd}`);
  } else {
    console.log(`Odd of draw: ${odd}`);
  }
}
// another method:
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }

// bonus
//NOTE
const scorers = {};
for (const scorer of game.scored) {
  if (scorers?.[scorer]) {
    scorers[scorer]++;
  } else {
    scorers[scorer] = 1;
  }
}
console.log(scorers);
// same logic, simpler implementation
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1); // NOTE
// }

///////////////////////////////////////
// Sets

// need to pass in iterable
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);
console.log(new Set('Jonasss'));

console.log(ordersSet.size);

console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('BBB'));

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet);

ordersSet.delete('Risotto');
console.log(ordersSet);

// ordersSet.clear();
// console.log(ordersSet);

for (const order of ordersSet) console.log(order); // looping is still possible

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUniqueArr = [...new Set(staff)];
console.log(staffUniqueArr);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
console.log(new Set('aaaaabbbbabababacccccddd').size);

///////////////////////////////////////
// Maps: Fundamentals
// very useful NOTE

const rest = new Map(); // initialize
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

// add maps
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest);
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // NOTE use bool as map keys

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
rest.clear();
console.log(rest);

// rest.set([1, 2], 'Test');
// console.log(rest);
// console.log(rest.get([1, 2])); // these two arrays are not the same object in the heap
// to make it work:
const arr4 = [1, 2];
rest.set(arr4, 'Test');
console.log(rest);
console.log(rest.get(arr4));

rest.set(document.querySelector('h1'), 'Heading'); // NOTE useful
console.log(rest);

///////////////////////////////////////
// Maps: Iteration

// Quiz app
// init
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// NOTE convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours)); // NOTE
console.log(hoursMap);
// good use case of destructuring
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt('Your answer')); //UNCOMMENT
const answer = 3;
console.log(question.get(answer === question.get('correct'))); // NOTE

// NOTE convert map to array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events 
that happened during the game. The values are the events themselves, and the keys are the 
minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1
const events = [...new Set(gameEvents.values())]; // NOTE convert map to unique array
console.log(events);

// 2
gameEvents.delete(64);
console.log(gameEvents);

// 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
// bonus to get accurate time
const time2 = [...gameEvents.keys()].pop(); // NOTE use pop() to get the last one
console.log(time2);
console.log(
  `An event happened, on average, every ${time2 / gameEvents.size} minutes`
);

// 4 NOTE
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? '[FIRST HALF]' : '[SECOND HALF]';
  console.log(`${half} ${min}: ${event}`);
}

///////////////////////////////////////
// Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

// index
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal')); // NOTE
console.log(airline.indexOf('portugal')); // case sentitive

// slicing
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' '))); // first word
console.log(airline.slice(airline.lastIndexOf(' '))); // last word

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas')); // what JS do behind the scene: boxing, converts string to object and then we can use methods
console.log(typeof new String('jonas')); // object
console.log(typeof new String('jonas').slice(1)); // string

///////////////////////////////////////
// Working With Strings - Part 2

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = 'Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim(); // NOTE faster
console.log(normalizedEmail);
console.log(normalizedEmail === email);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
// NOTE replaceAll():
console.log(announcement.replaceAll('door', 'gate'));
// NOTE regular expression:
console.log(announcement.replaceAll(/door/g, 'gate'));

// Booleans
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));

console.log(plane2.startsWith('Air'));
console.log(plane2.startsWith('A3'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

///////////////////////////////////////
// Working With Strings - Part 3

// Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' '); // NOTE

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

// NOTE good example
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // method 1
    // namesUpper.push(n[0].toUpperCase() + n.slice(1).toLowerCase()); // NOTE
    namesUpper.push(n.replace(n[0], n[0].toUpperCase())); // NOTE
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+')); // NOTE
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// NOTE
const maskCreditCard = function (number) {
  const str = number + ''; // NOTE nice trick of string conversion
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`); // NOTE
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// NOTE
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  // console.log(text);
  const rows = text.split('\n');
  console.log(rows);
  const camels = [];
  for (const row of rows) {
    // console.log(row.toLowerCase().trim().split('_'));
    const lowerTrimed = row.toLowerCase().trim().split('_');
    camels.push(
      lowerTrimed[0] + lowerTrimed[1][0].toUpperCase() + lowerTrimed[1].slice(1)
    );
  }
  console.log(camels);
  for (const [index, camel] of camels.entries()) {
    console.log(`${camel.padEnd(20, ' ')}${'✅'.repeat(index + 1)}`);
  }
});

// official solution:
// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const rows = text.split('\n');

//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split('_');

//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
//   }
// });

///////////////////////////////////////
// String Methods Practice

// NOTE useful practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.includes('Delayed') ? '🔴' : ''} ${type
    .replaceAll('_', ' ')
    .trim()} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(44);
  console.log(output);
}

const rows2 = flights
  .replaceAll('_', ' ')
  // .replaceAll(';', ' ')
  .replaceAll(':', 'h')
  // .replaceAll('+', ')\n')
  .split('+');

console.log(rows2);
