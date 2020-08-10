import {waypoints, offersTrip, cities, informations} from '../const.js';
import {getRandomInteger} from '../utils';

const waypoint = () => {
  const randomIndex = getRandomInteger(0, waypoints.length - 1);
  const transportTrip = waypoints[randomIndex];
  return transportTrip;
};

const cityName = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);
  const city = cities[randomIndex];
  return city;
};

const randomInformation = () => {
  const randomSum = getRandomInteger(0, 5);
  let informationTravel = ``;
  for (let i = 0; i < randomSum; i++) {
    const randomIndex = getRandomInteger(0, informations.length - 1);
    informationTravel += informations[randomIndex];
  }
  return informationTravel;
};

const randomOffers = () => {
  let offersOneTrip = [];
  const offersGroupTrip = Object.entries(offersTrip);
  let indexOffers = -1;
  let secondIndexOffers = -1;
  const randomSumOffers = getRandomInteger(1, 3);
  for (let i = 1; i <= randomSumOffers; i++) {
    indexOffers = getRandomInteger(0, 4);
    if (indexOffers !== secondIndexOffers) {
      offersOneTrip.push(offersGroupTrip[indexOffers]);
    }
    secondIndexOffers = indexOffers;
  }
  return offersOneTrip;
};


let finishDateNow = new Date();
const startDate = (finishTime) => {
  let finishHours = finishTime.getHours();
  let finishMinutes = finishTime.getMinutes();
  const newDateStart = finishTime.setHours((finishHours + getRandomInteger(0, 8)), (finishMinutes + getRandomInteger(1, 59)), 0, 0);
  return new Date(newDateStart);
};

const finishDate = (startTrip) => {
  const currentDate = new Date(startTrip);
  const currentDateHours = currentDate.getHours();
  currentDate.setHours((currentDateHours + getRandomInteger(0, 4)), getRandomInteger(15, 59), 0, 0);
  finishDateNow = currentDate;
  return new Date(currentDate);
};


export const generateTrip = () => {
  const transport = waypoint();
  const city = cityName();
  const start = startDate(finishDateNow);
  const finish = finishDate(start);
  const price = getRandomInteger(0, 300);
  const duration = Math.round((finish - start) / 60000);
  const offers = randomOffers();
  return {
    transport,
    city,
    offers,
    destination: {
      information: randomInformation(),
      picture: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    price,
    start,
    finish,
    duration
  };
};

