import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';

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

const flexStates = system.states({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface BoxProps extends StyleProps<typeof boxProps> {}

export interface FlexBoxProps extends BoxProps {}

export interface GridBoxProps extends BoxProps {}
