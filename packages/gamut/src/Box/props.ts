import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';

import { OptionalScrollProps, WithChildrenProp } from '../utils';

export const boxProps = variance.compose(
  system.space,
  system.border,
  system.layout,
  system.color,
  system.shadow,
  system.positioning,
  system.background,
  system.typography,
  system.flex,
  system.grid,
  system.list
);

export const sharedStates = system.states({
  fit: {
    width: 1,
    height: 1,
  },
  context: {
    position: 'relative',
    zIndex: 1,
  },
  'no-select': {
    WebkitTouchCallout: 'none',
    userSelect: 'none',
  },
});

export const flexStates = system.states({
  inline: {
    display: 'inline-flex',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});

export const gridStates = system.states({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fitContent: {
    gridTemplate: 'minmax(0, 1fr) / minmax(0, 1fr)',
  },
});

export interface BoxProps
  extends StyleProps<typeof boxProps>,
    StyleProps<typeof sharedStates>,
    WithChildrenProp,
    OptionalScrollProps {}

export interface FlexBoxProps extends BoxProps, StyleProps<typeof flexStates> {}
export interface GridBoxProps extends BoxProps, StyleProps<typeof gridStates> {}
