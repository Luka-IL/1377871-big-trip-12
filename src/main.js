import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import TripModel from "./model/trips.js";
import {RenderPosition, render, remove, replace} from "./utils/render.js";
import TripList from './presenter/trip-list.js';
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from './api/index.js';
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic xo1w2301k29381a`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
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
const allTrip = new TripList(tripEvents, tripsModel, filterModel, apiWithProvider);


filterPresenter.init();

allTrip.init();

apiWithProvider.getTrips()
.then((trips) => {
  tripsModel.setTrips(UpdateType.INIT, trips);
  let tripInfo = new TripInfo(tripsModel.getTrips());
  render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);
  render(tripControls, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  const handleTripInfoRefresh = (trip) => {
    const newChild = new TripInfo(trip);
    replace(newChild, tripInfo);
    tripInfo = newChild;
  };
  allTrip.setRefreshPrice(handleTripInfoRefresh);
})
.catch(() => {
  render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);
  tripsModel.setTrips(UpdateType.INIT, []);
  render(tripControls, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
