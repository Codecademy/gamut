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

export const boxVariants = system.variant({
  variants: {
    fit: {
      width: 1,
      height: 1,
    },
  },
});

export interface BoxProps
  extends StyleProps<typeof boxProps>,
    StyleProps<typeof boxVariants> {}

export interface FlexBoxProps extends BoxProps {}

export interface GridBoxProps extends BoxProps {}
