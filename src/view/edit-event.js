import moment from 'moment';

import SmartView from './smart.js';
import {waypoints, cities} from '../const.js';
import {toFirstLetterUp} from '../utils/common.js';
import flatpickr from 'flatpickr';
import {generateTrip} from '../mock/trip.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_TRIP = generateTrip();

const toTransport = waypoints.filter((way) => way.action === `to`);
const inTransport = waypoints.filter((way) => way.action === `in`);

const humansDateStart = (trip) => {
  return moment(trip.start).format(`LT`);
};
const humansDateFinish = (trip) => {
  return moment(trip.finish).format(`LT`);
};


const generateCities = () => {
  return cities.map((city) => `<option value=${city}></option>`
  );
};

const createPictureDestination = () => {
  const trips = new Array(5).fill().map(() => `<img class='event__photo' src='http://picsum.photos/248/152?r=${Math.random()}' alt='Event photo'>`);
  return trips;
};

const generateActionTransport = (action) => {
  return action.map((way) =>
    `<div class='event__type-item'>
    <input id='event-type-${way.name}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${way.name}'>
    <label class='event__type-label  event__type-label--${way.name}' for='event-type-${way.name}-1'>${toFirstLetterUp(way.name)}</label>
  </div>`
  ).join(``);
};

const createEditTripEvent = (data) => {
  const {transport, city, information, price, isFavoriteFlag} = data;
  return `<form class='event  event--edit' action='#' method='post'>
                    <header class='event__header'>
                      <div class='event__type-wrapper'>
                        <label class='event__type  event__type-btn' for='event-type-toggle-1'>
                          <span class='visually-hidden'>Choose event type</span>
                          <img class='event__type-icon' width='17' height='17' src='${transport.picture}' alt='Event type icon'>
                        </label>
                        <input class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox'>

                        <div class='event__type-list'>
                          <fieldset class='event__type-group'>
                            <legend class='visually-hidden'>Transfer</legend>
                            ${generateActionTransport(toTransport)}
                          </fieldset>

                          <fieldset class='event__type-group'>
                            <legend class='visually-hidden'>Activity</legend>
                            ${generateActionTransport(inTransport)}
                          </fieldset>
                        </div>
                      </div>

                      <div class='event__field-group  event__field-group--destination'>
                        <label class='event__label  event__type-output' for='event-destination-1'>
                          ${toFirstLetterUp(transport.name)} ${transport.action}
                        </label>
                        <input class='event__input  event__input--destination' id='event-destination-1' type='text' name='event-destination' value='${city}' list='destination-list-1'>
                        <datalist id='destination-list-1'>
                          ${generateCities()}
                        </datalist>
                      </div>

                      <div class='event__field-group  event__field-group--time'>
                        <label class='visually-hidden' for='event-start-time-1'>
                          From
                        </label>
                        <input class='event__input  event__input--time' id='event-start-time-1' type='text' name='event-start-time' value='${humansDateStart(data)}'>
                        &mdash;
                        <label class='visually-hidden' for='event-end-time-1'>
                          To
                        </label>
                        <input class='event__input  event__input--time' id='event-end-time-1' type='text' name='event-end-time' value='${humansDateFinish(data)}'>
                      </div>

                      <div class='event__field-group  event__field-group--price'>
                        <label class='event__label' for='event-price-1'>
                          <span class='visually-hidden'>Price</span>
                          &euro;
                        </label>
                        <input class='event__input  event__input--price' id='event-price-1' type='text' name='event-price' value='${price}'>
                      </div>

                      <button class='event__save-btn  btn  btn--blue' type='submit'>Save</button>
                      <button class='event__reset-btn' type='reset'>Delete</button>

                      <input id='event-favorite-1' class='event__favorite-checkbox  visually-hidden' type='checkbox' name='event-favorite' ${isFavoriteFlag ? `checked` : ``}>
                      <label class='event__favorite-btn' for='event-favorite-1'>
                        <span class='visually-hidden'>Add to favorite</span>
                        <svg class='event__favorite-icon' width='28' height='28' viewBox='0 0 28 28'>
                          <path d='M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z'/>
                        </svg>
                      </label>

                      <button class='event__rollup-btn' type='button'>
                        <span class='visually-hidden'>Open event</span>
                      </button>
                    </header>

                    <section class='event__details'>
                      <section class='event__section  event__section--offers'>
                        <h3 class='event__section-title  event__section-title--offers'>Offers</h3>

                        <div class='event__available-offers'>
                          <div class='event__offer-selector'>
                            <input class='event__offer-checkbox  visually-hidden' id='event-offer-luggage-1' type='checkbox' name='event-offer-luggage' checked>
                            <label class='event__offer-label' for='event-offer-luggage-1'>
                              <span class='event__offer-title'>Add luggage</span>
                              &plus;
                              &euro;&nbsp;<span class='event__offer-price'>30</span>
                            </label>
                          </div>

                          <div class='event__offer-selector'>
                            <input class='event__offer-checkbox  visually-hidden' id='event-offer-comfort-1' type='checkbox' name='event-offer-comfort' checked>
                            <label class='event__offer-label' for='event-offer-comfort-1'>
                              <span class='event__offer-title'>Switch to comfort class</span>
                              &plus;
                              &euro;&nbsp;<span class='event__offer-price'>100</span>
                            </label>
                          </div>

                          <div class='event__offer-selector'>
                            <input class='event__offer-checkbox  visually-hidden' id='event-offer-meal-1' type='checkbox' name='event-offer-meal'>
                            <label class='event__offer-label' for='event-offer-meal-1'>
                              <span class='event__offer-title'>Add meal</span>
                              &plus;
                              &euro;&nbsp;<span class='event__offer-price'>15</span>
                            </label>
                          </div>

                          <div class='event__offer-selector'>
                            <input class='event__offer-checkbox  visually-hidden' id='event-offer-seats-1' type='checkbox' name='event-offer-seats'>
                            <label class='event__offer-label' for='event-offer-seats-1'>
                              <span class='event__offer-title'>Choose seats</span>
                              &plus;
                              &euro;&nbsp;<span class='event__offer-price'>5</span>
                            </label>
                          </div>

                          <div class='event__offer-selector'>
                            <input class='event__offer-checkbox  visually-hidden' id='event-offer-train-1' type='checkbox' name='event-offer-train'>
                            <label class='event__offer-label' for='event-offer-train-1'>
                              <span class='event__offer-title'>Travel by train</span>
                              &plus;
                              &euro;&nbsp;<span class='event__offer-price'>40</span>
                            </label>
                          </div>
                        </div>
                      </section>
                      <section class='event__section  event__section--destination'>
                        <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
                        <p class='event__destination-description'>${information}</p>

                        <div class='event__photos-container'>
                          <div class='event__photos-tape'>
                            ${createPictureDestination()}
                          </div>
                        </div>
                      </section>
                    </section>
                  </form>`;
};

