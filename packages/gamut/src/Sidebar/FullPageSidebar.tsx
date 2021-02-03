import { IconButton } from '@codecademy/gamut/src';
import { SidebarTabButton } from './SidebarTabButton';
import { CloseIcon } from '@codecademy/gamut-icons/src';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import { SidebarBaseProps, SidebarWrapperProps } from './shared';
import styled from '@emotion/styled';

export type SidebarFullPageProps = SidebarBaseProps & {
  button: React.ReactNode;
};

//Drawer component
const Drawer = styled(motion.div)<SidebarWrapperProps>`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: grey;
  width: ${(props) => `${props.openWidth}rem`};
`;

const transitionDuration = 0.35;

export const Sidebar: React.FC<SidebarFullPageProps> = ({
  children,
  button,
  expanded = false,
  openFrom = 'right',
  openWidth = 30,
  testId,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);

  const xExitValue = openFrom === 'left' ? 700 : -1000;
  const xAnimationValue = openFrom === 'left' ? 0 : -504;

  return (
    <>
      <SidebarTabButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        data-testid="arrow-sidebar-button"
      >
        {button}
      </SidebarTabButton>
      <AnimatePresence>
        {isSidebarOpen ? (
          <Drawer
            aria-expanded={isSidebarOpen}
            initial={{ x: xExitValue }}
            animate={{ x: xAnimationValue }}
            exit={{ x: xExitValue }}
            transition={{ duration: transitionDuration }}
            openWidth={openWidth}
            data-testid={testId}
          >
            <IconButton icon={CloseIcon} onClick={() => toggleDrawer()} />
            {children}
          </Drawer>
        ) : null}
      </AnimatePresence>
    </>
  );
};
