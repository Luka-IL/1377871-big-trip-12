import TripEvent from '../view/trip-event.js';
import EditEvent from '../view/edit-event.js';
import {RenderPosition, replace, render, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";


const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`};


export default class Trip {
  constructor(tripListElement, changeData, changeMode) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleClickCardArrow = this._handleClickCardArrow.bind(this);
    this._handleSubmitFormEditEvent = this._handleSubmitFormEditEvent.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevTripComponent = this._tripComponent;
    const prevtripAddComponent = this._tripEditComponent;

    this._tripComponent = new TripEvent(trip);
    this._tripEditComponent = new EditEvent(trip);

    this._tripComponent.setClickCardArrow(this._handleClickCardArrow);
    this._tripEditComponent.setSubmitFormEditEvent(this._handleSubmitFormEditEvent);
    this._tripEditComponent.setClickFavoriteStar(this._handleFavoriteClick);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevTripComponent === null || prevtripAddComponent === null) {
      render(this._tripListElement, this._tripComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripComponent, prevTripComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEditComponent, prevtripAddComponent);
    }

    remove(prevtripAddComponent);
    remove(prevTripComponent);
  }

  destroy() {
    remove(this._tripComponent);
    remove(this._tripEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    switch (state) {
      case State.SAVING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripComponent.shake(resetFormState);
        this._tripEditComponent.shake(resetFormState);
        break;
    }
  }

  _handleClickCardArrow() {
    this._replaceCardToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleSubmitFormEditEvent(trip) {
    this._changeData(
        UserAction.UPDATE_TRIP,
        UpdateType.MAJOR,
        trip
    );
  }

  _handleDeleteClick(trip) {
    this._changeData(
        UserAction.DELETE_TRIP,
        UpdateType.MAJOR,
        trip
    );
  }

  _replaceCardToForm() {
    replace(this._tripEditComponent, this._tripComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripComponent, this._tripEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;

  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEditComponent.reset(this._trip);
      this._replaceFormToCard();
    }
  }
}
