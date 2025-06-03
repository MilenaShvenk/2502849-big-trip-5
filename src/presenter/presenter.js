/* eslint-disable camelcase */
import {render, remove} from '../framework/render.js';
import {sortPointsByDay, sortPointsByTime, sortPointsByPrice} from '../utils.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {SortType, UserAction, FilterType} from '../const.js';

export default class Presenter {
  #eventsContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #pointPresenters = new Map();
  #currentEditingPointId = null;
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #eventList = null;
  #emptyListComponent = null;

  constructor({eventsContainer, pointsModel, filterModel}) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip() {
    this.#clearTrip();

    if (this.#pointsModel.isLoading) {
      this.#renderMessage('Loading...');
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      return;
    }

    if (this.#pointsModel.isFailed) {
      this.#renderMessage('Failed to load latest route information');
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      return;
    }

    const points = this.#pointsModel.points;
    const filterType = this.#filterModel.filter;

    if (points.length === 0) {
      this.#renderEmptyList(filterType);
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      return;
    }

    this.#renderPointsList();
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  #clearTrip() {
    this.#clearPoints();

    const messageElement = this.#eventsContainer.querySelector('.trip-events__msg');
    if (messageElement) {
      messageElement.remove();
    }

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
      this.#emptyListComponent = null;
    }

    if (this.#sortComponent) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
    }

    if (this.#eventList) {
      remove(this.#eventList);
      this.#eventList = null;
    }
  }

  #renderMessage(text) {
    this.#clearTrip();
    this.#eventsContainer.insertAdjacentHTML('beforeend', `<p class="trip-events__msg">${text}</p>`);
  }

  #renderPointsList() {
    this.#sortComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#onSortTypeChange
    });
    render(this.#sortComponent, this.#eventsContainer);

    this.#eventList = new EventListView();
    render(this.#eventList, this.#eventsContainer);

    this.#renderPoints();
  }

  #renderPoints() {
    const points = this.#pointsModel.points;
    const sortedPoints = this.#sortPoints(points);

    sortedPoints.forEach((point) => {
      if (!this.#pointPresenters.has(point.id)) {
        this.#renderPoint(point);
      }
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventList: this.#eventList,
      pointsModel: this.#pointsModel,
      onDataChange: this.#onPointChange,
      onModeChange: this.#onModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderEmptyList(filterType) {
    this.#emptyListComponent = new EmptyListView({filterType});
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #onModelEvent = () => {
    this.#currentSortType = SortType.DAY;

    if (this.#sortComponent) {
      this.#sortComponent.update(SortType.DAY);
    }

    this.#clearTrip();
    this.#renderTrip();
  };

  #sortPoints(points) {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...points].sort(sortPointsByPrice);
      case SortType.DAY:
      default:
        return [...points].sort(sortPointsByDay);
    }
  }

  #onPointChange = async (actionType, update) => {
    switch (actionType) {
      case UserAction.ADD_POINT:
        await this.#pointsModel.addPoint(update);
        break;
      case UserAction.UPDATE_POINT:
        await this.#pointsModel.updatePoint(update);
        break;
      case UserAction.DELETE_POINT:
        await this.#pointsModel.deletePoint(update);
        break;
    }
  };

  onNewPointButtonClick = () => {
    if (this.#filterModel.filter !== FilterType.EVERYTHING) {
      this.#filterModel.setFilter(FilterType.EVERYTHING);
    }

    this.#currentSortType = SortType.DAY;
    this.#sortComponent?.update(SortType.DAY);

    const newPoint = {
      id: `temp-${crypto.randomUUID()}`,
      base_price: 0,
      date_from: '',
      date_to: '',
      destination: this.#pointsModel.destinations[0]?.id || null,
      is_favorite: false,
      offers: [],
      type: 'flight'
    };

    const pointPresenter = new PointPresenter({
      eventList: this.#eventList,
      pointsModel: this.#pointsModel,
      onDataChange: this.#onPointChange,
      onModeChange: this.#onModeChange
    });

    pointPresenter.init(newPoint, true);
    this.#pointPresenters.set(newPoint.id, pointPresenter);
    this.#currentEditingPointId = newPoint.id;
  };

  #onModeChange = (pointId) => {
    if (this.#currentEditingPointId === pointId) {
      return;
    }

    if (this.#currentEditingPointId) {
      const presenter = this.#pointPresenters.get(this.#currentEditingPointId);
      if (presenter) {
        presenter.resetView();
      }
    }

    this.#currentEditingPointId = pointId;
  };

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };
}
