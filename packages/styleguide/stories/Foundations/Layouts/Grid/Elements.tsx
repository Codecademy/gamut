import React from 'react';
import gamut from '@codecademy/gamut-styles/utils/variables';
import { Column } from '@codecademy/gamut/src';

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

export const Content: React.FC = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: gamut.colors.blue[500],
        color: 'white',
        display: 'grid',
        padding: '5px 0',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

export const KitchenSinkColumns = () => (
  <>
    <Column size={12}>
      <Content>12</Content>
    </Column>
    <Column size={6}>
      <Content>6</Content>
    </Column>
    <Column size={6}>
      <Content>6</Content>
    </Column>
    <Column size={3}>
      <Content>3</Content>
    </Column>
    <Column size={3}>
      <Content>3</Content>
    </Column>
    <Column size={3}>
      <Content>3</Content>
    </Column>
    <Column size={3}>
      <Content>3</Content>
    </Column>
  </>
);
