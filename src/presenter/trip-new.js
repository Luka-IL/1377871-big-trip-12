import EditEvent from "../view/edit-event.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class TripNew {
  constructor(tripListContainer, changeData) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;

    this._destroyCallback = null;
    this._tripEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClickFavorite = this._handleClickFavorite.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._tripEditComponent !== null) {
      return;
    }

    this._tripEditComponent = new EditEvent();
    this._tripEditComponent.setSubmitFormEditEvent(this._handleFormSubmit);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._tripEditComponent.setClickFavoriteStar(this._handleClickFavorite);
    render(this._tripListContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }
    if (this._destroyCallback !== null) {
      this._destroyCallback(`TABLE`);
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._tripEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this._tripEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(trip) {
    if (trip.destination.name !== ``) {
      this._changeData(
          UserAction.ADD_TRIP,
          UpdateType.MINOR,
          trip
      );
      this.destroy();
    } else {
      this.setAborting();
    }
  }

  _handleClickFavorite(trip) {
    this._tripEditComponent.updateData(
        trip, true);
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
