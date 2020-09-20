import he from 'he';
import AbstractView from './abstract.js';
import {toFirstLetterUp} from '../utils/common.js';
import {actionTransport} from '../utils/common.js';
import {logoTrip} from '../view/edit-event.js';


const pointZero = (time) => {
  let pointZeroCheck = ``;
  if (time.getMinutes() < 10) {
    pointZeroCheck = `0`;
  } else {
    pointZeroCheck = ``;
  }
  return pointZeroCheck;
};

const generateOffers = (offer) => {
  if (offer === null) {
    return ``;
  }
  let numberOffer = 0;
  const newOffers = offer.map((object) => {
    numberOffer++;
    if (numberOffer < 4) {
      return `<li class='event__offer'>
            <span class='event__offer-title'>${object.title}</span>
            &plus;
            &euro;&nbsp;<span class='event__offer-price'>${object.price}</span>
    </li>`;
    } else {
      return ``;
    }
  }).join(``);
  return newOffers;
};

const normalDuration = (duration) => {
  const hourDuration = Math.floor(duration / 60);
  const minuteDuration = duration % 60;
  if (hourDuration >= 1) {
    return `${hourDuration}H ${minuteDuration}M`;
  } else {
    return `${minuteDuration}M`;
  }
};

export const createTripEvent = (trip) => {
  const {destination, start, finish, price, offers, duration, transport} = trip;

  return (
    `<li class='trip-events__item'>
        <div class='event'>
          <div class='event__type'>
            <img class='event__type-icon' width='42' height='42' src=${logoTrip(trip)} alt='Event type icon'>
          </div> 
          <h3 class='event__title'>${toFirstLetterUp(transport)} ${actionTransport(transport)} ${he.encode(destination.name)}</h3>

          <div class='event__schedule'>
            <p class='event__time'>
              <time class='event__start-time' datetime='${start}'>${start.getHours()}:${pointZero(start)}${start.getMinutes()}</time>
              &mdash;
              <time class='event__end-time' datetime='${finish}'>${finish.getHours()}:${pointZero(finish)}${finish.getMinutes()}</time>
            </p>
            <p class='event__duration'>${normalDuration(duration)}</p>
          </div>

          <p class='event__price'>
            &euro;&nbsp;<span class='event__price-value'>${price}</span>
          </p>

          <h4 class='visually-hidden'>Offers:</h4>
          <ul class='event__selected-offers'>
            ${generateOffers(offers)}
          </ul>

          <button class='event__rollup-btn' type='button'>
            <span class='visually-hidden'>Open event</span>
          </button>
        </div>
      </li>`
  );
};

export default class TripEvent extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;
    this._clickCardArrow = this._clickCardArrow.bind(this);
  }

  getTemplate() {
    return createTripEvent(this._trip);
  }

  _clickCardArrow(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickCardArrow(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickCardArrow);
  }
}
