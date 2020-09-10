import {waypoints, cities, informations} from '../const.js';
import {getRandomInteger} from '../utils';

const waypoint = () => {
  const randomIndex = getRandomInteger(0, waypoints.length - 1);
  const transportTrip = waypoints[randomIndex];
  return transportTrip.name;
};


const cityName = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);
  const city = cities[randomIndex];
  return city;
};

const randomInformation = () => {
  const randomSum = getRandomInteger(2, 5);
  let informationTravel = ``;
  for (let i = 0; i < randomSum; i++) {
    const randomIndex = getRandomInteger(0, informations.length - 1);
    informationTravel += informations[randomIndex];
  }
  return informationTravel;
};

let finishDateNow = new Date(2020, 8, 12);
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
  return {
    transport,
    city,
    destination: {
      description: randomInformation(),
      pictures: []
    },
    price,
    start,
    finish,
    duration,
    isFavorite: false
  };
};

