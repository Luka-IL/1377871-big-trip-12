import AbstractView from "./abstract.js";

const createNoTripTemplate = () => {
  return `<p class="board__no-tasks">
    Loading...
  </p>`;
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoTripTemplate();
  }
}
