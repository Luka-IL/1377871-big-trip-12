export const transportInUse = (trips) => [...new Set(trips.map((item) => item.transport.name))];

export const counterTransport = (statisticsTrips, trips) => statisticsTrips.map((item) => {
  return trips.filter((trip) => trip.transport.name === item).length;
});

export const counterMoney = (statisticsTrips, trips) => statisticsTrips.map((item) => {
  let money = 0;
  trips.map((trip) => {
    if (trip.transport.name === item) {
      money += trip.price;
    }
  });
  return money;
});

export const counterTime = (statisticsTrips, trips) => statisticsTrips.map((item) => {
  let time = 0;
  trips.map((trip) => {
    if (trip.transport.name === item) {
      time += trip.duration;
    }
  });
  return time;
});
