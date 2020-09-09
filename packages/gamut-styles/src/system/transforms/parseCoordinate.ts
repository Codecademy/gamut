import { isNumber } from 'lodash';

const percentOrPx = (coordinate: number) => {
  if (coordinate <= 1 && coordinate >= -1) {
    return `${coordinate * 100}%`;
  }
  return `${coordinate}px`;
};

export const parseCoordinate = (coordinate: string | number) => {
  if (isNumber(coordinate)) {
    return percentOrPx(coordinate);
  }
  let normalizedCoordinate = coordinate;
  if (coordinate.startsWith('.')) {
    normalizedCoordinate = `0${coordinate}`;
  }
  const numeric = parseFloat(normalizedCoordinate);
  const isUnitless = numeric.toString().length === normalizedCoordinate.length;
  return isUnitless ? percentOrPx(numeric) : normalizedCoordinate;
};
