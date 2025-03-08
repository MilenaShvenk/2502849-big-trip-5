import {render} from '../render.js';
import FiltersView from '../view/filters-view';
import FormCreationView from '../view/form-creation-view';
import FormEditingView from '../view/form-editing-view';
import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-view.js';
import SortingView from '../view/sorting-view';


export default class Presenter {
  eventList = new EventListView();

  constructor({pointsModel}) {
    this.pointsModel = pointsModel;
    this.events = document.querySelector('.trip-events');
    this.filters = document.querySelector('.trip-controls__filters');
  }

  init() {
    const points = this.pointsModel.getPoints();

    render(new FiltersView(), this.filters);
    render(new SortingView(), this.events);
    render(this.eventList, this.events);

    const firstPoint = points[0];
    const firstDestination = this.pointsModel.getDestinationById(firstPoint.destination);
    const firstOffer = firstPoint.offers.map((offerId) => this.pointsModel.getOfferById(offerId));

    render(new FormEditingView({point: firstPoint, firstDestination, firstOffers: firstOffer}), this.eventList.getElement());

    points.forEach((point) => {
      const destination = this.pointsModel.getDestinationById(point.destination);
      const offers = point.offers.map((offerId) => this.pointsModel.getOfferById(offerId));

      render(new EventItemView({point, destination, offers}), this.eventList.getElement());
    });

    render(new FormCreationView(), this.eventList.getElement());
  }
}

