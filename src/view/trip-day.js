import {trips} from '../mock/array-trips.js';

let dayCounter = 0;
const startMonth = trips[0].start.toLocaleString(`en-US`, {month: `long`});
let startDay = trips[0].start.getDate();

export const createTripDay = () => {
  dayCounter++;
  startDay++;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${trips[1].start}">${startDay - 1} ${startMonth}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
