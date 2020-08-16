import {trips} from '../mock/array-trips.js';
import {createElement} from "../utils";


let dayCounter = 0;
const startMonth = trips[0].start.toLocaleString(`en-US`, {month: `long`});
let startDay = trips[0].start.getDate();

const createTripDay = () => {
  dayCounter++;
  startDay++;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${trips[1].start}">${startDay - 1} ${startMonth}</time>
      </div>
    </li>`
  );
};

export default class TripListDays {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDay();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
