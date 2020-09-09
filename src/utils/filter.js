import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (trips) => trips.slice(),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => trip.start < Date.now()),
  [FilterType.PAST]: (trips) => trips.filter((trip) => trip.start > Date.now()),
};
