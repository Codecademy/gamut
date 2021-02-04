import { FlexBox } from '@codecademy/gamut/src';
import { SidebarButton } from './SidebarButton';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import styled from '@emotion/styled';

import {
  SidebarBaseProps,
  SidebarWrapperProps,
  SidebarWidthProps,
  transitionDuration,
} from './shared';

//In-space component
const SidebarWrapper = styled(FlexBox)<SidebarWrapperProps>`
  height: 100%;
  position: relative;
  width: ${(props) => `${props.openWidth}rem`};
`;

const SidebarContent = styled(motion.div)<SidebarWidthProps>`
  background-color: aliceblue;
  overflow: hidden;
  width: ${(props) => `${props.openWidth}rem`};
`;

export const SidebarBox: React.FC<SidebarBaseProps> = ({
  children,
  expanded = false,
  openFrom = 'left',
  openWidth = 30,
  testId,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);
  const width = `${openWidth}rem`;

  const variants = {
    expanded: { width: width },
    folded: { width: 0 },
  };

  return (
    <SidebarWrapper openWidth={openWidth} openFrom={openFrom}>
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
