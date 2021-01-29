import { Container } from '@codecademy/gamut/src';
import { motion } from 'framer-motion';
import React from 'react';

import s from './styles.scss';

export type SidebarProps = {
  children: React.ReactNode;
  expanded: boolean;
  button: React.ReactNode;
  testId?: string;
};

const transitionDuration = 0.35;

const variants = {
  expanded: { width: '33rem' },
  folded: { width: 0 },
};

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  expanded,
  button,
  testId,
}) => {
  return (
    <Container className={s.kanbanSidebarWrapper}>
      <motion.div
        aria-expanded={expanded}
        className={s.kanbanSidebarContainer}
        initial={false}
        animate={expanded ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        data-testid={testId}
      >
        {children}
      </motion.div>
      {button}
    </Container>
  );
};
