import {waypoints} from '../const.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const toFirstLetterUp = (item) => {
  item = item[0].toUpperCase() + item.slice(1);
  return item;
};

export const actionTransport = (transport) => {
  const activeTransport = waypoints.filter((way) => way.name === transport)[0];
  return activeTransport.action;
};


