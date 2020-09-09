import AbstractView from "./abstract.js";

const createTripDay = (trip, dayCounter) => {
  const startMonth = (trip !== undefined) ? trip.start.toLocaleString(`en-US`, {month: `long`}) : ``;
  const startDay = (trip !== undefined) ? trip.start.getDate() : ``;
  const tripStart = (trip !== undefined) ? trip.start : ``;
  if (trip === undefined) {
    dayCounter = ``;
  }

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${tripStart}">${startDay} ${startMonth}</time>
      </div>
    </li>`
  );
};

export default class TripDay extends AbstractView {
  constructor(trip, dayCounter) {
    super();
    this._trip = trip;
    this._dayCounter = dayCounter;
  }

  getTemplate() {
    return createTripDay(this._trip, this._dayCounter);
  }
}
