import AbstractView from "./abstract.js";
import {filter} from "../utils/filter.js";


const createFilter = (selectedFilter, filterType, trips) => {
  const {type, name} = selectedFilter;
  const filtredTrips = filter[type](trips);
  return `
  <div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${filterType === type ? `checked` : ``} ${filtredTrips.length !== 0 ? `` : `disabled`}>
    <label class="trip-filters__filter-label ${filtredTrips.length !== 0 ? `` : `filter-label--disabled`}" for="filter-${name}">${name}</label>
  </div>`;
};

const createTripFilter = (filters, filterType, trips) => {
  const tripFilters = filters.map((item) => createFilter(item, filterType, trips)).join(``);
  return `<form class="trip-filters" action="#" method="get">
  ${tripFilters}

    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class TripFilter extends AbstractView {
  constructor(filters, currentFilterType, trips) {
    super();
    this._filters = filters;
    this._trips = trips;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  getTemplate() {
    return createTripFilter(this._filters, this._currentFilterType, this._trips);
  }
}
