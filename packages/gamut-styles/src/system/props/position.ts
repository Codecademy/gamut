import { identity } from 'lodash';
import { HandlerProps } from '../types';
import { registerHandler, compose } from '../system';
import { parseCoordinate } from '../transforms';

const positionContextConfig = {
  type: 'standard',
  scale: [] as ('static' | 'fixed' | 'absolute' | 'relative' | 'sticky')[],
  computeValue: identity,
  propName: 'position',
} as const;

export const getPositionContext = registerHandler(positionContextConfig);
export type PositionContextProps = HandlerProps<typeof getPositionContext>;

const coordinateConfig = {
  type: 'standard',
  scale: [] as (number | string)[],
  computeValue: (value: any) => parseCoordinate(value as string | number),
  propName: ['top', 'left', 'right', 'bottom'],
} as const;

export const getCoordinate = registerHandler(coordinateConfig);
export type CoordinateProps = HandlerProps<typeof getCoordinate>;

const zIndexConfig = {
  type: 'standard',
  scale: [] as number[],
  computeValue: identity,
  propName: 'zIndex',
} as const;

export const getZIndex = registerHandler(zIndexConfig);
export type ZIndexProps = HandlerProps<typeof getZIndex>;

export type PositionProps = PositionContextProps &
  CoordinateProps &
  ZIndexProps;

export const getPosition = compose(
  getPositionContext,
  getZIndex,
  getCoordinate
);
