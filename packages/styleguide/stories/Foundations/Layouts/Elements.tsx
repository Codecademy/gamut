import React from 'react';
import gamut from '@codecademy/gamut-styles/utils/variables';
import { Column, Text, Item } from '@codecademy/gamut/src';

export const Container: React.FC = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1440px',
        padding: '25px',
        backgroundColor: gamut.colors.blue[100],
      }}
    >
      {children}
    </div>
  );
};

export const Box: React.FC = ({ children }) => {
  return (
    <Item
      flex
      align="center"
      justify="center"
      style={{
        height: 30,
        marginBottom: '0.5rem',
        backgroundColor: gamut.colors.blue[500],
      }}
    >
      <Text style={{ color: gamut.colors.white }}>{children}</Text>
    </Item>
  );
};

export const KitchenSinkColumns = () => (
  <>
    <Column size={12}>
      <Box>12</Box>
    </Column>
    <Column size={6}>
      <Box>6</Box>
    </Column>
    <Column size={6}>
      <Box>6</Box>
    </Column>
    <Column size={3}>
      <Box>3</Box>
    </Column>
    <Column size={3}>
      <Box>3</Box>
    </Column>
    <Column size={3}>
      <Box>3</Box>
    </Column>
    <Column size={3}>
      <Box>3</Box>
    </Column>
  </>
);
