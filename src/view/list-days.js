import AbstractView from "./abstract.js";

export const createTripListDays = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};
export default class TripListDays extends AbstractView {
  getTemplate() {
    return createTripListDays();
  }
}
