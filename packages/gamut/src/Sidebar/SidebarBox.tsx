import { FlexBox } from '@codecademy/gamut/src';
import { SidebarButton } from './SidebarButton';
import React, { useState } from 'react';

import styled from '@emotion/styled';

import {
  DrawerBase,
  SidebarBaseProps,
  SidebarWrapperProps,
  SidebarWidthProps,
  transitionDuration,
} from './shared';

const SidebarWrapper = styled(FlexBox)<SidebarWrapperProps>`
  height: 100%;
  position: relative;
  margin-right: ${({ theme }) => theme.spacing[8]};
  width: ${(props) => `${props.openWidth}rem`};
`;

const SidebarContent = styled(DrawerBase)<SidebarWidthProps>`
  overflow: hidden;
  width: ${(props) => `${props.openWidth}rem`};
`;

export const SidebarBox: React.FC<SidebarBaseProps> = ({
  children,
  expanded = false,
  openFrom = 'left',
  openWidth = 30,
  testId,
  ...styleProps
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
        {...styleProps}
      >
        {children}
      </SidebarContent>
      <SidebarButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        tab
        data-testid="arrow-sidebar-button"
      />
    </SidebarWrapper>
  );
};
