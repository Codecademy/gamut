import { Box, TextButton } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { TabProps } from './types';

const TabButton = styled(TextButton)<Pick<TabProps, 'isActiveTab'>>`
  border: 0;
  border-bottom: ${({ theme, isActiveTab }) =>
    `0.1875rem ${isActiveTab ? theme.colors.primary : 'transparent'} solid`};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  font-weight: ${({ theme, isActiveTab }) =>
    isActiveTab ? theme.fontWeight[700] : theme.fontWeight[400]};
  font-size: ${({ theme }) => theme.fontSize[18]};
  text-overflow: ellipsis;
`;

export const Tab: React.FC<TabProps> = ({
  title,
  isActiveTab,
  disabled,
  onClick,
  tabSize,
}) => (
  <Box borderBottom={1} borderColor={isActiveTab ? 'primary' : 'text-disabled'}>
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
    >
      {title}
    </TabButton>
  </Box>
);
