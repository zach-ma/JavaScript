'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to'); // class name => .
const section1 = document.querySelector('#section--1'); // id: section--1 => #

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// NOTE in the NodeList, we can use forEach method to attach an event handler to each of the elements
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); // e.target is the one clicked which is btnScrollTo

  console.log('Current scroll (X/Y):', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, // get hight of the current page
    document.documentElement.clientWidth
  );

  // scrolling

  // - old school way: manually calculate and say that we want to scroll to this position
  window.scrollTo({
    // relative to the viewport, NOTE need to add the current scroll
    // scroll to: current position + current scroll NOTE
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // - modern way:
  // section1.scrollIntoView({ behavior: 'smooth' }); // only works for modern browsers
});

///////////////////////////////////////
// Page navigation
console.log(document.querySelectorAll('.nav__link'));

// // old method: attach scroll to each element, which is not efficient
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     // <a class="nav__link" href="#section--1">Features</a>
//     //NOTE  anchors: "#section--1" in HTML, which automatically move the page to the anchor after clicking the element, by default
//     e.preventDefault(); // so we need to prevent it

//     // NOTE
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// NOTE NOTE NOTE
// new method: use events delegation, more efficient
// NOTE events delegation: put the eventListener on a common parent of all the elements that we are interested in, 'links' in this case
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // console.log(e);
  console.log(e.target); // NOTE
  // console.log(e.currentTarget);

  // NOTE Matching strategy: check if it contains the class that we interested in
  console.log(e.target.classList);
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');

    // copy and paste here
    const id = e.target.getAttribute('href'); // NOTE
    // const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  // console.log(e.target.parentElement.children);

  // const clicked = e.target.parentElement; // different result when clicking span and button
  const clicked = e.target.closest('.operations__tab'); // NOTE when clicking the button, the closest is button itself,
  // when clicking the span, the closest is its parent element, which is also the button
  console.log(clicked);

  // - Guard clause
  if (!clicked) return; // NOTE when nothing clicked, clicked === null, finish the function

  // - Activate tab
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // NOTE
  clicked.classList.add('operations__tab--active');

  // - Activate content area
  // console.log(clicked.dataset);
  // console.log(clicked.dataset.tab);
  console.log(tabsContent);
  // NOTE remove all before activate
  [...tabsContent].forEach(t =>
    t.classList.remove('operations__content--active')
  );
  // activate
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  console.log();

  // [...e.target.parentElement.children].forEach(function (el) {
  //   el.classList.remove('operations__tab--active');
  // });
  // e.target.classList.add('operations__tab--active');
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

///////////////////////////////////////
/*
// Selecting, Creating, and Deleting Elements

// - Selecting elements
console.log(document.documentElement); // entire html
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // return first element that matches
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // returns  HTMLCollection, updates console automatically
// NOTE HTMLCollection updates on console automatically, NodeList does not
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// - Creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improving functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // add as first child
header.append(message); // move first child 'message' and add as last child
// header.append(message.cloneNode(true)); // clone it first before appending to prevent removal

// header.before(message); // before header element, as sibling
// header.after(message);

// - Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

///////////////////////////////////////
// Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.height); // get nothing, height is not inline style(not we created by code)
console.log(message.style.backgroundColor); // we can get it since it is inline style, we manually created by code

console.log(message.style.color); // get nothing
console.log(getComputedStyle(message).color); // NOTE getComputedStyle: useful, now we can get it
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // NOTE Number.parsefloats take the number part of the string and convert it to float
console.log(message.style.height);

// set css color:
// document.documentElement.style.setProperty('--color-primary', 'orangered'); // root of css is equal to document

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); // className istead of class

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

// Non-standard
console.log(logo.designer); // does not work if it is not a standard property
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist'); // set attribute
console.log(logo.getAttribute('company'));

console.log(logo.src); // absolute version
console.log(logo.getAttribute('src')); // relative version

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute version
console.log(link.getAttribute('href')); // relative

// Data attributes
// start with 'data-'
console.log(logo.dataset.versionNumber); // 1. 'data-' => dataset 2. 'version-number' => versionNumber in camel case

// Classes
// 4 methods:
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes
// logo.className = 'jonas'; // Don't use, will over write all the existing classes

// Learn more button, smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to'); // class name => .
const section1 = document.querySelector('#section--1'); // id: section--1 => #
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); // e.target is the one clicked which is btnScrollTo

  console.log('Current scroll (X/Y):', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, // get hight of the current page
    document.documentElement.clientWidth
  );

  // scrolling

  // - old school way: manually calculate and say that we want to scroll to this position
  window.scrollTo({
    // relative to the viewport, NOTE need to add the current scroll
    // scroll to: current position + current scroll NOTE
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // - modern way:
  // section1.scrollIntoView({ behavior: 'smooth' }); // only works for modern browsers
});

///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector('h1');

// method1: addEventListener allows adding multiple event listeners to the same event
const alertH1 = function (e) {
  // alert('addEventListener: Great! You are reading the heading :D');
  console.log('addEventListener: Great! You are reading the heading :D');
  // h1.removeEventListener('mouseenter', alertH1); // remove it immediately after first time => response to event listener only once
};
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // remove it 3 seconds after the webpage is opened

// // method2:
// h1.onmouseenter = function (e) {
//   // alert('onmouseenter: Great! You are reading the heading :D');
//   console.log('onmouseenter: Great! You are reading the heading :D');
// };

///////////////////////////////////////
// Event Propagation in Practice

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// first link element
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor(); // UNCOMMENT to see effect
  console.log('LINK', e.target, e.currentTarget); // target: where the event originated
  console.log(e.currentTarget === this);
  // NOTE Stop event propagation
  // e.stopPropagation(); // UNCOMMENT to see effect
});

// parent element 1
// NOTE when click link, it then bubbles up, its parent element links is also triggered by click
// however, when click outside of link but inside the links, the link will not change, but links will change color
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();// UNCOMMENT to see effect
  console.log('CONTAINER', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});
// parent element 2
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    // this.style.backgroundColor = randomColor();// UNCOMMENT to see effect
    console.log('NAV', e.target, e.currentTarget);
    console.log(e.currentTarget === this);
  },
  false // is set to false by default
  // true // NOTE true: the NAV is now actually listening for the event as it travels from the DOM,
  // while other ones are listening for the event as it travels back up, so NAV is now the first one to show up in the console
);


///////////////////////////////////////
// DOM Traversing
// meaning: walking through the DOM, we can select an element based on another element because
// sometimes we need to select elements relative to a certain other element
const h1 = document.querySelector('h1');

// - Going downwards: child
// works no matter how deep the child element is
// by querySelector, only children of h1 can be selected
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); // NOTE only works for direct child
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'black';

// - Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
// find parent no matter how far away and change its properties:
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // NOTE
h1.closest('h1').style.background = 'var(--gradient-primary)'; // h1 itself

// - Going sideways: siblings
// most likey using element sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); // not very useful
console.log(h1.nextSibling);

// trick for getting all the siblings:
console.log(h1.parentElement.children); // NOTE
console.log([...h1.parentElement.children]);
// NOTE iterate through the siblings:
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/
