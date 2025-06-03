import {BASE_URL, AUTHORIZATION, HttpMethod} from './const';

export default class ApiService {
  async getPoints() {
    return this.#load({url: 'points', method: HttpMethod.GET})
      .then(ApiService.parseResponse);
  }

  async getDestinations() {
    return this.#load({url: 'destinations', method: HttpMethod.GET})
      .then(ApiService.parseResponse);
  }

  async getOffers() {
    return this.#load({url: 'offers', method: HttpMethod.GET})
      .then(ApiService.parseResponse);
  }

  async addPoint(point) {
    return this.#load({
      url: 'points',
      method: HttpMethod.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    return this.#load({
      url: `points/${point.id}`,
      method: HttpMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(ApiService.parseResponse);
  }

  async deletePoint(point) {
    return this.#load({
      url: `points/${point.id}`,
      method: HttpMethod.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  }

  async #load({url, method = HttpMethod.GET, body = null, headers = new Headers()}) {
    headers.append('Authorization', AUTHORIZATION);

    try {
      const response = await fetch(`${BASE_URL}/${url}`, {method, body, headers});

      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`);
      }

      return response;
    } catch (err) {
      throw new Error(`Network error: ${err.message}`);
    }
  }

  static parseResponse(response) {
    return response.json();
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'date_from': point.date_from,
      'date_to': point.date_to,
      'base_price': Math.max(1, Number(point.base_price)),
      'is_favorite': Boolean(point.is_favorite),
      'destination': point.destination?.id || point.destination,
      'offers': point.offers || []
    };

    if (point.id.includes('temp-')) {
      delete adaptedPoint.id;
    }

    delete adaptedPoint.destinationName;
    delete adaptedPoint.offersList;

    return adaptedPoint;
  }
}

