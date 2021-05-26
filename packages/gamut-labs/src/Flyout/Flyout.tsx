import { IconButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import {
  DrawerBase,
  FlyoutBaseProps,
  FlyoutWrapperProps,
  transitionDuration,
} from './shared';
import { SidebarCloneButton } from './SidebarCloneButton';

export type FlyoutProps = FlyoutBaseProps & {
  /**
   * chooses color of drop shadow
   */
  button: React.ReactNode;
};

const FlyoutOpenFromProps = variant({
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

const Drawer = styled(DrawerBase)<FlyoutWrapperProps>`
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 15;
  width: ${(props) => `${props.openWidth}rem`};
  ${FlyoutOpenFromProps};
`;

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
          <Drawer
            aria-expanded={isSidebarOpen}
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ duration: transitionDuration }}
            data-testid={testId}
            openWidth={openWidth}
            openFrom={openFrom}
            {...styleProps}
          >
            <IconButton
              icon={MiniDeleteIcon}
              onClick={() => toggleDrawer()}
              position="absolute"
              right="0"
            />
            {children}
          </Drawer>
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
