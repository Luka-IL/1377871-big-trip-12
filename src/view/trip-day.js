import {createElement} from "../utils";

let dayCounter = 0;

const createTripDay = (trip) => {
  const startMonth = trip.start.toLocaleString(`en-US`, {month: `long`});
  const startDay = trip.start.getDate();
  dayCounter++;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${trip.start}">${startDay} ${startMonth}</time>
      </div>
    </li>`
  );
};

export default class TripDay {
  constructor(trip) {
    this._element = null;
    this._trip = trip;
  }

  getTemplate() {
    return createTripDay(this._trip);
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