export default class EditTripEvent extends SmartView {
  constructor(trip = BLANK_TRIP) {
    super();
    this._datepickerStart = null;
    this._datepickerFinish = null;
    this._data = EditTripEvent.parseTripToData(trip);

    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._handleSubmitFormEditEvent = this._handleSubmitFormEditEvent.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startChangeHandler = this._startChangeHandler.bind(this);
    this._finishChangeHandler = this._finishChangeHandler.bind(this);
    this._tripDestinationHandler = this._tripDestinationHandler.bind(this);


    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepickerStart.destroy();
      this._datepickerFinish.destroy();
      this._datepickerStart = null;
      this._datepickerFinish = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `Y-m-d H:i`,
          onChange: this._startChangeHandler
        }
    );
    this._datepickerFinish = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `Y-m-d H:i`,
          onChange: this._finishChangeHandler
        }
    );
  }

  getTemplate() {
    return createEditTripEvent(this._data);
  }

  _handleSubmitFormEditEvent(evt) {
    evt.preventDefault();
    this._callback.submitForm(EditTripEvent.parseDataToTrip(this._data));
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }

  setClickFavoriteStar(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
  }

  setSubmitFormEditEvent(callback) {
    this._callback.submitForm = callback;
    this.getElement().addEventListener(`submit`, this._handleSubmitFormEditEvent);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setSubmitFormEditEvent(this._callback.submitForm);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`input`, this._priceInputHandler);

    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`input`, this._tripDestinationHandler);
  }

  _startChangeHandler([userDate]) {
    this.updateData({
      start: userDate
    });
  }

  _finishChangeHandler([userDate]) {
    this.updateData({
      finish: userDate
    });
  }

  _priceInputHandler(evt) {
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _tripDestinationHandler(evt) {
    this.updateData({
      city: evt.target.value
    }, true);
  }

  reset(trip) {
    this.updateData(
        EditTripEvent.parseTripToData(trip)
    );
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditTripEvent.parseDataToTrip(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseTripToData(trip) {
    return Object.assign(
        {},
        trip,
        {
          isFavoriteFlag: trip.isFavorite,
        }
    );
  }

  static parseDataToTrip(data) {

    data = Object.assign({}, data);

    if (!data.isFavoriteFlag) {
      data.isFavorite = false;
    }

    delete data.isFavoriteFlag;
    return data;
  }
}
