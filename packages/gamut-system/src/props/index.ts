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

export const AllProps = {
  ...typography,
  ...spacing,
  ...border,
  ...layout,
  ...positioning,
  ...grid,
  ...flex,
  ...background,
  ...shadow,
  ...color,
};

export const Groups = {
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

export type PropGroups = {
  [K in keyof typeof Groups]: keyof typeof Groups[K];
};

export type BaseSystemConfig = typeof AllProps;
