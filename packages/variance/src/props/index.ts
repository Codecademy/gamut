import { background } from './background';
import { border } from './borders';
import { color } from './colors';
import { flex } from './flex';
import { global } from './global';
import { grid } from './grid';
import { layout } from './layout';
import { positioning } from './position';
import { shadow } from './shadow';
import { spacing } from './spacing';
import { typography } from './typography';

export const baseProps = {
  // static only props
  ...global,
  // standard props
  ...background,
  ...border,
  ...flex,
  ...grid,
  ...layout,
  ...positioning,
  ...shadow,
  ...spacing,
  ...typography,
  ...color,
};

export type BaseProps = typeof baseProps;

export * from './typography';
export * from './spacing';
export * from './borders';
export * from './layout';
export * from './position';
export * from './grid';
export * from './flex';
export * from './background';
export * from './shadow';
export * from './colors';
