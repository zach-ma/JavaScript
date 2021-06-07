'use strict';

// prettier-ignore
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let map, mapEvent, newMarker; // move to class private fields

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // create unique id, by assigning current time stamp, works well for single user
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // NOTE
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
    console.log(this.clicks);
  }
}

class Running extends Workout {
  type = 'running'; // NOTE
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace(); // use constructor to immediately calculate the pace
    this._setDescription();
  }
  calcPace() {
    this.pace = this.duration / this.distance; // min/km
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); // km/h
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Running([39, -12], 27, 95, 523);
console.log(run1, cycling1);

/////////////////////////////////////////
// App Architecture

class App {
  // Private fields:
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  // NOTE constructor is executed immediately after the page loads => add function into constructor instead of outside of the class, to make it cleaner
  constructor() {
    // - Get user's position
    this._getPosition();

    // - Get data from local storage
    this._getLocalStorage();

    // - Attach event handlers
    // NOTE NOTE NOTE _newWorkout, as a event handler function, 'this' will now point to the dom element it
    // attached to, which is form, not App. So we need to use bind
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this)); // NOTE event delegation
  }

  _getPosition() {
    if (navigator.geolocation) {
      // NOTE NOTE NOTE _loadMap will be a regular function call, so this keyword will be set to undefined
      // so we need to use bind method to set this keyword to current 'this'
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    // NOTE position variable stores the current position
    // the callback _loadMap is called once the position is loaded by getCurrentPosition

    // get latitude & longitude
    const { latitude } = position.coords; // NOTE destructuring
    const { longitude } = position.coords; // NOTE destructuring
    console.log(latitude, longitude);

    // import and use Leaflet library
    const coords = [latitude, longitude];

    console.log(this); // undefined
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // - Handling clicks on map
    this.#map.on('click', this._showForm.bind(this)); // NOTE

    // - Display markers in local storage when map is loaded
    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE; // NOTE copy it to the global variable

    // - render workout form
    form.classList.remove('hidden');

    // auto focus the cursor on input distance
    inputDistance.focus();
  }

  _hideForm() {
    inputDuration.value =
      inputDistance.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none'; // NOTE need to add this to hide the effect
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000); // NOTE need to add it back after 1 sec
  }

  _toggleElevationField() {
    // NOTE toggle: to make sure it's always one of them that is hidden and other one visible
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // NOTE check if inputs are valid
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from the form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout is running, create running object
    if (type === 'running') {
      const cadence = Number(inputCadence.value);

      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Inputs have to be positive numbers!');
      }
      workout = new Running([lat, lng], distance, duration, cadence);
      console.log(workout);
    }

    // If workout is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = Number(inputElevation.value);

      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Inputs have to be positive numbers!');
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
      console.log(workout);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker popup
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide the form and clear the input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Display the marker
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    console.log(workout);

    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === 'running') {
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
      </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    }
    if (workout.type === 'cycling') {
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }

  // NOTE NOTE NOTE
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout'); // NOTE find the closest workout element when click
    console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id // NOTE
    );

    console.log(this.#workouts);
    console.log(workoutEl.dataset.id); // NOTE
    console.log(workout);

    // NOTE
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // workout.click(); // NOTE NOTE NOTE after conversion, we lost prototype chain, so that we cannot use click() anymore
  }

  // NOTE NOTE NOTE use local storage API, only use it for small amount of data
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
    });
  }

  // Public Interface:
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

// NOTE NOTE NOTE CANNOT be deleted!!! This is used for creating the app!!!
const app = new App();
