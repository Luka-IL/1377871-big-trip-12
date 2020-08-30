import TripEvent from '../view/trip-event.js';
import AddTripEvent from '../view/add-event.js';
import EditTripEvent from '../view/edit-event.js';

import {RenderPosition, replace, render, remove} from "../utils/render.js";


export default class Trip {
  constructor(tripListElement, changeData) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;

    this._tripComponent = null;
    this._tripEditComponent = null;

    this._handleClickCardArrow = this._handleClickCardArrow.bind(this);
    this._handleSubmitFormEvent = this._handleSubmitFormEvent.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevTripComponent = this._tripComponent;
    const prevtripAddComponent = this._tripEditComponent;

    this._tripComponent = new TripEvent(trip);
    this._tripEditComponent = new EditTripEvent(trip);

    this._tripComponent.setClickCardArrow(this._handleClickCardArrow);
    this._tripEditComponent.setSubmitFormEditEvent(this._handleSubmitFormEvent);
    this._tripEditComponent.setClickFavoriteStar(this._handleFavoriteClick);

    if (prevTripComponent === null || prevtripAddComponent === null) {
      render(this._tripListElement, this._tripComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._tripListElement.getElement().contains(prevTripComponent.getElement())) {
      replace(this._tripComponent, prevTripComponent);
    }

    if (this._tripListElement.getElement().contains(prevtripAddComponent.getElement())) {
      replace(this._tripEditComponent, prevtripAddComponent);
    }

    remove(prevtripAddComponent);
    remove(prevTripComponent);
  }

  destroy() {
    remove(this._tripComponent);
    remove(this._tripEditComponent);
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
    replace(this._tripEditComponent, this._tripComponent);
  }

  _replaceFormToCard() {
    replace(this._tripComponent, this._tripEditComponent);
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._trip,
            {
              isFavorite: !this._trip.isFavorite
            }
        )
    );
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
