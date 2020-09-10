import Api from './api.js';

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
const fly = {
  name: `fly`,
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

export const waypoints = [taxi, bus, train, ship, transport, drive, fly, check, sightseeing, restaurant];

export let offersTrip = [];
api.getOffers().then((trips) => {
  trips.forEach((item) => offersTrip.push(item));
});

export const cities = [`Amsterdam`, `Moscow`, `New - York`, `Istambul`, `Dubai`, `Singapore`];

export const informations = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`];

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
