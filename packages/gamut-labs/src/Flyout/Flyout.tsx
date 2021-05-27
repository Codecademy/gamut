import { BodyPortal, FocusTrap, IconButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useState } from 'react';

import { DrawerBase, FlyoutBaseProps, transitionDuration } from './shared';
import { SidebarCloneButton } from './SidebarCloneButton';

export type FlyoutProps = FlyoutBaseProps & {
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
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);
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
                zIndex={15}
                {...styleProps}
              >
                <IconButton
                  icon={MiniDeleteIcon}
                  onClick={() => toggleDrawer()}
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
        onClick={() => toggleDrawer()}
        data-testid="arrow-sidebar-button"
      >
        {button}
      </SidebarCloneButton>
    </>
  );
};
