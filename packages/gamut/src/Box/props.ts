import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

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
  system.grid
);

export const sharedStates = system.states({
  fit: {
    width: 1,
    height: 1,
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

type BoxStyleProps = StyleProps<typeof boxProps>;
type BoxStates = StyleProps<typeof sharedStates>;
type FlexStates = StyleProps<typeof flexStates>;
type GridStates = StyleProps<typeof gridStates>;

export interface BoxProps
  extends Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      keyof BoxStyleProps
    >,
    BoxStyleProps,
    BoxStates {}

export interface FlexBoxProps
  extends Omit<BoxProps, keyof FlexStates>,
    FlexStates {}
export interface GridBoxProps
  extends Omit<BoxProps, keyof GridStates>,
    GridStates {}
