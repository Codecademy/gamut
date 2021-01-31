import { Container, SidebarButton, IconButton } from '@codecademy/gamut/src';
import { CloseIcon } from '@codecademy/gamut-icons/src';
import { AnimatePresence, motion } from 'framer-motion';
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
          <motion.div
            aria-expanded={isSidebarOpen}
            className={s.overlay}
            initial={{ x: 700 }}
            animate={{ x: 0 }}
            exit={{ x: 700 }}
            transition={{ duration: 0.35 }}
            data-testid={testId}
          >
            <IconButton icon={CloseIcon} onClick={() => toggleDrawer()} />
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
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
