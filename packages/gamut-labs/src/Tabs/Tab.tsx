import { Box, TextButton } from '@codecademy/gamut';
import React from 'react';

export type TabProps = {
  title: string;
  isActiveTab: boolean;
  disabled?: boolean;
  onClick: () => void;
};

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
