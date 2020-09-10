import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import TripModel from "./model/trips.js";
import {RenderPosition, render, remove} from "./utils/render.js";
import TripList from './presenter/trip-list.js';
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from './api.js';

const AUTHORIZATION = `Basic xo1w2901k29389a`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();
const tripsModel = new TripModel();
const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const siteMenuComponent = new SiteMenu();
const handleSiteMenuActiveChose = (item) => {
  siteMenuComponent.setMenuItem(item);
};

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
const filterPresenter = new FilterPresenter(tripControls, filterModel, tripsModel);
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);
const allTrip = new TripList(tripEvents, tripsModel, filterModel, api);

render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);


filterPresenter.init();
allTrip.init();

api.getTrips()
.then((trips) => {
  tripsModel.setTrips(UpdateType.INIT, trips);
  render(tripControls, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
})
.catch(() => {
  tripsModel.setTrips(UpdateType.INIT, []);
  render(tripControls, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});
