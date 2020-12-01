import { background } from './background';
import { border } from './borders';
import { color } from './colors';
import { flex } from './flex';
import { grid } from './grid';
import { layout } from './layout';
import { positioning } from './position';
import { shadow } from './shadow';
import { spacing } from './spacing';
import { typography } from './typography';

export const baseConfig = {
  typography,
  spacing,
  border,
  layout,
  positioning,
  grid,
  flex,
  background,
  shadow,
  color,
};

export type BaseSystemConfig = typeof baseConfig;

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
