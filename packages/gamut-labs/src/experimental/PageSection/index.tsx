import { Box, FlexBox, TextButtonProps } from '@codecademy/gamut';
import React from 'react';

export type PageSectionProps = {
  title: string;
  headerButton?: TextButtonProps;
  headerSecondaryButton?: TextButtonProps;
  footerButton?: TextButtonProps;
};

export const PageSection: React.FC<PageSectionProps> = ({
  title,
  children,
}) => {
  return (
    <FlexBox flexDirection="column">
      <Box as="h5" color="navy" paddingBottom={4}>
        {title}
      </Box>
      {children}
    </FlexBox>
  );
};
