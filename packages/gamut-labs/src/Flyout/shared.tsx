import {
  background,
  border,
  color,
  flex,
  grid,
  layout,
  positioning,
  variant,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const flyoutStyles = compose(
  background,
  border,
  color,
  flex,
  grid,
  layout,
  positioning
);

const flyoutOpenVariants = variant({
  default: 'left',
  prop: 'openFrom',
  variants: {
    left: {
      right: 'auto',
      left: 0,
    },
    right: {
      right: 0,
      left: 'auto',
    },
  },
});

export type FlyoutStyles = HandlerProps<typeof flyoutStyles> &
  HandlerProps<typeof flyoutOpenVariants>;
export interface FlyoutStyleProps extends FlyoutStyles {}

export const DrawerBase = styled(motion.div)<FlyoutStyleProps>(
  flyoutStyles,
  flyoutOpenVariants
);

export type FlyoutWidthProps = {
  /**
   * width of the open drawer in rem
   */
  openWidth?: number;
};

export type FlyoutBaseProps = FlyoutWidthProps &
  FlyoutStyleProps & {
    /**
     * if the drawer should be open or closed
     */
    expanded?: boolean;
    /**
     * data-testid for the components
     */
    testId?: string;
  };

export type FlyoutWrapperProps = FlyoutWidthProps & FlyoutStyleProps;

export const transitionDuration = 0.35;
