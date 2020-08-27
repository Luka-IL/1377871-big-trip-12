import TripListDays from '../view/list-days.js';
import TripDay from '../view/trip-day.js';
import TripEvent from '../view/trip-event.js';
import AddTripEvent from '../view/add-event.js';
import TripEventsList from '../view/trip-events-list.js';
import WithoutTripEvent from '../view/without-trip.js';
import SortTripEvent from '../view/sort-events.js';
import {trips, TRIP_COUNT} from '../mock/array-trips.js';
import {sortPrice, sortEvent, sortTime} from "../utils/trip.js";
import {RenderPosition, replace, render} from "../utils/render.js";
import {SortType} from '../const.js';

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._sortComponent = new SortTripEvent();
    this._tripListDays = new TripListDays();
    this._withoutTripEvent = new WithoutTripEvent();
    this._numberTrip = 0;
    this._currentSortType = `time`;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init() {
    this._trips = trips.slice();
    this._renderSort();
    if (TRIP_COUNT > 0) {
      this._createNewListDay();
    } else {
      render(this._boardContainer, new WithoutTripEvent(), RenderPosition.BEFOREEND);
    }
  }

  _sortTrips(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._trips.sort(sortPrice);
        break;
      case SortType.EVENT:
        this._trips.sort(sortEvent);
        break;
      case SortType.TIME:
        this._trips.sort(sortTime);
        break;
    }

    this._currentSortType = sortType;
  }

  _clearEventList() {
    this._tripListDays.getElement().innerHTML = ``;
    this._tripEventsList.getElement().innerHTML = ``;
  }

  _createNewSortTrips() {
    this._tripDaySort = new TripDay();
    render(this._tripListDays, this._tripDaySort, RenderPosition.BEFOREEND);
    render(this._tripDaySort, this._tripEventsList, RenderPosition.BEFOREEND);

    for (let i = 0; i < this._trips.length; i++) {
      this._renderTripEvent(this._tripEventsList, this._trips[i]);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    } else {
      this._sortTrips(sortType);
      this._clearEventList();
      if (sortType === `time`) {
        this._numberTrip = 0;
        this._createNewDay();
      } else {
        this._createNewSortTrips();
      }
    }
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setInputSortListener(this._handleSortTypeChange);
  }

  _renderTripEvent(tripListElement, trip) {
    const tripComponent = new TripEvent(trip);
    const tripAddComponent = new AddTripEvent(trip);

    const replaceCardToForm = () => {
      replace(tripAddComponent, tripComponent);
    };

    const replaceFormToCard = () => {
      replace(tripComponent, tripAddComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripComponent.setClickCardArrow(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);

    });

    tripAddComponent.setSubmitFormEvent(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);

    });


    render(tripListElement, tripComponent, RenderPosition.BEFOREEND);
  }

  _createNewListDay() {
    render(this._boardContainer, this._tripListDays, RenderPosition.BEFOREEND);

    this._createNewDay();
  }

  _createNewDay() {
    const EventsDay = new TripDay(trips[this._numberTrip]).getElement();
    this._tripEventsList = new TripEventsList();


    render(this._tripListDays, EventsDay, RenderPosition.BEFOREEND);
    render(EventsDay, this._tripEventsList, RenderPosition.BEFOREEND);

    this._createNewTrips();
  }

  _createNewTrips() {
    let dataTripNow = trips[this._numberTrip].start.getDate();
    for (this._numberTrip; this._numberTrip < TRIP_COUNT; this._numberTrip++) {
      if (dataTripNow === trips[this._numberTrip].start.getDate()) {
        this._renderTripEvent(this._tripEventsList, trips[this._numberTrip]);
      } else if (trips.length > this._numberTrip) {
        this._createNewDay();
        this._numberTrip++;
      } else {
        break;
      }
    }
  }
}
