import { css } from '@emotion/core';
import { isNumber, isString, isObject } from 'lodash';
import { createSystemHandler } from './responsive';
import { SystemProp } from './types';

export type PositionCoordinate = string | number;
export type PositionValue =
  | 'absolute'
  | 'relative'
  | 'static'
  | 'fixed'
  | 'sticky';

export type Coordinates = SystemProp<
  'top' | 'bottom' | 'left' | 'right',
  PositionCoordinate
>;

export type Position = SystemProp<'position', PositionValue>;

export type ZIndex = SystemProp<'zIndex', number>;

export type PositionProps = Coordinates & Position & ZIndex;

const percentOrPx = (coordinate: number) => {
  if (coordinate <= 1 && coordinate >= -1) {
    return `${coordinate * 100}%`;
  }
  return `${coordinate}px`;
};

const parseCoord = (coordinate: PositionCoordinate) => {
  if (isNumber(coordinate)) {
    return percentOrPx(coordinate);
  }
  if (isString(coordinate)) {
    let normalizedCoordinate = coordinate;
    if (coordinate.startsWith('.')) {
      normalizedCoordinate = `0${coordinate}`;
    }
    const numeric = parseFloat(normalizedCoordinate);
    const isUnitless =
      numeric.toString().length === normalizedCoordinate.length;
    return isUnitless ? percentOrPx(numeric) : normalizedCoordinate;
  }
};

export const getPosition = createSystemHandler<PositionProps>((props) => {
  const { position, zIndex, top, bottom, left, right } = props;
  return css`
    position: ${position};
    z-index: ${zIndex};
    top: ${top && !isObject(top) && parseCoord(top)};
    bottom: ${bottom && !isObject(bottom) && parseCoord(bottom)};
    left: ${left && !isObject(left) && parseCoord(left)};
    right: ${right && !isObject(right) && parseCoord(right)};
  `;
});
