import TripEvent from '../view/trip-event.js';
import AddTripEvent from '../view/add-event.js';
import {RenderPosition, replace, render, remove} from "../utils/render.js";


export default class Trip {
  constructor(tripListElement) {
    this._tripListElement = tripListElement;

    this._tripComponent = null;
    this._tripAddComponent = null;

    this._handleClickCardArrow = this._handleClickCardArrow.bind(this);
    this._handleSubmitFormEvent = this._handleSubmitFormEvent.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevTripComponent = this._tripComponent;
    const prevtripAddComponent = this._tripAddComponent;

    this._tripComponent = new TripEvent(trip);
    this._tripAddComponent = new AddTripEvent(trip);

    this._tripComponent.setClickCardArrow(this._handleClickCardArrow);

    this._tripAddComponent.setSubmitFormEvent(this._handleSubmitFormEvent);

    if (prevTripComponent === null || prevtripAddComponent === null) {
      render(this._tripListElement, this._tripComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._tripListElement.getElement().contains(prevTripComponent.getElement())) {
      replace(this._tripComponent, prevTripComponent);
    }

    if (this._tripListElement.getElement().contains(prevtripAddComponent.getElement())) {
      replace(this._tripAddComponent, prevtripAddComponent);
    }

    remove(prevtripAddComponent);
    remove(prevTripComponent);
  }

  _destroy() {
    remove(this._tripComponent);
    remove(this._tripAddComponent);
  }

  _handleClickCardArrow() {
    this._replaceCardToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleSubmitFormEvent() {
    this._replaceFormToCard();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceCardToForm() {
    replace(this._tripAddComponent, this._tripComponent);
  }

  _replaceFormToCard() {
    replace(this._tripComponent, this._tripAddComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
