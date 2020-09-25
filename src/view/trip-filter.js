import AbstractView from "./abstract.js";

const createFilter = (filter, filterType) => {
  const {type, name} = filter;
  return `
  <div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${filterType === type ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;
};

const createTripFilter = (filters, filterType) => {
  const tripFilters = filters.map((filter) => createFilter(filter, filterType)).join(``);
  return `<form class="trip-filters" action="#" method="get">
  ${tripFilters}

    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class TripFilter extends AbstractView {

  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
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
    return createTripFilter(this._filters, this._currentFilterType);
  }
}
