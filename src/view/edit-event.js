import moment from 'moment';

import SmartView from './smart.js';
import {waypoints, offersTrip, destinationsTrip} from '../const.js';
import {toFirstLetterUp} from '../utils/common.js';
import flatpickr from 'flatpickr';
import {actionTransport} from '../utils/common.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_TRIP = {
  destination: {
    name: ``,
    description: ``,
    pictures: []
  },
  duration: 0,
  finish: ``,
  isFavorite: false,
  isFavoriteFlag: false,
  logo: `./img/icons/taxi.png`,
  offers: [],
  price: 0,
  start: ``,
  transport: `taxi`
};


const toTransport = waypoints.filter((way) => way.action === `to`);
const inTransport = waypoints.filter((way) => way.action === `in`);

const humansDateStartDay = (start) => {
  return moment(start).format('D MM Y, h:mm:ss');
};

const humansDateFinish = (finish) => {
  return moment(finish).format('D MM Y, h:mm:ss');
};

const generateCities = () => {
  return destinationsTrip.map((city) => `<option class='event__destination-input' value=${city.name}></option>`
  );
};

const createPictureDestination = (pictures) => {
  const trips = pictures.map((item) => `<img class='event__pho to' src='${item.src}' alt='Event photo'>`);
  return trips;
};

