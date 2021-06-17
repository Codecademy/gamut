import { Box, TextButton } from '@codecademy/gamut';
import React from 'react';

import { TabProps } from './types';

export const Tab: React.FC<TabProps> = ({
  title,
  isActiveTab,
  disabled,
  onClick,
}) => (
  <Box>
    <TextButton
      variant={isActiveTab ? 'primary' : 'secondary'}
      onClick={onClick}
      disabled={disabled}
      role="tab"
      aria-selected={isActiveTab}
    >
      {title}
    </TextButton>
  </Box>
);
