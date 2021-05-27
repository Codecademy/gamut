import { BodyPortal, FocusTrap, IconButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
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
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';

import { SidebarCloneButton } from './SidebarCloneButton';

export const transitionDuration = 0.35;

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

export type FlyoutProps = FlyoutStyleProps & {
  /**
   * if the drawer should be open or closed
   */
  expanded?: boolean;
  /**
   * data-testid for the components
   */
  testId?: string;
  /**
   * width of the open drawer in rem
   */
  openWidth?: number;
  /**
   * chooses color of drop shadow
   */
  button: React.ReactNode;
  /**
   * Whether clicking on the screen outside of the container should close the Flyout
   */
  clickOutsideCloses?: boolean;
  /**
   * Whether clicking the escape key should close the Flyout
   */
  escapeCloses?: boolean;
};

export const Flyout: React.FC<FlyoutProps> = ({
  children,
  button,
  expanded = false,
  openFrom = 'left',
  openWidth = 30,
  testId,
  clickOutsideCloses = true,
  escapeCloses = true,
  ...styleProps
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = useCallback(() => setSidebarOpen(!isSidebarOpen), [
    isSidebarOpen,
  ]);
  const initialX = openFrom === 'left' ? -1000 : 1000;

  const handleOutsideClick = useCallback(() => {
    clickOutsideCloses && toggleDrawer();
  }, [clickOutsideCloses, toggleDrawer]);

  const handleEscapeKey = useCallback(() => {
    escapeCloses && toggleDrawer();
  }, [escapeCloses, toggleDrawer]);

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen ? (
          <BodyPortal>
            <FocusTrap
              onClickOutside={handleOutsideClick}
              onEscapeKey={handleEscapeKey}
            >
              <DrawerBase
                aria-expanded={isSidebarOpen}
                initial={{ x: initialX }}
                animate={{ x: 0 }}
                exit={{ x: initialX }}
                transition={{ duration: transitionDuration }}
                data-testid={testId}
                width={`${openWidth}rem`}
                openFrom={openFrom}
                position="fixed"
                height="100vh"
                top="0"
                {...styleProps}
              >
                <IconButton
                  icon={MiniDeleteIcon}
                  onClick={toggleDrawer}
                  position="absolute"
                  right="0"
                />
                {children}
              </DrawerBase>
            </FocusTrap>
          </BodyPortal>
        ) : null}
      </AnimatePresence>
      <SidebarCloneButton
        onClick={toggleDrawer}
        data-testid="arrow-sidebar-button"
      >
        {button}
      </SidebarCloneButton>
    </>
  );
};
