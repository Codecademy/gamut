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
var baseConfig = {
  typography: typography,
  spacing: spacing,
  border: border,
  layout: layout,
  positioning: positioning,
  grid: grid,
  flex: flex,
  background: background,
  shadow: shadow,
  color: color
};
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