import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import TripModel from "./model/trips.js";
import {RenderPosition, render} from "./utils/render.js";
import TripList from './presenter/trip-list.js';
import {trips} from './mock/array-trips.js';
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";

const filterModel = new FilterModel();


const tripsModel = new TripModel();
tripsModel.setTrips(trips);

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, new SiteMenu(), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(tripControls, filterModel, tripsModel);

filterPresenter.init();

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const allTrip = new TripList(tripEvents, tripsModel, filterModel);
allTrip.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  allTrip.createTrip();
});
