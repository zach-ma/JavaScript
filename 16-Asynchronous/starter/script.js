'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest (old school way of doing AJAX in JS)

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   // after request is sent, as soon as the data is arrived, the function will be called
//   request.addEventListener('load', function () {
//     console.log(this.responseText); // JSON
//     const [data] = JSON.parse(this.responseText); // parse JSON data + destructuring
//     console.log(data);

//     const html = `
// <article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 1000000
//     ).toFixed(1)} Million people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = 1;
//   });
// };

// 3 AJAX calls one after another => one may appear later => order might be different

// getCountryData('usa');
// getCountryData('canada');
// getCountryData('germany');

// => chain the requests

///////////////////////////////////////
// NOTE Callback Hell
// nested callbacks, in order to execute asynchronous tasks in sequence
// CONS: messy, hard to maintain, difficult to understand

// goal: display all the boarders in original order
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)} Million people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

// AJAX call country 1
// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country 2
//     const [neighbour] = data.borders; // NOTE destructuring => take the first element
//     if (!neighbour) return; // handle the case that neighbour DNE

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       //   console.log(this.responseText);
//       const data2 = JSON.parse(this.responseText);
//       //   console.log(data2);

//       // Render country 1
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('germany');

// callback hell happens to all asynchronous tasks, not just AJAX
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// => use promises to solve the callback hell problem

///////////////////////////////////////
// Fetch

// old school way:
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

// modern way:
// const request = fetch('https://restcountries.eu/rest/v2/name/germany');
// console.log('fetch: https://restcountries.eu/rest/v2/name/germany');
// console.log(request); // immediately get promise

///////////////////////////////////////
///////////////////////////////////////
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

///////////////////////////////////////
// Consuming Promises

// const getCountryData = function (country) {
//   // pending, state not determined
//   // assume success
//   // 1. fetch returns a promise
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     // 2. handle the promise using then()
//     .then(function (
//       response // NOTE receives one arg, which is the fullfilled promise
//     ) {
//       console.log(response);
//       // NOTE json() is available for all the response objects(resolved values) coming from the fetch()
//       // NOTE json() is also asynchronous, and it will also return new promise
//       // 3. read the data from the response and return the resulting promise that json() created
//       return response.json(); // will be a new promise
//     })
//     // 4. hanle the promise using then(), now we have access to the data
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('portugal');

// simplified code:
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };
// getCountryData('portugal');

///////////////////////////////////////
// Chaining Promises NOTE
// const getCountryData = function (country) {
//   // country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);

//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//       // NOTE return: the fulfilled value of the next then() will be fulfilled value of this previous promise
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };
// getCountryData('canada');

///////////////////////////////////////
// Handling Rejected Promises
///////////////////////////////////////
// Throwing Errors Manually

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

// in this case, only consider internet connection issue
const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(
      response => {
        console.log(response);
        // NOTE NOTE NOTE manually throw errors
        // immediately terminate the current function
        // promise returned by this function will be a rejected promise
        // => that rejection will propagate all the way down to the catch handler
        if (!response.ok)
          throw new Error(`Country not found ${response.status}`);

        return response.json();
      }
      // err => alert(err) // NOTE bad way: add second argument to handle error
    )
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0]);

      //   const neighbour = data[0].borders[0];

      const neighbour = 'xxxxxx';

      if (!neighbour) return;

      // country 2
      return fetch(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`
        //  err => alert(err)
      );
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    // NOTE catch all the err in the chain!
    .catch(err => {
      console.error(`${err}: 💥💥💥`);
      renderError(`Something went wrong 💥💥  ${err.message}. Try again!`); // NOTE
    })
    // NOTE always happens => finally()
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('canada');
});

// another type of error
// getCountryData('xxxxxxx');
