'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// Learn more button, smooth scrolling
// - old school way:
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
});

// - modern way:

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

///////////////////////////////////////
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
