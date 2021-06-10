import { BodyPortal, FocusTrap, IconButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback } from 'react';

import { SidebarCloneButton } from './SidebarCloneButton';

export const transitionDuration = 0.35;

const flyoutStyles = variance.compose(
  system.background,
  system.border,
  system.color,
  system.flex,
  system.grid,
  system.layout,
  system.positioning
);

const flyoutOpenVariants = variant({
  defaultVariant: 'left',
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

export type FlyoutStyles = StyleProps<typeof flyoutStyles> &
  StyleProps<typeof flyoutOpenVariants>;
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
   * callback fired to open and close the flyout
   */
  onToggle: () => void;
  /**
   * data-testid for the components
   */
  testId?: string;
  /**
   * width of the open drawer in rem
   */
  openWidth?: number;
  /**
   * toggles the Flyout
   */
  button: React.ReactNode;
  /**
   * Whether clicking on the screen outside of the container should close the Flyout
   */
  clickOutsideDoesNotClose?: boolean;
  /**
   * Whether clicking the escape key should close the Flyout
   */
  escapeDoesNotClose?: boolean;
};

export const Flyout: React.FC<FlyoutProps> = ({
  children,
  button,
  expanded,
  onToggle,
  openFrom = 'left',
  openWidth = 30,
  testId,
  clickOutsideDoesNotClose,
  escapeDoesNotClose,
  ...styleProps
}) => {
  const initialX = openFrom === 'left' ? -1000 : 1000;

  const handleOutsideClick = useCallback(() => {
    !clickOutsideDoesNotClose && onToggle();
  }, [clickOutsideDoesNotClose, onToggle]);

  const handleEscapeKey = useCallback(() => {
    !escapeDoesNotClose && onToggle();
  }, [escapeDoesNotClose, onToggle]);

  return (
    <>
      <AnimatePresence>
        {expanded ? (
          <BodyPortal>
            <FocusTrap
              onClickOutside={handleOutsideClick}
              onEscapeKey={handleEscapeKey}
            >
              <DrawerBase
                aria-expanded={expanded}
                initial={{ x: initialX }}
                animate={{ x: 0 }}
                exit={{ x: initialX }}
                transition={{ duration: transitionDuration }}
                data-testid={testId}
                width={{ _: '75%', sm: `${openWidth}rem` }}
                maxWidth={`${openWidth}rem`}
                openFrom={openFrom}
                position="fixed"
                height="100vh"
                top="0"
                {...styleProps}
              >
                <IconButton
                  icon={MiniDeleteIcon}
                  onClick={onToggle}
                  position="absolute"
                  right="0"
                />
                {children}
              </DrawerBase>
            </FocusTrap>
          </BodyPortal>
        ) : null}
      </AnimatePresence>
      <SidebarCloneButton onClick={onToggle} data-testid="arrow-sidebar-button">
        {button}
      </SidebarCloneButton>
    </>
  );
};
