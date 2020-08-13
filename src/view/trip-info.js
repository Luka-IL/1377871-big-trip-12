import {trips, TRIP_COUNT} from '../mock/array-trips.js';

const priceAllTrips = () => {
  let priceTrips = 0;
  for (let i = 0; i < TRIP_COUNT; i++) {
    priceTrips += trips[i].price;
  }
  return priceTrips;
};

const allVisitCities = () => {
  const cityName = trips.map((town) => town.city);
  let cityBefore = ``;
  let massCities = [];
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

export const createTripInfo = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${allVisitCities()}</h1>

          <p class="trip-info__dates">${trips[0].start.toLocaleString(`en-US`, {month: `long`})}npm  ${trips[0].start.getDate()}&nbsp;&mdash;&nbsp;${trips[trips.length - 1].finish.getDate()}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceAllTrips()}</span>
        </p>
      </section>`
  );
};
