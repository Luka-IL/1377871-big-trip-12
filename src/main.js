import {createTripInfo} from './view/trip-info.js'
import {createSiteMenu} from './view/site-menu.js'
import {createTripListFilter} from './view/trip-filter.js'
import {createSortTripEvent} from './view/sort-events.js'
import {createTripListDays} from './view/list-days.js'
import {createTripDay} from './view/trip-day.js'
import {createTripEvent} from './view/trip-event.js'
import {createAddTripEvent} from './view/add-event.js'

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template)
}

const tripMain = document.querySelector(`.trip-main`)

render (tripMain, createTripInfo(), `afterbegin`)

const tripControls = tripMain.querySelector(`.trip-controls`)

render (tripControls, createSiteMenu(), `beforeend`)
render (tripControls, createTripListFilter(), `beforeend`)

const pageMain = document.querySelector(`.page-main`)
const tripEvents = document.querySelector(`.trip-events`)

render (tripEvents, createSortTripEvent(), `afterbegin`)
render (tripEvents, createAddTripEvent(), `beforeend`)
render (tripEvents, createTripListDays(), `beforeend`)

const dayInfo = tripEvents.querySelector(`.day__info`)
const tripEventsList = tripEvents.querySelector(`.trip-events__list`)

render (dayInfo, createTripDay(), `afterbegin`)
render (tripEventsList, createTripEvent(), `beforeend`)
render (tripEventsList, createTripEvent(), `beforeend`)
render (tripEventsList, createTripEvent(), `beforeend`)