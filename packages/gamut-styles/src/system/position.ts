import { css } from '@emotion/core';
import { isNumber, isString } from 'lodash';
import { createSystemHandler } from './responsive';

export type PositionCoordinate = string | number;
export type PositionProps = {
  position?: 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';
  zIndex?: number;
  top?: PositionCoordinate;
  bottom?: PositionCoordinate;
  left?: PositionCoordinate;
  right?: PositionCoordinate;
};

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
    top: ${top && parseCoord(top)};
    bottom: ${bottom && parseCoord(bottom)};
    left: ${left && parseCoord(left)};
    right: ${right && parseCoord(right)};
  `;
});
