import { identity } from 'lodash';
import { SystemProps } from '../types';
import { system } from '../system';
import { composeSystem } from '../templating/responsiveProp';
import { parseCoord } from '../utils';

const positionContextConfig = {
  type: 'standard',
  scale: [] as ('static' | 'fixed' | 'absolute' | 'relative' | 'sticky')[],
  computeValue: identity,
  propName: 'position',
} as const;

export type PositionContextProps = SystemProps<typeof positionContextConfig>;

export const getPositionContext = system<PositionContextProps>(
  positionContextConfig
);

const coordinateConfig = {
  type: 'standard',
  scale: [] as (number | string)[],
  computeValue: (value: any) => parseCoord(value as string | number),
  propName: ['top', 'left', 'right', 'bottom'],
} as const;

export type CoordinateProps = SystemProps<typeof coordinateConfig>;

export const getCoordinate = system<CoordinateProps>(coordinateConfig);

const zIndexConfig = {
  type: 'standard',
  scale: [] as number[],
  computeValue: identity,
  propName: 'zIndex',
} as const;

export type ZIndexProps = SystemProps<typeof zIndexConfig>;

export const getZIndex = system<ZIndexProps>(zIndexConfig);

export type PositionProps = PositionContextProps &
  CoordinateProps &
  ZIndexProps;

export const getPosition = composeSystem<PositionProps>(
  getPositionContext,
  getZIndex,
  getCoordinate
);
