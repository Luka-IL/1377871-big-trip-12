import AbstractView from "./abstract.js";
import {sortEvent} from "../utils/trip.js";


const priceAllTrips = (trips) => {
  let priceTrips = 0;
  trips.forEach((item) => (priceTrips += item.fullPrice));
  return priceTrips;
};

const getAllVisitCities = (trips) => {
  trips.sort(sortEvent);
  const cityName = trips.map((trip) => trip.destination.name);
  let cityBefore = ``;
  const massCities = [];
  for (let i = 0; i < cityName.length; i++) {
    if (cityName[i] !== cityBefore) {
      massCities.push(cityName[i]);
      cityBefore = cityName[i];
    }
  }
  if (massCities.length <= 3) {
    return massCities.map((point) => `${point}`).join(` &mdash; `);
  } else {
    return `${massCities[0]} &mdash; ... &mdash; ${massCities[massCities.length - 1]}`;
  }
};

const getAllTripDates = (trips) => {
  trips.sort(sortEvent);
  if (trips.length > 0) {
    return `${trips[0].start.toLocaleString(`en-US`, {month: `long`})}  ${trips[0].start.getDate()}&nbsp;&mdash;&nbsp;${trips[trips.length - 1].finish.toLocaleString(`en-US`, {month: `long`})} ${trips[trips.length - 1].finish.getDate()}`;
  } else {
    return ``;
  }
};

const createTripInfo = (trips) => {
  return `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${getAllVisitCities(trips)}</h1>

          <p class="trip-info__dates">${getAllTripDates(trips)}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceAllTrips(trips)}</span>
        </p>
      </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(trips) {
    super();
    this._trips = trips;
  }
  getTemplate() {
    return createTripInfo(this._trips);
  }
}

