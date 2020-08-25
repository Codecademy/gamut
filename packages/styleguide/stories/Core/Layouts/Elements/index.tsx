import React from 'react';
import { Flex } from '@codecademy/gamut-labs/src';
import { standardColors, colors } from '@codecademy/gamut-styles';

export const Box: React.FC = ({ children, ...rest }) => (
  <Flex
    style={{
      padding: '5px',
      minHeight: '30px',
      marginBottom: '0.5rem',
      backgroundColor: standardColors.blue,
      outline: `1px solid ${standardColors.navy}`,
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
