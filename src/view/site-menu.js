import AbstractView from "./abstract.js";
import {MenuItem} from '../const.js';

const createSiteMenu = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">Table</a>
              <a class="trip-tabs__btn" href="#" id="${MenuItem.STATS}">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._allMenuItems = this.getElement().querySelectorAll(`.trip-tabs__btn`);

  }
  getTemplate() {
    return createSiteMenu();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this._allMenuItems.forEach((link) => link.addEventListener(`click`, this._menuClickHandler));
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[id=${menuItem}]`);
    if (item !== null) {
      this._allMenuItems.forEach((link) => link.classList.remove(`trip-tabs__btn--active`));
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
