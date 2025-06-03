/* eslint-disable camelcase */
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {FLATPICKR_COMMON_OPTIONS} from '../const.js';
import {formatDateTime, formatToISO, getValidDate} from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createFormEditingTemplate({point, destination, offers, allDestinations, isCreating}) {
  const destinationNames = allDestinations.map((dest) => dest.name);
  const hasOffers = offers.length > 0;
  const hasDestinationInfo = destination && (destination.description || destination.pictures?.length > 0);

  return `<form class="event event--edit" action="#" method="post">
          <header class="event__header">
          <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${point.type === 'taxi' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${point.type === 'bus' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${point.type === 'train' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${point.type === 'ship' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${point.type === 'drive' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${point.type === 'flight' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${point.type === 'check-in' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${point.type === 'sightseeing' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${point.type === 'restaurant' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1"
            type="text" name="event-destination"
            value="${destination ? destination.name : ''}"
            list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${destinationNames.map((name) => `<option value="${name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1"
            type="text" name="event-start-time"
            value="${point.date_from ? formatDateTime(point.date_from) : ''}" required>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1"
            type="text" name="event-end-time"
            value="${point.date_from ? formatDateTime(point.date_to) : ''}" required>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1"
            type="number" name="event-price"
            value="${point.base_price}" min="0" required>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="button">${isCreating ? 'Cancel' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Close event</span>
        </button>
      </header>

      ${hasOffers ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offers.map((offer) => `
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden"
                  id="event-offer-${offer.id}"
                  type="checkbox"
                  name="event-offer"
                  value="${offer.id}"
                  ${point.offers.includes(offer.id) ? 'checked' : ''}>
                <label class="event__offer-label" for="event-offer-${offer.id}">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </label>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

          ${hasDestinationInfo ? `
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : ''}
              ${destination.pictures?.length > 0 ? `
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${destination.pictures.map((picture) => `
                      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
                    `).join('')}
                  </div>
                </div>
            </section>
          ` : ''}
        </section>
      ` : ''}
    </form>`;
}

export default class FormEditingView extends AbstractStatefulView {
  #point = null;
  #allDestinations = [];
  #allOffers = [];
  #onFormSubmit = null;
  #onRollupClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #onDeleteClick = null;
  #isCreating = null;

  constructor({point, destination, offers, allDestinations, allOffers, onFormSubmit, onRollupButtonClick, onDeleteClick, isCreating = false}) {
    super();
    this.#point = point;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#onFormSubmit = onFormSubmit;
    this.#onRollupClick = isCreating ? () => onRollupButtonClick() : onRollupButtonClick;
    this.#onDeleteClick = isCreating ? () => {} : onDeleteClick;
    this.#isCreating = isCreating;

    this._setState({
      point: { ...this.#point },
      destination: isCreating ? null : destination,
      offers: isCreating ? allOffers.find((offer) => offer.type === 'flight')?.offers || [] : offers
    });

    this._restoreHandlers();
  }

  get template() {
    return createFormEditingTemplate({
      point: this._state.point,
      destination: this._state.destination,
      offers: this._state.offers,
      allDestinations: this.#allDestinations,
      isCreating: this.#isCreating
    });
  }

  removeElement() {
    super.removeElement();
    this.#datepickerFrom?.destroy();
    this.#datepickerTo?.destroy();
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#onFormSubmitClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupButtonClick);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#onOfferToggle);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteButtonClick);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#onValidateDestination);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onValidatePriceInput);

    this.#setFlatpickr();
  }

  #setFlatpickr() {
    const onDateFromChange = (dates) => {
      if (dates[0]) {
        this._setState({
          point: {
            ...this._state.point,
            date_from: formatToISO(dates[0])
          }
        });
        this.#datepickerTo.set('minDate', dates[0]);
      }
    };

    const onDateToChange = (dates) => {
      if (dates[0]) {
        this._setState({
          point: {
            ...this._state.point,
            date_to: formatToISO(dates[0])
          }
        });
      }
    };

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...FLATPICKR_COMMON_OPTIONS,
        defaultDate: getValidDate(this._state.point.date_from),
        onClose: onDateFromChange
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...FLATPICKR_COMMON_OPTIONS,
        defaultDate: getValidDate(this._state.point.date_to),
        minDate: getValidDate(this._state.point.date_from),
        onClose: onDateToChange
      }
    );
  }

  #onTypeChange = (evt) => {
    if (!evt.target.matches('input[name="event-type"]')) {
      return;
    }

    const newType = evt.target.value;
    const newOffers = this.#allOffers.find((offer) => offer.type === newType)?.offers || [];

    this.updateElement({
      point: {
        ...this._state.point,
        type: newType,
        offers: []
      },
      offers: newOffers
    });
  };

  #onDestinationChange = (evt) => {
    const selectedName = evt.target.value;
    const newDestination = this.#allDestinations.find((dest) => dest.name === selectedName);

    if (newDestination?.id !== this._state.destination?.id) {
      this.updateElement({
        destination: newDestination || null,
        offers: this._state.offers
      });
    }
  };


  #onOfferToggle = (evt) => {
    if (!evt.target.matches('input[name="event-offer"]')) {
      return;
    }

    const offerId = evt.target.value;
    const offers = [...this._state.point.offers];
    const offerIndex = offers.indexOf(offerId);

    if (offerIndex === -1) {
      offers.push(offerId);
    } else {
      offers.splice(offerIndex, 1);
    }

    this._setState({
      point: {
        ...this._state.point,
        offers
      }
    });
  };

  #onFormSubmitClick = (evt) => {
    evt.preventDefault();

    if (!this._state.point.date_from || !this._state.point.date_to || !this._state.destination) {
      return;
    }

    this.#onFormSubmit({
      ...this._state.point,
      destination: this._state.destination.id,
      date_from: dayjs(this._state.point.date_from).toISOString(),
      date_to: dayjs(this._state.point.date_to).toISOString()
    });
  };

  #onRollupButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#isCreating) {
      this.#onDeleteClick();
    } else {
      this.#onRollupClick();
    }
  };

  #onDeleteButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#isCreating) {
      this.#onRollupClick();
    } else {
      this.#onDeleteClick(this._state.point);
    }
  };

  #onValidateDestination = (evt) => {
    const input = evt.target;
    const destinationNames = this.#allDestinations.map((dest) => dest.name);

    if (input.value && !destinationNames.includes(input.value)) {
      input.value = '';
      this.updateElement({
        destination: null,
        offers: this._state.offers
      });
    }
  };

  #onValidatePriceInput = (evt) => {
    const input = evt.target;
    if (!/^\d*$/.test(input.value)) {
      input.value = input.value.replace(/[^\d]/g, '');
    }

    if (input.value === '' || /^\d+$/.test(input.value)) {
      this._setState({
        point: {
          ...this._state.point,
          base_price: input.value === '' ? null : parseInt(input.value, 10)
        }
      });
    }
  };

  setSavingState() {
    this.element.querySelector('.event__save-btn').textContent = 'Saving...';
    this.element.querySelector('.event__save-btn').disabled = true;
    this.element.querySelector('.event__rollup-btn').disabled = true;
    this.element.querySelector('.event__reset-btn').disabled = true;
  }

  setDeletingState() {
    this.element.querySelector('.event__reset-btn').textContent = 'Deleting...';
    this.element.querySelector('.event__reset-btn').disabled = true;
    this.element.querySelector('.event__save-btn').disabled = true;
    this.element.querySelector('.event__rollup-btn').disabled = true;
  }

  resetButtonStates() {
    this.element.querySelector('.event__save-btn').textContent = 'Save';
    this.element.querySelector('.event__reset-btn').textContent = this._state.isCreating ? 'Cancel' : 'Delete';
    this.element.querySelector('.event__save-btn').disabled = false;
    this.element.querySelector('.event__reset-btn').disabled = false;
    this.element.querySelector('.event__rollup-btn').disabled = false;
  }

  reset(point) {
    this.updateElement({
      point: { ...point },
      destination: this.#allDestinations.find((dest) => dest.id === point.destination) || null,
      offers: this.#allOffers.find((offer) => offer.type === point.type)?.offers || []
    });


    this.#datepickerFrom?.setDate(getValidDate(point.date_from));
    this.#datepickerTo?.setDate(getValidDate(point.date_to));
  }

  shake() {
    this.element.style.animation = 'shake 0.6s';
    setTimeout(() => {
      this.element.style.animation = '';
    }, 600);
  }
}
