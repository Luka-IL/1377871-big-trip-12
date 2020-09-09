import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import TripModel from "./model/trips.js";
import {RenderPosition, render, remove} from "./utils/render.js";
import TripList from './presenter/trip-list.js';
import {trips} from './mock/array-trips.js';
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";

const filterModel = new FilterModel();


const tripsModel = new TripModel();
tripsModel.setTrips(trips);

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);

const siteMenuComponent = new SiteMenu();

render(tripControls, siteMenuComponent, RenderPosition.BEFOREEND);

const handleSiteMenuActiveChose = (item) => {
  siteMenuComponent.setMenuItem(item);
};
console.log(handleSiteMenuActiveChose)

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_TRIP_EVENT:
      remove(statisticsComponent);
      allTrip.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      allTrip.init();
      allTrip.createTrip(handleSiteMenuActiveChose);
      break;
    case MenuItem.TABLE:
      allTrip.init();
      remove(statisticsComponent);
      handleSiteMenuActiveChose(`TABLE`);
      break;
    case MenuItem.STATS:
      allTrip.destroy();
      statisticsComponent = new StatisticsView(tripsModel.getTrips());
      render(tripEvents, statisticsComponent, RenderPosition.BEFOREEND);
      handleSiteMenuActiveChose(`STATS`);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const filterPresenter = new FilterPresenter(tripControls, filterModel, tripsModel);

filterPresenter.init();

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const allTrip = new TripList(tripEvents, tripsModel, filterModel);
allTrip.init();
