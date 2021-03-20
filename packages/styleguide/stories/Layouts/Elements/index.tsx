import { Box } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles/src';
import React from 'react';

export const ExampleBox: React.FC = ({ children }) => (
  <Box
    padding={8}
    minHeight="30px"
    marginBottom={8}
    backgroundColor="blue"
    textColor="white"
    display="flex"
  >
    {children}
  </Box>
);

export const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: colors.paleBlue,
  },
};
