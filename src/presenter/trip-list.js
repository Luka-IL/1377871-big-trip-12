/* eslint-disable indent */
import TripListDays from '../view/list-days.js';
import TripDay from '../view/trip-day.js';
import TripEventsList from '../view/trip-events-list.js';
import WithoutTripEvent from '../view/without-trip.js';
import SortTripEvent from '../view/sort-events.js';
import Trip, {State as TripPresenterViewState} from './trip.js';
import TripNewPresenter from "./trip-new.js";
import LoadingView from "../view/loading.js";
import {filter} from "../utils/filter.js";
import {sortPrice, sortEvent, sortTime} from "../utils/trip.js";
import {RenderPosition, render, remove} from "../utils/render.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class TripList {
  constructor(boardContainer, tripsModel, filterModel, api) {
    this._boardContainer = boardContainer;
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._isLoading = true;
    this._sortComponent = null;
    this._tripListDays = null;
    this._tripNewPresenter = null;
    this._callback = {};
    this._withoutTripEvent = new WithoutTripEvent();
    this._dayCounter = 1;
    this._numberTrip = 0;
    this._currentSortType = `time`;
    this._eventPresenter = {};

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._loadingComponent = new LoadingView();

  }

  init() {
    this._renderBoard();
    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  createTrip(callback) {
    this._tripNewPresenter.init(callback);
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    this._tripsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  setRefreshPrice(callback) {
    console.log(callback)
    this._callback.refreshPrice = callback;
  }

  _getTrips() {
    const filterType = this._filterModel.getFilter();
    const trips = this._tripsModel.getTrips();
    const filtredTrips = filter[filterType](trips);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredTrips.sort(sortTime);
      case SortType.EVENT:
        return filtredTrips.sort(sortEvent);
      case SortType.PRICE:
        return filtredTrips.sort(sortPrice);
    }
    return filtredTrips;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._eventPresenter[update.id].setViewState(TripPresenterViewState.SAVING);
        this._api.updateTrip(update).then((response) => {
          this._tripsModel.updateTrip(updateType, response);
        });/*
        .catch(() => {
          this._eventPresenter[update.id].setViewState(TripPresenterViewState.ABORTING);
        });*/
        break;
      case UserAction.ADD_TRIP:
        this._tripNewPresenter.setSaving();
        this._api.addTrip(update).then((response) => {
          this._tripsModel.addTrip(updateType, response);
        })
        .catch(() => {
          this._tripNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_TRIP:
        this._eventPresenter[update.id].setViewState(TripPresenterViewState.DELETING);
        this._api.deleteTrip(update).then(() => {
          this._tripsModel.deleteTrip(updateType, update);
        })
        .catch(() => {
          this._eventPresenter[update.id].setViewState(TripPresenterViewState.ABORTING);
        });
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
        this._callback.refreshPrice(this._tripsModel.getTrips());
        break;
      case UpdateType.MAJOR:
        this._clearBoard();
        this._renderBoard({resetSortType: true});
        this._callback.refreshPrice(this._tripsModel.getTrips());
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._tripNewPresenter.destroy();

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    this._renderSort();
    if (this._tripsModel.getTrips().length > 0) {
      this._createNewListDay();

    } else {
      render(this._boardContainer, new WithoutTripEvent(), RenderPosition.BEFOREEND);
    }
  }

  _createNewListDay() {
    this._tripListDays = new TripListDays();
    this._tripNewPresenter = new TripNewPresenter(this._tripListDays, this._handleViewAction);

    render(this._boardContainer, this._tripListDays, RenderPosition.BEFOREEND);
    this._createNewDay();
  }

  _createNewDay() {
    const EventsDay = new TripDay(this._getTrips()[this._numberTrip], this._dayCounter).getElement();
    this._dayCounter++;

    this._tripEventsList = new TripEventsList();


    render(this._tripListDays, EventsDay, RenderPosition.BEFOREEND);
    render(EventsDay, this._tripEventsList, RenderPosition.BEFOREEND);

    this._createNewTrips();
  }

  _createNewTrips() {
    let dataTripNow = this._getTrips()[this._numberTrip].start.getDate();
    for (this._numberTrip; this._numberTrip < this._getTrips().length; this._numberTrip++) {
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
    this._tripNewPresenter.destroy();

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._tripListDays);
    remove(this._sortComponent);
    remove(this._withoutTripEvent);
    remove(this._loadingComponent);

    this._numberTrip = 0;
    this._dayCounter = 1;

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
