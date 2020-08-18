import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import TripListFilter from './view/trip-filter.js';
import SortTripEvent from './view/sort-events.js';
import {RenderPosition, render} from "./utils/render.js";
import Trip from './presenter/trip.js';

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, new SiteMenu(), RenderPosition.BEFOREEND);
render(tripControls, new TripListFilter(), RenderPosition.BEFOREEND);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

render(tripEvents, new SortTripEvent(), RenderPosition.AFTERBEGIN);

const allTrip = new Trip(tripEvents);
allTrip.init();
