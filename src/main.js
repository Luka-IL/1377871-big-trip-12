import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import TripListFilter from './view/trip-filter.js';
import TripModel from "./model/trips.js";
import {RenderPosition, render} from "./utils/render.js";
import TripList from './presenter/trip-list.js';
import {trips} from './mock/array-trips.js';

const tripsModel = new TripModel();
tripsModel.setTrips(trips);

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, new SiteMenu(), RenderPosition.BEFOREEND);
render(tripControls, new TripListFilter(), RenderPosition.BEFOREEND);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const allTrip = new TripList(tripEvents, tripsModel);
allTrip.init();

