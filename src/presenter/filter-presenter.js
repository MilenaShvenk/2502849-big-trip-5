import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {generateFilters} from '../filters.js';

export default class FilterPresenter {
  #filtersContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #filtersComponent = null;

  constructor({filtersContainer, pointsModel, filterModel}) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#onModelEvent);
    this.#pointsModel.addObserver(this.#onModelEvent);
  }

  #onModelEvent = () => {
    this.#renderFilters();
  };

  init() {
    this.#renderFilters();
  }

  #renderFilters() {
    const points = this.#pointsModel.allPoints;
    const filters = generateFilters(points);

    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterChange: this.#onFilterTypeChange
    });

    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(filterType);
  };
}
