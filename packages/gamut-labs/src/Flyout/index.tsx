import { BodyPortal, FocusTrap, IconButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

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

type FlyoutProps = FlyoutStyleProps & {
  /**
   * if the drawer should be open or closed
   */
  initialExpanded?: boolean;
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
  renderButton: (onClick: () => void) => React.ReactNode;
  /**
   * Whether clicking on the screen outside of the container should close the Flyout
   */
  clickOutsideDoesNotClose?: boolean;
  /**
   * Whether clicking the escape key should close the Flyout
   */
  escapeDoesNotClose?: boolean;

  /**
   * A means of the parent method to get a reference to the closeFlyout function
   */
  closeFlyoutRef?: React.MutableRefObject<Function>;
};

export const Flyout: React.FC<FlyoutProps> = ({
  children,
  renderButton,
  initialExpanded,
  openFrom = 'left',
  openWidth = 30,
  testId,
  clickOutsideDoesNotClose,
  escapeDoesNotClose,
  closeFlyoutRef,
  ...styleProps
}) => {
  const initialX = openFrom === 'left' ? -1000 : 1000;

  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const toggleExpanded = useCallback(
    () => setIsExpanded((isExpanded) => !isExpanded),
    []
  );

  useEffect(() => {
    // Passes the function up to any interested parent component
    if (closeFlyoutRef) {
      closeFlyoutRef.current = () => setIsExpanded(false);
      return () => {
        closeFlyoutRef.current = () => {};
      };
    }
  }, [closeFlyoutRef]);

  const handleOutsideClick = useCallback(() => {
    !clickOutsideDoesNotClose && toggleExpanded();
  }, [clickOutsideDoesNotClose, toggleExpanded]);

  const handleEscapeKey = useCallback(() => {
    !escapeDoesNotClose && toggleExpanded();
  }, [escapeDoesNotClose, toggleExpanded]);

  return (
    <>
      <AnimatePresence>
        {isExpanded ? (
          <BodyPortal>
            <FocusTrap
              onClickOutside={handleOutsideClick}
              onEscapeKey={handleEscapeKey}
            >
              <DrawerBase
                aria-expanded={isExpanded}
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
                  onClick={toggleExpanded}
                  position="absolute"
                  right="0"
                />
                {children}
              </DrawerBase>
            </FocusTrap>
          </BodyPortal>
        ) : null}
      </AnimatePresence>
      {renderButton(toggleExpanded)}
    </>
  );
};
