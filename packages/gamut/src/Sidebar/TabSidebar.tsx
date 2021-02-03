import { Container } from '@codecademy/gamut/src';
import { SidebarTabButton } from './SidebarTabButton';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import styled from '@emotion/styled';

import { SidebarBaseProps, SidebarWrapperProps } from './shared';

//In-space component
const SidebarWrapper = styled(Container)<SidebarWrapperProps>`
  height: 100%;
  position: relative;
  width: ${(props) => `${props.openWidth}rem`};
`;

const SidebarContent = styled(motion.div)<SidebarWrapperProps>`
  background-color: aliceblue;
  overflow: hidden;
  width: ${(props) => `${props.openWidth}rem`};
`;

const transitionDuration = 0.35;

export const SidebarTab: React.FC<SidebarBaseProps> = ({
  children,
  expanded = false,
  openFrom = 'right',
  openWidth = 30,
  testId,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);

  const variants = {
    expanded: { width: '25rem' },
    folded: { width: 0 },
  };

  const xExitValue = openFrom === 'left' ? 700 : -1000;
  const xAnimationValue = openFrom === 'left' ? 0 : -504;

  return (
    <SidebarWrapper openWidth={openWidth}>
      <SidebarContent
        aria-expanded={isSidebarOpen}
        initial={false}
        animate={isSidebarOpen ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        openWidth={openWidth}
        data-testid={testId}
      >
        {children}
      </SidebarContent>
      <SidebarTabButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        key={'navy'}
        tab
        data-testid="arrow-sidebar-button"
      />
    </SidebarWrapper>
  );
};
