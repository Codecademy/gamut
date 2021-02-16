import { Box, FlexBox } from '@codecademy/gamut';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import {
  DrawerBase,
  SidebarBaseProps,
  SidebarComponentSideProps,
  SidebarWidthProps,
  transitionDuration,
} from './shared';
import { SidebarTabButton } from './SidebarTabButton';

const sidebarBoxOpenFromProps = variant({
  default: 'left',
  prop: 'openFrom',
  variants: {
    left: {
      marginRight: 48,
      marginLeft: 0,
    },
    right: {
      marginRight: 0,
      marginLeft: 48,
    },
  },
});

const SidebarWrapper = styled(FlexBox)<SidebarComponentSideProps>`
  ${sidebarBoxOpenFromProps};
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
  backgroundColor = 'palePink',
  ...styleProps
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(expanded);
  const toggleDrawer = () => setSidebarOpen(!isSidebarOpen);
  const width = `${openWidth}rem`;

  const variants = {
    expanded: { width },
    hidden: { width: 0 },
  };

  return (
    <SidebarWrapper
      position="relative"
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
    </SidebarWrapper>
  );
};
