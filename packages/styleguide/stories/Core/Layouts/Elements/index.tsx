import React from 'react';
import { Item } from '@codecademy/gamut/src';
import { colors } from '@codecademy/gamut-styles/utils/variables';

export const Box: React.FC = ({ children }) => (
  <Item
    style={{
      padding: '5px',
      minHeight: '30px',
      marginBottom: '0.5rem',
      backgroundColor: colors.blue[500],
      color: colors.white,
    }}
    flex
    alignSelf="stretch"
  >
    {children}
  </Item>
);

export const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: colors.blue[100],
  },
};
