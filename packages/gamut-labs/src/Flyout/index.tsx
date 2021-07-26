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
  clickOutsideDoesNotClose,
  escapeDoesNotClose,
  closeFlyoutRef,
  ...styleProps
}) => {
  const initialX = openFrom === 'left' ? -1000 : 1000;

  const [isExpanded, setIsExpanded] = useState(!!initialExpanded);
  const toggleExpanded = useCallback(
    () => setIsExpanded((isExpanded) => !isExpanded),
    []
  );
  const closeFlyout = useCallback(() => {
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    // Passes the function up to any interested parent component
    if (closeFlyoutRef) {
      closeFlyoutRef.current = closeFlyout;
      return () => {
        closeFlyoutRef.current = () => {};
      };
    }
  }, [closeFlyoutRef, closeFlyout]);

  const handleOutsideClick = useCallback(() => {
    !clickOutsideDoesNotClose && closeFlyout();
  }, [clickOutsideDoesNotClose, closeFlyout]);

  const handleEscapeKey = useCallback(() => {
    !escapeDoesNotClose && closeFlyout();
  }, [escapeDoesNotClose, closeFlyout]);

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
                width={{ _: '75%', sm: `${openWidth}rem` }}
                maxWidth={`${openWidth}rem`}
                openFrom={openFrom}
                position="fixed"
                bottom="0"
                top="0"
                {...styleProps}
              >
                <IconButton
                  icon={MiniDeleteIcon}
                  onClick={toggleExpanded}
                  position="absolute"
                  top="0.5rem"
                  right="0.5rem"
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
