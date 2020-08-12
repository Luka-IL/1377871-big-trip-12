import {getRandomInteger} from './utils.js';

const taxi = {
  name: `taxi`,
  action: `to`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const bus = {
  name: `bus`,
  action: `to`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const train = {
  name: `train`,
  action: `to`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const ship = {
  name: `ship`,
  action: `to`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const transport = {
  name: `transport`,
  action: `to`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const drive = {
  name: `drive`,
  action: `to`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const fly = {
  name: `fly`,
  action: `to`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const check = {
  name: `check-in`,
  action: `in`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const sightseeing = {
  name: `sightseeing`,
  action: `in`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};
const restaurant = {
  name: `restaurant`,
  action: `in`,
  picture: `http://picsum.photos/248/152?r=${Math.random()}`
};

export const waypoints = [taxi, bus, train, ship, transport, drive, fly, check, sightseeing, restaurant];

export const offersTrip = {
  luggage: {
    active: Boolean(getRandomInteger(0, 1)),
    type: `offers`,
    name: `Add luggage`,
    price: 30
  },
  comfort: {
    active: Boolean(getRandomInteger(0, 1)),
    type: `offers`,
    name: `Switch to comfort class`,
    price: 100
  },
  meal: {
    active: Boolean(getRandomInteger(0, 1)),
    type: `offers`,
    name: `Add meal`,
    price: 15
  },
  seats: {
    active: Boolean(getRandomInteger(0, 1)),
    type: `offers`,
    name: `Choose seats`,
    price: 5
  },
  train: {
    active: Boolean(getRandomInteger(0, 1)),
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
