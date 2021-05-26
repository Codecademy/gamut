import { IconButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import { DrawerBase, FlyoutBaseProps, transitionDuration } from './shared';
import { SidebarCloneButton } from './SidebarCloneButton';

export type FlyoutProps = FlyoutBaseProps & {
  /**
   * chooses color of drop shadow
   */
  button: React.ReactNode;
};

export const Flyout: React.FC<FlyoutProps> = ({
  children,
  button,
  expanded = false,
  openFrom = 'left',
  openWidth = 30,
  testId,
  ...styleProps
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);
  const initialX = openFrom === 'left' ? -1000 : 1000;

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen ? (
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
