import { Container, SidebarButton } from '@codecademy/gamut/src';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import s from './styles.scss';

export type SidebarProps = {
  children: React.ReactNode;
  expanded: boolean;
  overlay: boolean;
  testId?: string;
};

const transitionDuration = 0.35;

export const Sidebar: React.FC<SidebarProps> = ({
  children,
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

  return (
    <Container
      className={overlay ? s.kanbanSidebarWrapper : s.kanbanSidebarWrapper}
    >
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
        data-testid="arrow-sidebar-button"
      />
    </Container>
  );
};
