import Observer from "../utils/observer.js";

const fullPrice = (trip) => {
  let offersPrice = 0;
  trip.offers.forEach((item) => (offersPrice += item.price));
  const allPrice = trip.base_price + offersPrice;
  return allPrice;
};

export default class Trips extends Observer {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(updateType, trips) {
    this._trips = trips.slice();
    this._notify(updateType);

  }

  getTrips() {
    return this._trips;
  }

  updateTrip(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      update,
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addTrip(updateType, update) {
    this._trips = [
      update,
      ...this._trips
    ];

    this._notify(updateType, update);
  }

  deleteTrip(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          transport: trip.type,
          start: new Date(trip.date_from),
          finish: new Date(trip.date_to),
          price: trip.base_price,
          duration: Math.round((new Date(trip.date_to) - new Date(trip.date_from)) / 60000),
          isFavorite: trip.is_favorite,
          fullPrice: fullPrice(trip)
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTrip.is_favorite;
    delete adaptedTrip.date_from;
    delete adaptedTrip.date_to;
    delete adaptedTrip.base_price;
    delete adaptedTrip.type;

    return adaptedTrip;
  }

  static adaptToServer(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          "type": trip.transport,
          "date_from": trip.start,
          "date_to": trip.finish,
          "base_price": trip.price,
          "is_favorite": trip.isFavorite,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedTrip.transport;
    delete adaptedTrip.finish;
    delete adaptedTrip.start;
    delete adaptedTrip.price;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  }
}
