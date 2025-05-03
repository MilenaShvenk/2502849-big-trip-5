import {isFuturedPoint, isPresentedPoint, isPastedPoint} from '../utils.js';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filter = {
  [FilterType.EVERYTHING]: (points) => [points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturedPoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentedPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastedPoint(point)),
};

function generateFilters(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length
    })
  );
}

export {FilterType, generateFilters};
