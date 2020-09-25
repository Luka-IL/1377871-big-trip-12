import {waypoints, cities} from '../const.js';
import AbstractView from "./abstract.js";
import {toFirstLetterUp} from '../utils/common.js';

const toTransport = waypoints.filter((way) => way.action === `to`);
const inTransport = waypoints.filter((way) => way.action === `in`);

const humansDateStart = (trip) => {
  return trip.start.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `2-digit`});
};
const humansDateFinish = (trip) => {
  return trip.finish.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `2-digit`});
};

const generateToTransport = () => {
  return toTransport.map((way) =>
    `<div class="event__type-item">
    <input id="event-type-${way.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${way.name}">
    <label class="event__type-label  event__type-label--${way.name}" for="event-type-${way.name}-1">${toFirstLetterUp(way.name)}</label>
  </div>`
  ).join(``);
};

const generateInTransport = () => {
  return inTransport.map((way) =>
    `<div class="event__type-item">
    <input id="event-type-${way.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${way.name}">
    <label class="event__type-label  event__type-label--${way.name}" for="event-type-${way.name}-1">${toFirstLetterUp(way.name)}</label>
  </div>`
  ).join(``);
};

const generateCities = () => {
  return cities.map((city) => `<option value=${city}></option>`
  );
};

const createPictureDestination = (pictures) => pictures.map((item) => `<img class='event__pho to' src='${item.src}' alt='Event photo'>`);


const createAddEvent = (trip) => {
  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="${trip.transport.picture}" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${generateToTransport()}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${generateInTransport()}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${toFirstLetterUp(trip.transport.name)} ${trip.transport.action}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                <datalist id="destination-list-1">
                ${generateCities()}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humansDateStart(trip)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humansDateFinish(trip)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${trip.price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                    <label class="event__offer-label" for="event-offer-luggage-1">
                      <span class="event__offer-title">Add luggage</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">30</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                    <label class="event__offer-label" for="event-offer-comfort-1">
                      <span class="event__offer-title">Switch to comfort class</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">100</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                    <label class="event__offer-label" for="event-offer-meal-1">
                      <span class="event__offer-title">Add meal</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">15</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                    <label class="event__offer-label" for="event-offer-seats-1">
                      <span class="event__offer-title">Choose seats</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">5</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                    <label class="event__offer-label" for="event-offer-train-1">
                      <span class="event__offer-title">Travel by train</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">40</span>
                    </label>
                  </div>
                </div>
              </section>
              <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${trip.destination.information}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                ${createPictureDestination(trip.destination.pictures)}
                </div>
              </div>
            </section>
            </section>
          </form>`;
};

export default class AddEvent extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createAddEvent(this._trip);
  }
}
