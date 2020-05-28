import React from 'react';
import { Item } from '@codecademy/gamut/src';
import { colors } from '@codecademy/gamut-styles';

export const Box = () => (
  <Item
    style={{
      height: 30,
      marginBottom: '0.5rem',
      backgroundColor: colors.blue[500],
    }}
  />
);

export const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: colors.blue[100],
  },
};
