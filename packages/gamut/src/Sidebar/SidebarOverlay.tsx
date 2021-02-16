import { IconButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import {
  DrawerBase,
  SidebarBaseProps,
  SidebarWrapperProps,
  transitionDuration,
} from './shared';
import { SidebarCloneButton } from './SidebarCloneButton';

export type SidebarOverlayProps = SidebarBaseProps & {
  /**
   * chooses color of drop shadow
   */
  button: React.ReactNode;
};

const sidebarOverlayOpenFromProps = variant({
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

const Drawer = styled(DrawerBase)<SidebarWrapperProps>`
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 2;
  width: ${(props) => `${props.openWidth}rem`};
  ${sidebarOverlayOpenFromProps};
`;

export const SidebarOverlay: React.FC<SidebarOverlayProps> = ({
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
            <IconButton icon={MiniDeleteIcon} onClick={() => toggleDrawer()} />
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
