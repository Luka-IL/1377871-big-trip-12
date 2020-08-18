import TripListDays from '../view/list-days.js';
import TripDay from '../view/trip-day.js';
import TripEvent from '../view/trip-event.js';
import AddTripEvent from '../view/add-event.js';
import TripEventsList from '../view/trip-events-list.js';
import WithoutTripEvent from '../view/without-trip.js';
import {trips, TRIP_COUNT} from '../mock/array-trips.js';
import {RenderPosition, replace, render} from "../utils/render.js";

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this.tripListDays = new TripListDays();
    this._withoutTripEvent = new WithoutTripEvent();
    this._numberTrip = 0;
  }

  init() {
    if (TRIP_COUNT > 0) {
      this._createNewDay();
    } else {
      render(this._boardContainer, new WithoutTripEvent(), RenderPosition.BEFOREEND);
    }
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

  _createNewDay() {
    const EventsDay = new TripDay(trips[this._numberTrip]).getElement();
    this.tripEventsList = new TripEventsList();


    render(this._boardContainer, this.tripListDays, RenderPosition.BEFOREEND);
    render(this.tripListDays, EventsDay, RenderPosition.BEFOREEND);
    render(EventsDay, this.tripEventsList, RenderPosition.BEFOREEND);

    let dataTripNow = trips[this._numberTrip].start.getDate();
    for (this._numberTrip; this._numberTrip < TRIP_COUNT; this._numberTrip++) {
      if (dataTripNow === trips[this._numberTrip].start.getDate()) {
        this._renderTripEvent(this.tripEventsList, trips[this._numberTrip]);
      } else {
        if (trips.length > this._numberTrip) {
          this._createNewDay();
          this._numberTrip++;
        }
        break;
      }
    }
  }
}
