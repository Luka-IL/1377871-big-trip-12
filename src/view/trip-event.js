export const createTripEvent = (trip) => {
  const {transport, city, start, finish, price, offers, duration, destination} = trip;

  const generateOffers = (offer) => {
    const newOffers = offer.map(([, object]) =>
      `<li class="event__offer">
              <span class="event__offer-title">${object.name}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${object.price}</span>
           </li>`
    ).join(``);
    return newOffers;
  };

  const normalDuration = () => {
    const hourDuration = Math.floor(duration / 60);
    const minuteDuration = duration % 60;
    if (hourDuration >= 1) {
      return `${hourDuration}H ${minuteDuration}M`;
    } else {
      return `${minuteDuration}M`;
    }
  };

  const pointZero = (time) => {
    let pointZeroCheck = ``;
    if (time.getMinutes() < 10) {
      pointZeroCheck = `0`;
    } else {
      pointZeroCheck = ``;
    }
    return pointZeroCheck;
  };

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src=${destination.picture} alt="Event type icon">
          </div>
          <h3 class="event__title">${transport.name} ${transport.action} ${city}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${start}">${start.getHours()}:${pointZero(start)}${start.getMinutes()}</time>
              &mdash;
              <time class="event__end-time" datetime="${finish}">${finish.getHours()}:${pointZero(finish)}${finish.getMinutes()}</time>
            </p>
            <p class="event__duration">${normalDuration()}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${generateOffers(offers)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};
