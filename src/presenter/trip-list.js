import TripListDays from '../view/list-days.js';
import TripDay from '../view/trip-day.js';
import TripEventsList from '../view/trip-events-list.js';
import WithoutTripEvent from '../view/without-trip.js';
import SortTripEvent from '../view/sort-events.js';
import Trip from './trip.js';
import {trips, TRIP_COUNT} from '../mock/array-trips.js';
import {sortPrice, sortEvent, sortTime} from "../utils/trip.js";
import {RenderPosition, render, remove} from "../utils/render.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class TripList {
  constructor(boardContainer, tripsModel) {
    this._boardContainer = boardContainer;
    this._tripsModel = tripsModel;

    this._sortComponent = null;
    this._tripListDays = null;
    this._withoutTripEvent = new WithoutTripEvent();
    this._numberTrip = 0;
    this._currentSortType = `time`;
    this._eventPresenter = {};

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripsModel.addObserver(this._handleModelEvent);

  }

  init() {
    this._renderBoard();
  }

  _getTrips() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._tripsModel.getTrips().slice().sort(sortTime);
      case SortType.EVENT:
        return this._tripsModel.getTrips().slice().sort(sortEvent);
      case SortType.PRICE:
        return this._tripsModel.getTrips().slice().sort(sortPrice);
    }
    return this._tripsModel.getTrips();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this._tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this._tripsModel.deleteTrip(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearB();
        this._renderBoard({resetSortType: true});
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _createNewSortTrips() {
    this._renderSort();
    this._tripDaySort = new TripDay();
    this._tripListDays = new TripListDays();

    render(this._boardContainer, this._tripListDays, RenderPosition.BEFOREEND);
    render(this._tripListDays, this._tripDaySort, RenderPosition.BEFOREEND);
    render(this._tripDaySort, this._tripEventsList, RenderPosition.BEFOREEND);

    for (let i = 0; i < this._getTrips().length; i++) {
      this._renderTripEvent(this._tripEventsList, this._getTrips()[i]);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    } else {
      this._currentSortType = sortType;
      this._clearBoard();
      if (sortType === `time`) {
        this._renderBoard();
      } else {
        this._createNewSortTrips();
      }
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortTripEvent(this._currentSortType);
    this._sortComponent.setInputSortListener(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripEvent(tripListElement, trip) {
    const tripEvent = new Trip(tripListElement, this._handleViewAction, this._handleModeChange);
    tripEvent.init(trip);
    this._eventPresenter[trip.id] = tripEvent;
  }

  _renderBoard() {
    this._renderSort();
    if (TRIP_COUNT > 0) {
      this._createNewListDay();
    } else {
      render(this._boardContainer, new WithoutTripEvent(), RenderPosition.BEFOREEND);
    }
  }

  _createNewListDay() {
    this._tripListDays = new TripListDays();
    render(this._boardContainer, this._tripListDays, RenderPosition.BEFOREEND);
    this._createNewDay();
  }

  _createNewDay() {
    const EventsDay = new TripDay(this._getTrips()[this._numberTrip]).getElement();
    this._tripEventsList = new TripEventsList();


    render(this._tripListDays, EventsDay, RenderPosition.BEFOREEND);
    render(EventsDay, this._tripEventsList, RenderPosition.BEFOREEND);

    this._createNewTrips();
  }

  _createNewTrips() {
    let dataTripNow = this._getTrips()[this._numberTrip].start.getDate();
    for (this._numberTrip; this._numberTrip < TRIP_COUNT; this._numberTrip++) {
      if (dataTripNow === this._getTrips()[this._numberTrip].start.getDate()) {
        this._renderTripEvent(this._tripEventsList, this._getTrips()[this._numberTrip]);
      } else if (this._getTrips().length > this._numberTrip) {
        this._createNewDay();
        this._numberTrip++;
      } else {
        break;
      }
    }
  }

  _clearBoard({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._tripListDays);
    remove(this._sortComponent);
    remove(this._withoutTripEvent);
    this._numberTrip = 0;

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
