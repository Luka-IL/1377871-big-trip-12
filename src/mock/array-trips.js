
import {generateTrip} from '../mock/trip.js';

export const TRIP_COUNT = 20;
export const trips = new Array(TRIP_COUNT).fill().map(generateTrip).sort((a, b) => {
  if (a.start > b.start) {
    return 1;
  }
  if (a.start < b.start) {
    return -1;
  }
  return 0;
});
