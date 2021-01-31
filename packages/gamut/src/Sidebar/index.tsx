import { Container, SidebarButton } from '@codecademy/gamut/src';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import s from './styles.scss';

export type SidebarProps = {
  children: React.ReactNode;
  expanded: boolean;
  overlay: boolean;
  button?: React.ReactNode;
  testId?: string;
};

const transitionDuration = 0.35;

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  button,
  expanded,
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
    <Container className={s.overlay}>
      <SidebarButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        data-testid="arrow-sidebar-button"
      >
        {button}
      </SidebarButton>
      <motion.div
        aria-expanded={isSidebarOpen}
        className={s.kanbanSidebarContainer}
        initial={false}
        animate={isSidebarOpen ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        data-testid={testId}
      >
        {children}
      </motion.div>
    </Container>
  ) : (
    <Container className={s.kanbanSidebarWrapper}>
      <motion.div
        aria-expanded={isSidebarOpen}
        className={s.kanbanSidebarContainer}
        initial={false}
        animate={isSidebarOpen ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        data-testid={testId}
      >
        {children}
      </motion.div>
      <SidebarButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        key={'navy'}
        tab
        data-testid="arrow-sidebar-button"
      />
    </Container>
  );
};
