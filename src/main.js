import {createTripInfo} from './view/trip-info.js';
import {createSiteMenu} from './view/site-menu.js';
import {createTripListFilter} from './view/trip-filter.js';
import {createSortTripEvent} from './view/sort-events.js';
import {createTripListDays} from './view/list-days.js';
import {createTripDay} from './view/trip-day.js';
import {createTripEvent} from './view/trip-event.js';
import {createAddTripEvent} from './view/add-event.js';
import {trips, TRIP_COUNT} from './mock/array-trips.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, createTripInfo(), `afterbegin`);

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, createSiteMenu(), `beforeend`);
render(tripControls, createTripListFilter(), `beforeend`);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

render(tripEvents, createSortTripEvent(), `afterbegin`);
render(tripEvents, createAddTripEvent(), `beforeend`);
render(tripEvents, createTripListDays(), `beforeend`);

const dayInfo = tripEvents.querySelector(`.trip-days`);
let numberTrip = 0;
const createNewDay = () => {
  render(dayInfo, createTripDay(), `beforeend`);
  const tripEventsList = dayInfo.querySelectorAll(`.trip-events__list`);
  let dataTripNow = trips[numberTrip].start.getDate();
  for (numberTrip; numberTrip < TRIP_COUNT; numberTrip++) {
    if (dataTripNow === trips[numberTrip].start.getDate()) {
      render(tripEventsList[tripEventsList.length - 1], createTripEvent(trips[numberTrip]), `beforeend`);
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
