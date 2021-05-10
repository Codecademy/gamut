import {
  background,
  border,
  color,
  flex,
  grid,
  layout,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const flyoutStyles = compose(background, border, color, flex, grid, layout);

export type FlyoutStyles = HandlerProps<typeof flyoutStyles>;
export interface FlyoutStyleProps extends FlyoutStyles {}

export const DrawerBase = styled(motion.div)<FlyoutStyleProps>(flyoutStyles);

export type FlyoutWidthProps = {
  /**
   * width of the open drawer
   */
  openWidth?: number;
};

export type FlyoutComponentSideProps = {
  openFrom?: 'left' | 'right';
};

export type FlyoutBaseProps = FlyoutWidthProps &
  FlyoutComponentSideProps &
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

export type FlyoutWrapperProps = FlyoutWidthProps &
  FlyoutComponentSideProps &
  FlyoutStyleProps;

export const transitionDuration = 0.35;
