import { Box } from '@codecademy/gamut';
import React from 'react';

export type HeaderTabProps = {
  className?: string;
};

export const AppHeaderTab: React.FC<HeaderTabProps> = ({
  children,
  className,
}) => {
  return (
    <Box marginLeft={8} marginRight={8} className={className}>
      {children}
    </Box>
  );
};
