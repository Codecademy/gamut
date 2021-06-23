import { Box, TextButton } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { TabProps } from './types';

type TabButtonProps = Pick<TabProps, 'isActiveTab' | 'activeTabColor'>;

const TabButton = styled(TextButton)<TabButtonProps>`
  border: 0;
  border-bottom: ${({ theme, isActiveTab, activeTabColor }) =>
    `0.1875rem ${
      isActiveTab
        ? (activeTabColor && theme.colors[activeTabColor]) ||
          theme.colors.primary
        : 'transparent'
    } solid`};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  font-weight: ${({ theme, isActiveTab }) =>
    isActiveTab ? theme.fontWeight[700] : theme.fontWeight[400]};
  font-size: ${({ theme }) => theme.fontSize[18]};
  text-overflow: ellipsis;
  color: ${({ activeTabColor, isActiveTab, theme }) =>
    activeTabColor && isActiveTab && theme.colors[activeTabColor]};
`;

export const Tab: React.FC<TabProps> = ({
  title,
  isActiveTab,
  disabled,
  onClick,
  tabSize,
  activeTabColor,
}) => {
  return (
    <Box
      borderBottom={1}
      borderColor={isActiveTab ? activeTabColor || 'primary' : 'text-disabled'}
    >
      <TabButton
        variant={isActiveTab ? 'primary' : 'secondary'}
        onClick={onClick}
        disabled={disabled}
        role="tab"
        aria-selected={isActiveTab}
        width={tabSize}
        maxWidth={tabSize}
        isActiveTab={isActiveTab}
        pt={8}
        overflow="hidden"
        display="block"
        activeTabColor={activeTabColor}
      >
        {title}
      </TabButton>
    </Box>
  );
};
