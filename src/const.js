import {getRandomBoolean} from './utils/common.js';

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

export const offersTrip = {
  luggage: {
    active: getRandomBoolean(),
    type: `offers`,
    name: `Add luggage`,
    price: 30
  },
  comfort: {
    active: getRandomBoolean(),
    type: `offers`,
    name: `Switch to comfort class`,
    price: 100
  },
  meal: {
    active: getRandomBoolean(),
    type: `offers`,
    name: `Add meal`,
    price: 15
  },
  seats: {
    active: getRandomBoolean(),
    type: `offers`,
    name: `Choose seats`,
    price: 5
  },
  train: {
    active: getRandomBoolean(),
    type: `offers`,
    name: `Travel by train`,
    price: 40
  },
};

export const cities = [`Amsterdam`, `Moscow`, `New - York`, `Istambul`, `Dubai`, `Singapore`];

export const informations = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`];
