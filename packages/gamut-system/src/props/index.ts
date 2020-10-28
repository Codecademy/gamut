import { typography } from './typography';
import { spacing } from './spacing';
import { border } from './borders';
import { layout } from './layout';
import { positioning } from './position';
import { grid } from './grid';
import { flex } from './flex';
import { background } from './background';
import { shadow } from './shadow';
import { color } from './colors';

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
