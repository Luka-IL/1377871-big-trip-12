import AbstractView from "./abstract.js";


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

export default class TripDay extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createTripDay(this._trip);
  }
}
