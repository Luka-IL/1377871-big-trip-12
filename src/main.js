import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import TripListFilter from './view/trip-filter.js';
import SortTripEvent from './view/sort-events.js';
import TripListDays from './view/list-days.js';
import TripDay from './view/trip-day.js';
import TripEvent from './view/trip-event.js';
import AddTripEvent from './view/add-event.js';
import TripEventsList from './view/trip-events-list';
import {trips, TRIP_COUNT} from './mock/array-trips.js';
import {renderElement, RenderPosition} from "./utils.js";

const tripMain = document.querySelector(`.trip-main`);

renderElement(tripMain, new TripInfo().getElement(), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-controls`);

renderElement(tripControls, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
renderElement(tripControls, new TripListFilter().getElement(), RenderPosition.BEFOREEND);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const dayInfo = new TripListDays().getElement();
renderElement(tripEvents, new SortTripEvent().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripEvents, dayInfo, RenderPosition.BEFOREEND);

const renderTripEvent = (tripListElement, trip) => {
  const tripComponent = new TripEvent(trip);
  const tripAddComponent = new AddTripEvent(trip);

  const replaceCardToForm = () => {
    tripListElement.replaceChild(tripAddComponent.getElement(), tripComponent.getElement());
  };

  const replaceFormToCard = () => {
    tripListElement.replaceChild(tripComponent.getElement(), tripAddComponent.getElement());
  };

  tripComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  tripAddComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });


  renderElement(tripListElement, tripComponent.getElement(), RenderPosition.BEFOREEND);
};

let numberTrip = 0;
const createNewDay = () => {
  const EventsDay = new TripDay().getElement();
  const EventsDayList = new TripEventsList().getElement();
  renderElement(dayInfo, EventsDay, RenderPosition.BEFOREEND);
  renderElement(EventsDay, EventsDayList, RenderPosition.BEFOREEND);
  let dataTripNow = trips[numberTrip].start.getDate();
  for (numberTrip; numberTrip < TRIP_COUNT; numberTrip++) {
    if (dataTripNow === trips[numberTrip].start.getDate()) {
      renderTripEvent(EventsDayList, trips[numberTrip]);
    } else {
      if (trips.length > numberTrip) {
        createNewDay();
        numberTrip++;
      }
      break;
    }
  }
};
createNewDay();
