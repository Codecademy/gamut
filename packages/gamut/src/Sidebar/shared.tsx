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

const sidebarStyles = compose(background, border, color, flex, grid, layout);

export type SidebarStyles = HandlerProps<typeof sidebarStyles>;
export interface SidebarStyleProps extends SidebarStyles {}

export const DrawerBase = styled(motion.div)<SidebarStyleProps>(sidebarStyles);

export type SidebarWidthProps = {
  /**
   * chooses color of drop shadow
   */
  openWidth?: number;
};

export type SidebarComponentSideProps = {
  openFrom?: 'left' | 'right';
};

export type SidebarBaseProps = SidebarWidthProps &
  SidebarComponentSideProps &
  SidebarStyleProps & {
    /**
     * chooses color of testing
     */
    expanded?: boolean;
    /**
     * chooses color of drop shadow????
     */
    testId?: string;
  };

export type SidebarWrapperProps = SidebarWidthProps &
  SidebarComponentSideProps &
  SidebarStyleProps;

export const transitionDuration = 0.35;
