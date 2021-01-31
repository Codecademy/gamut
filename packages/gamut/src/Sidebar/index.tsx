import { Container, SidebarButton, IconButton } from '@codecademy/gamut/src';
import { CloseIcon } from '@codecademy/gamut-icons/src';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import styled from '@emotion/styled';

export type SidebarProps = {
  children: React.ReactNode;
  expanded: boolean;
  overlay: boolean;
  button?: React.ReactNode;
  testId?: string;
};

//Overlay component
const Overlay = styled(motion.div)`
  height: 100vh;
  width: 20rem;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: grey;
`;

//In-space component
const SidebarWrapper = styled(Container)`
  height: 100%;
  position: relative;
  width: 25rem;
`;

const SidebarContent = styled(motion.div)`
  background-color: aliceblue;
  max-width: 25rem;
  overflow: hidden;
`;

const transitionDuration = 0.35;

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  button,
  expanded = false,
  overlay,
  testId,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);

  const variants = {
    expanded: { width: '25rem' },
    folded: { width: 0 },
  };

  return overlay ? (
    <>
      <SidebarButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        data-testid="arrow-sidebar-button"
      >
        {button}
      </SidebarButton>
      <AnimatePresence>
        {isSidebarOpen ? (
          <Overlay
            aria-expanded={isSidebarOpen}
            initial={{ x: 700 }}
            animate={{ x: 0 }}
            exit={{ x: 700 }}
            transition={{ duration: 0.35 }}
            data-testid={testId}
          >
            <IconButton icon={CloseIcon} onClick={() => toggleDrawer()} />
            {children}
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  ) : (
    <SidebarWrapper>
      <SidebarContent
        aria-expanded={isSidebarOpen}
        initial={false}
        animate={isSidebarOpen ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        data-testid={testId}
      >
        {children}
      </SidebarContent>
      <SidebarButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        key={'navy'}
        tab
        data-testid="arrow-sidebar-button"
      />
    </SidebarWrapper>
  );
};
