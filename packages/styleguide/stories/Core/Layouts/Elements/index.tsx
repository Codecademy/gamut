import React from 'react';
import { Flex } from '@codecademy/gamut-labs/src';
import { colors } from '@codecademy/gamut-styles';

export const Box: React.FC = ({ children, ...rest }) => (
  <Flex
    style={{
      padding: '5px',
      minHeight: '30px',
      marginBottom: '0.5rem',
      backgroundColor: colors.blue[500],
      color: colors.white,
    }}
    alignSelf="stretch"
    {...rest}
  >
    {children}
  </Flex>
);

export const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: colors.blue[100],
  },
};
