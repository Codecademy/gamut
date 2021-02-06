import { Box, FlexBox } from '@codecademy/gamut/src';
import { SidebarTabButton } from './SidebarTabButton';
import React, { useState } from 'react';

import styled from '@emotion/styled';

import {
  DrawerBase,
  SidebarBaseProps,
  SidebarWidthProps,
  transitionDuration,
} from './shared';

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
  backgroundColor = 'palePink',
  ...styleProps
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);
  const width = `${openWidth}rem`;

  const variants = {
    expanded: { width: width },
    hidden: { width: 0 },
  };

  return (
    <FlexBox
      position="relative"
      marginRight={openFrom === 'left' ? 48 : 0}
      marginLeft={openFrom === 'right' ? 48 : 0}
      width="fit-content"
      backgroundColor={backgroundColor}
      {...styleProps}
    >
      <SidebarTabButton
        expanded={isSidebarOpen}
        onClick={() => toggleDrawer()}
        data-testid="arrow-sidebar-button"
        openFrom={openFrom}
      />
      <SidebarContent
        aria-expanded={isSidebarOpen}
        initial={false}
        animate={isSidebarOpen ? 'expanded' : 'hidden'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        openWidth={openWidth}
        data-testid={testId}
        overflowX="hidden"
      >
        <Box width={width}>{children}</Box>
      </SidebarContent>
    </FlexBox>
  );
};
