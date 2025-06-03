import {isEscapeKey} from '../utils.js';
import {render, replace, remove} from '../framework/render.js';
import FormEditingView from '../view/form-editing-view.js';
import EventView from '../view/event-view.js';
import {Mode, UserAction} from '../const.js';

export default class PointPresenter {
  #eventList = null;
  #point = null;
  #destination = null;
  #offers = null;
  #pointsModel = null;
  #onDataChange = null;
  #onModeChange = null;
  #routePoint = null;
  #editingForm = null;
  #mode = Mode.DEFAULT;
  #isCreating = false;

  constructor({eventList, pointsModel, onDataChange, onModeChange}) {
    this.#eventList = eventList;
    this.#pointsModel = pointsModel;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(point, isCreating = false) {
    this.#point = point;
    this.#isCreating = isCreating;
    this.#destination = isCreating ? null : this.#pointsModel.getDestinationById(point.destination);
    this.#offers = isCreating ? [] : point.offers.map((offerId) => this.#pointsModel.getOfferById(offerId));

    const prevRoutePoint = this.#routePoint;
    const prevEditingForm = this.#editingForm;

    this.#routePoint = new EventView({
      point: this.#point,
      destination: this.#destination,
      offers: this.#offers,
      onRollupButtonClick: this.#onRollupButtonClick,
      onFavoriteClick: this.#onFavoriteClick
    });

    this.#editingForm = new FormEditingView({
      point: this.#point,
      destination: this.#destination,
      offers: this.#pointsModel.getOffersByType(this.#point.type),
      allDestinations: this.#pointsModel.destinations,
      allOffers: this.#pointsModel.offers,
      onFormSubmit: this.#onFormSubmit,
      onRollupButtonClick: this.#onRollupButtonClick,
      onDeleteClick: this.#isCreating ? this.#onCancel : this.#onDeleteClick,
      isCreating: this.#isCreating
    });

    if (isCreating) {
      render(this.#editingForm, this.#eventList.element, 'afterbegin');
      this.#switchToEditingForm();
      return;
    }

    if (prevRoutePoint === null || prevEditingForm === null) {
      render(this.#routePoint, this.#eventList.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#routePoint, prevRoutePoint);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editingForm, prevEditingForm);
    }

    remove(prevRoutePoint);
    remove(prevEditingForm);
  }

  destroy() {
    remove(this.#routePoint);
    remove(this.#editingForm);
    document.removeEventListener('keydown', this.#onDocumentKeydown);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editingForm.reset(this.#point);
      this.#switchToRoutePoint();
    }
  }

  #switchToEditingForm() {
    this.#onModeChange(this.#point.id);
    if (this.#isCreating) {
      render(this.#editingForm, this.#eventList.element, 'afterbegin');
    } else {
      replace(this.#editingForm, this.#routePoint);
    }
    document.addEventListener('keydown', this.#onDocumentKeydown);
    this.#mode = Mode.EDITING;
  }

  #switchToRoutePoint() {
    if (this.#mode === Mode.EDITING) {
      if (this.#isCreating) {
        remove(this.#editingForm);
        this.#unlockNewEventButton();
      } else {
        replace(this.#routePoint, this.#editingForm);
      }
      document.removeEventListener('keydown', this.#onDocumentKeydown);
      this.#mode = Mode.DEFAULT;
    }
  }

  #onRollupButtonClick = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#switchToEditingForm();
    } else {
      this.resetView();
      this.#onModeChange(null);
      if (this.#isCreating) {
        this.#unlockNewEventButton();
      }
    }
  };

  #unlockNewEventButton = () => {
    const newEventButton = document.querySelector('.trip-main__event-add-btn');
    if (newEventButton) {
      newEventButton.disabled = false;
    }
  };

  #onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      if (this.#isCreating) {
        this.#unlockNewEventButton();
        this.destroy();
      } else {
        this.resetView();
      }

      this.#onModeChange(null);
    }
  };

  #onFormSubmit = async (updatedPoint) => {
    try {
      this.#editingForm.setSavingState();

      if (this.#isCreating) {
        await this.#onDataChange(UserAction.ADD_POINT, updatedPoint);
        this.#unlockNewEventButton();
        this.#switchToRoutePoint();
      } else {
        await this.#onDataChange(UserAction.UPDATE_POINT, updatedPoint);
        this.#switchToRoutePoint();
      }
    } catch {
      this.#editingForm.shake();
    } finally {
      this.#editingForm.resetButtonStates();
    }
  };

  #onDeleteClick = async (point) => {
    try {
      this.#editingForm.setDeletingState();
      await this.#onDataChange(
        UserAction.DELETE_POINT,
        {id: point.id}
      );
      this.destroy();
      this.#onModeChange(null);
    } catch {
      this.#editingForm.shake();
    } finally {
      this.#editingForm.resetButtonStates();
    }
  };

  #onCancel = () => {
    this.destroy();
    this.#onModeChange(null);
    this.#unlockNewEventButton();
  };

  #onFavoriteClick = (updatedPoint) => {
    this.#onDataChange(
      UserAction.UPDATE_POINT,
      updatedPoint
    );
  };
}