const createOffersTransport = (transport, offers) => {
  const typeTransport = offersTrip.filter((item) => item.type === transport)[0];
  let numIdInput = 0;
  if (typeTransport !== undefined) {
    return typeTransport.offers.map((item) => {
      numIdInput += 1;
      return `<div class='event__offer-selector'>
  <input class='event__offer-checkbox  visually-hidden' id='${transport}-${numIdInput}' value='${item.title}' type='checkbox' name='${transport}' ${(offers.find((offer) => offer.title === item.title)) ? `checked` : ``}>
  <label class='event__offer-label' for='${transport}-${numIdInput}'>
    <span class='event__offer-title'>${item.title}</span>
    &plus;
    &euro;&nbsp;<span class='event__offer-price'>${item.price}</span>
  </label>
</div>`;
    }).join(``);
  } else {
    return ``;
  }

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
  const {transport, logo, destination, price, isFavoriteFlag, offers, isSaving, isDeleting, isDisabled, start, finish} = data;
  console.log(offers)
  return `<form class='event  event--edit' action='#' method='post'>
                    <header class='event__header'>
                      <div class='event__type-wrapper'>
                        <label class='event__type  event__type-btn' for='event-type-toggle-1'>
                          <span class='visually-hidden'>Choose event type</span>
                          <img class='event__type-icon' width='17' height='17' src='${logo}' alt='Event type icon'>
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
                          ${toFirstLetterUp(transport)} ${actionTransport(transport)}
                        </label>
                        <input class='event__input  event__input--destination' id='event-destination-1' type='text' name='event-destination' value='${destination.name}' list='destination-list-1'>
                        <datalist id='destination-list-1'>
                          ${generateCities()}
                        </datalist>
                      </div>

                      <div class='event__field-group  event__field-group--time'>
                        <label class='visually-hidden' for='event-start-time-1'>
                          From
                        </label>
                        <input class='event__input  event__input--time' id='event-start-time-1' type='text' name='event-start-time' value='${humansDateStartDay(start)}'>
                        &mdash;
                        <label class='visually-hidden' for='event-end-time-1'>
                          To
                        </label>
                        <input class='event__input  event__input--time' id='event-end-time-1' type='text' name='event-end-time' value='${humansDateFinish(finish)}'>
                      </div>

                      <div class='event__field-group  event__field-group--price'>
                        <label class='event__label' for='event-price-1'>
                          <span class='visually-hidden'>Price</span>
                          &euro;
                        </label>
                        <input class='event__input  event__input--price' id='event-price-1' type='text' name='event-price' value='${price}'>
                      </div>
                      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>
                      ${isSaving ? `saving...` : `save`}
                      </button>                      
                      <button class="event__reset-btn" type="button" ${isDisabled ? `disabled` : ``}>
                        ${isDeleting ? `deleting...` : `delete`}
                      </button>
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
                        <h3 class='event__section-title  event__section-title--offers'>${(offers.length > 0) ? `Offers` : ``}</h3>

                        <div class='event__available-offers'>
                          ${createOffersTransport(transport, offers)}
                        </div>
                      </section>
                      <section class='event__section  event__section--destination'>
                        <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
                        <p class='event__destination-description'>${destination.description}</p>

                        <div class='event__photos-container'>
                          <div class='event__photos-tape'>
                            ${createPictureDestination(destination.pictures)}
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
    this._offers = trip.offers;

    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._handleSubmitFormEditEvent = this._handleSubmitFormEditEvent.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._offerClickHandler = this._offerClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startChangeHandler = this._startChangeHandler.bind(this);
    this._finishChangeHandler = this._finishChangeHandler.bind(this);
    this._tripDestinationHandler = this._tripDestinationHandler.bind(this);
    this._changeTransportClickHandler = this._changeTransportClickHandler.bind(this);

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
          dateFormat: `d/m/Y H:i`,
          onChange: this._startChangeHandler
        }
    );
    this._datepickerFinish = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
          onChange: this._finishChangeHandler
        }
    );
  }

  getTemplate() {
    return createEditTripEvent(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setSubmitFormEditEvent(this._callback.submitForm);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _handleSubmitFormEditEvent(evt) {
    evt.preventDefault();
    this._callback.submitForm(EditTripEvent.parseDataToTrip(this._data));
  }

  setClickFavoriteStar(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
  }

  setSubmitFormEditEvent(callback) {
    this._callback.submitForm = callback;
    this.getElement().addEventListener(`submit`, this._handleSubmitFormEditEvent);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`input`, this._priceInputHandler);

    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`change`, this._tripDestinationHandler);

    const inputsTransport = this.getElement().querySelectorAll(`.event__type-input`);
    inputsTransport.forEach((item) => item.addEventListener(`change`, this._changeTransportClickHandler));

    this.getElement()
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, this._favoriteClickHandler);

    const offersButtons = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    if (offersButtons.length > 0) {
      offersButtons.forEach((item) => item.addEventListener(`change`, this._offerClickHandler));
    } else {
      return;
    }
  }

  _startChangeHandler([userDate]) {
    this.updateData({
      start: userDate
    });
  }

  _finishChangeHandler([userDate]) {
    if (this._data.start < userDate) {
      this.updateData({
        finish: userDate
      });
    } else {
      this.shake();
    }
  }

  _priceInputHandler(evt) {
    this.updateData({
      price: Number(evt.target.value)
    }, true);
  }

  _tripDestinationHandler(evt) {
    const actualDestination = destinationsTrip.filter((item) => (item.name === evt.target.value))[0];
    if (actualDestination) {
      this.updateData({
        destination: actualDestination,
      });
    } else {
      this.shake();
    }
  }

  _favoriteClickHandler() {
    this.updateData({
      isFavorite: !this._data.isFavorite,
      isFavoriteFlag: !this._data.isFavoriteFlag
    }, true);
  }

  _changeTransportClickHandler(evt) {
    this._offers = [];
    this.updateData({
      transport: evt.target.value
    });
  }

  _offerClickHandler(evt) {
    evt.preventDefault();
    let activateOffer = this._offers.filter((item) => item.title === evt.target.value);
    if (activateOffer.length > 0) {
      this._offers = this._offers.filter((item) => item.title !== activateOffer[0].title);
    } else {
      const activateTransport = offersTrip.filter((item) => item.type === this._data.transport);
      activateOffer = activateTransport[0].offers.filter((item) => item.title === evt.target.value);
      this._offers.push(activateOffer[0]);
    }
    const newOffers = this._offers;

    this.updateData({
      offers: newOffers
    });
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditTripEvent.parseDataToTrip(this._data));
  }

  reset(trip) {
    this.updateData(
        EditTripEvent.parseTripToData(trip)
    );
  }

  static parseTripToData(trip) {
    return Object.assign(
        {},
        trip,
        {
          isFavoriteFlag: trip.isFavorite,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToTrip(data) {

    data = Object.assign({}, data);
    delete data.isFavoriteFlag;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return data;
  }
}
