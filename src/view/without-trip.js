import AbstractView from "./abstract.js";


const createWithoutTripEvent = () => {
  return `<section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
          <p class="trip-events__msg">Click New Event to create your first point</p>
        </section>`;
};
export default class WithoutTripEvent extends AbstractView {
  getTemplate() {
    return createWithoutTripEvent();
  }
}

