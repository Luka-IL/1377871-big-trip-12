import Api from './api/index.js';

const AUTHORIZATION = `Basic xo1w2901k29389a`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const taxi = {
  name: `taxi`,
  action: `to`,
  picture: `./img/icons/taxi.png`
};
const bus = {
  name: `bus`,
  action: `to`,
  picture: `../img/icons/bus.png`
};
const train = {
  name: `train`,
  action: `to`,
  picture: `../img/icons/train.png`
};
const ship = {
  name: `ship`,
  action: `to`,
  picture: `../img/icons/ship.png`
};
const transport = {
  name: `transport`,
  action: `to`,
  picture: `../img/icons/transport.png`
};
const drive = {
  name: `drive`,
  action: `to`,
  picture: `../img/icons/drive.png`
};
const flight = {
  name: `flight`,
  action: `to`,
  picture: `../img/icons/flight.png`
};
const check = {
  name: `check-in`,
  action: `in`,
  picture: `../img/icons/check-in.png`
};
const sightseeing = {
  name: `sightseeing`,
  action: `in`,
  picture: `../img/icons/sightseeing.png`
};
const restaurant = {
  name: `restaurant`,
  action: `in`,
  picture: `../img/icons/restaurant.png`
};

export const waypoints = [taxi, bus, train, ship, transport, drive, flight, check, sightseeing, restaurant];

export const offersTrip = [];
export const destinationsTrip = [];

api.getOffers().then((trips) => {
  trips.forEach((item) => offersTrip.push(item));
});

api.getDestinations().then((trips) => {
  trips.forEach((item) => destinationsTrip.push(item));
});

export const SortType = {
  TIME: `time`,
  EVENT: `event`,
  PRICE: `price`,
};

export const UserAction = {
  UPDATE_TRIP: `UPDATE_TRIP`,
  ADD_TRIP: `ADD_TRIP`,
  DELETE_TRIP: `DELETE_TRIP`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  ALL: `all`,
  FUTURE: `future`,
  PAST: `past`,
};

export const MenuItem = {
  ADD_TRIP_EVENT: `ADD_TRIP_EVENT`,
  STATS: `STATS`,
  TABLE: `TABLE`
};
