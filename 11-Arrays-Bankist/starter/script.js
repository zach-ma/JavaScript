'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////

/////////////////////////////////////////////////
// BANKIST APP

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// starts here
/////////////////////////////////////////////////
// Init
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]) // NOTE
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
// Display

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // NOTE innerHTML, clean the container before adding elements

  const movs = sort
    ? movements.slice().sort((a, b) => a - b) // NOTE we should not mutate the original, so we create a shallow copy
    : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // use template literal for html strings
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // NOTE
    // containerMovements.insertAdjacentHTML('beforeend', html);
  });
};
// displayMovements(currentAccount.movements);
console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (acc, cur, i, arr) => acc + cur,
    0
  );
  labelBalance.textContent = `${account.balance}€`;
};
// calcDisplayBalance(currentAccount.movements);

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    // NOTE:
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1; // only interest at least 1 will be added
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(currentAccount.movements);

const updateUI = function (acc) {
  // Display movements, balance, and summary
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

/////////////////////////////////////////////////
// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // NOTE since it is a 'form' element, by default the web will reload when click the button,
  //      we need to avoid this by adding a 'event' param
  // NOTE 1. prevent form from submitting 2. hiting enter in two forms will trigger click event
  e.preventDefault();
  // console.log('LOGIN');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // optional chaining ?.
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Good Day, ${
      currentAccount.owner.split(' ')[0]
    }!`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; // NOTE trick!!! assigns from right to left
    inputLoginUsername.blur();
    inputLoginPin.blur(); // NOTE make cursor lose focus

    // Update UI
    updateUI(currentAccount);

    console.log('LOG IN');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  // check if amount and username are valid
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc && // NOTE check existence
    receiverAcc?.username !== currentAccount.username // check if transfer to currentAccount
  ) {
    // console.log('Transfer Valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete');

  if (
    // check correctness of credentials
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // NOTE findIndex()
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);
    console.log(accounts);

    // Log out, hide UI
    containerApp.style.opacity = 0;
  }

  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // Add positive movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

let sorted = false; // NOTE
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////

// LEC
/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // NOTE get last 2 elements
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // NOTE extract from index 1 till the end except last 2 elements
console.log(arr.slice()); // NOTE shallow copy method 1
console.log([...arr]); // shallow copy method 2

// splice
// NOTE (mutates the original array)
// console.log(arr);
// console.log(arr.splice(2)); // returns the extracted part of the array
// console.log(arr); // mutated
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); // NOTE from position 1, delete 2 elements
console.log(arr);

// reverse
// NOTE (mutates the origin)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// concat
// NOTE does not mutate original
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// join
console.log(letters.join('-'));

///////////////////////////////////////
// Looping Arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// higher order -> needs callback function
console.log('------forEach------');
// NOTE forEach is better than for of
// NOTE param order matters: the default order (element of the array, index, the whole array)
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// ...

///////////////////////////////////////
// forEach With Maps and Sets
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

// second param is set to the same as first by default
// NOTE convention: _ indicates it is a throwaway variable
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, 
and stored the data into an array (one array for each). For now, they are just 
interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it 
is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually 
have cats, not dogs! So create a shallow copy of Julia's array, and remove the 
cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, 
and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  const concatenated = dogsJuliaCorrected.concat(dogsKate);
  concatenated.forEach(function (age, i) {
    // const type = age >= 3 ? 'adult' : 'puppy';
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////
// The map Method
// (will give new array)

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd); // NOTE cleaner to use arrow function, => is equal to return
console.log(movements);
console.log(movementsUSD);
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// NOTE
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

///////////////////////////////////////
// The filter Method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits2 = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits2);

const withdrawals2 = movements.filter(mov => mov < 0); // NOTE arrow
console.log(withdrawals2);

///////////////////////////////////////
// The reduce Method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// accumulator -> snowball
// NOTE the first param is acc
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 10000000); // NOTE inital value of acc: 10000000
console.log(balance);

// maximum value
const maximum = movements.reduce(
  (acc, mov) => Math.max(acc, mov), // NOTE
  movements[0]
);
console.log(maximum);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to
convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog 
is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// NOTE: to eliminate errors, and to be more clear, create a new variable in each step, and use the new variable in the next step
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  const adults = humanAges.filter(age => age >= 18);
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return average;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////
// The Magic of Chaining Methods
// NOTE: 1. always try to optimize chaining by reduce the number of methods used
// NOTE: 2. should not use splice() / reverse() that mutates the array in chain
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  //.map(mov => return mov * eurToUsd); // NOTE clean but hard to debug
  .map((mov, i, arr) => {
    console.log(arr); // NOTE useful for debugging
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0); // we could only chaining when the previous is array
console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const calcAverageHumanAge2 = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////
// The find Method
// returns the first element satisfies the condition

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

///////////////////////////////////////
// some and every

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Equality
console.log(movements.includes(-130)); // we can only test for exact equality
console.log(movements.some(mov => mov === -130));

// some() Condition
const anyDeposits = movements.some(mov => mov > 0); // NOTE
console.log(anyDeposits);

// every()
console.log(movements.every(mov => mov > 0));
console.log(account4.movements);
console.log(account4.movements.every(mov => mov > 0));

// seperate callback
console.log('-----seperate callback-----');

const deposit = mov => mov > 0; // NOTE seperate callback
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////
// flat and flatMap

// flat() remove nested arrays, but only one level deep
const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr3.flat());
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1));
console.log(arrDeep.flat(2)); // NOTE 2 levels deep

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// flatMap()
// combines flat() and map() for better performance
// only goes 1 level deep, cannot specify it
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

///////////////////////////////////////
// Sorting Arrays

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners); // mutates the string

// Numbers
console.log(movements);
// console.log(movements.sort()); // does not work, since sort() is based on string

// NOTE
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// NOTE Ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);
movements.sort((a, b) => a - b); // NOTE
console.log(movements);

// Descending
movements.sort((a, b) => b - a);
console.log(movements);

///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arr4 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
arr4.fill(23, 2, 6); // mutates
console.log(arr4);

// Empty arrays + fill method
const x = new Array(7); // empty * 7
console.log(x);
console.log(x.map(() => 5));
// x.fill(1); // NOTE
x.fill(1, 3, 5); // NOTE fill from index 3 to 4
console.log(x);

// Array.from NOTE useful
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // NOTE just like in map function, always (cur, i)
console.log(z);

const k = Array.from({ length: 20 }, () => Math.trunc(Math.random() * 6 + 1));
console.log(k);

labelBalance.addEventListener('click', function () {
  // NOTE
  const movementsUI = Array.from(
    // 1. create an array from a node list (arrat like structure)
    document.querySelectorAll('.movements__value'),
    // 2. convert using map method
    ele => Number(ele.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

///////////////////////////////////////
// Array Methods Practice

// 1.
const bankDepositSum = accounts
  // .map(account => account.movements).flat()
  .flatMap(account => account.movements)
  .filter(account => account > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(account => account.movements)
//   .filter(account => account > 1000).length;
const numDeposits1000 = accounts
  .flatMap(account => account.movements)
  // NOTE use reduce() as a counter
  // .reduce((count, cur) => count + Number(cur > 1000), 0);
  // .reduce((count, cur) => (cur > 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur > 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// prefixed ++ operator
let a = 10;
console.log(a++);
console.log(a);
console.log(++a);
console.log(a);

// 3.
// NOTE NOTE NOTE advanced use case of reduce()
const { deposits, withdrawals } = accounts // NOTE Destructure
  .flatMap(account => account.movements)
  .reduce(
    // Method 1:
    // (sums, cur) => {
    //   cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
    //   return sums; // NOTE remember to return
    // },

    // NOTE Method 2: cleaner
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // NOTE NOTE NOTE
      return sums;
    },
    { deposits: 0, withdrawals: 0 } // NOTE initilize object
  );
console.log(deposits, withdrawals);

// 4.
// this is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  return (
    title
      .toLowerCase() // do this first
      .split(' ')
      // .reduce((list, cur) => {
      //   if (exceptions.includes(cur)) {
      //     list.push(cur);
      //   } else {
      //     list.push(cur[0].toUpperCase() + cur.slice(1));
      //   }
      //   return list;
      // }, [])
      .map(word =>
        exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join(' ')
  );
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

too much /too little / 0.9 < okay < 1.1

1. Loop over the array containing dog objects, and for each dog, calculate
 the recommended food portion and add it to the object as a new property. 
 Do NOT create a new array, simply loop over the array. 
 Forumla: recFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much 
or too little. HINT: Some dogs have multiple owners, so you first need to 
find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat 
too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., 
like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the 
amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended 
food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion 
means: current > (recommended * 0.90) && current < (recommended * 1.10). 
Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.map(dog => (dog.recFood = dog.weight ** 0.75 * 28));
console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
console.log(
  dogs.some(
    dog => dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1
  )
);

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const okay = dogs.filter(
  dog => dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1
);
console.log(okay);

// 8. Create a shallow copy of the dogs array and sort it by recommended
// food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// const dogsCopy = dogs.slice();
// dogsCopy.sort((a, b) => a.curFood - b.curFood);
// console.log(dogsCopy);

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood); //NOTE
console.log(dogsSorted);
