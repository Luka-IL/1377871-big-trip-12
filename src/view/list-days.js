import AbstractView from "./abstract.js";

export const createListDays = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};
export default class ListDays extends AbstractView {
  getTemplate() {
    return createListDays();
  }
}
