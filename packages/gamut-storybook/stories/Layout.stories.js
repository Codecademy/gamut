import React from 'react';
import { LayoutGrid, Column } from 'gamut';

export default {
  component: LayoutGrid,
  title: 'Layout/LayoutGrid',
};

const Container = ({ children }) => {
  return <div style={{ width: '800px', maxWidth: '100%' }}>{children}</div>;
};

const Test = ({ color, children }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: 'white',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

const KitchenSinkColumns = ({ alt }) => (
  <>
    <Column size={{ sm: 12 }}>
      <Test color="grey">12</Test>
    </Column>
    <Column size={{ sm: 6 }}>
      <Test color="grey">6</Test>
    </Column>
    <Column size={{ sm: 6 }}>
      <Test color="grey">6</Test>
    </Column>
    <Column size={{ sm: 3 }}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={{ sm: 3 }}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={{ sm: 3 }}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={{ sm: 3 }}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={{ sm: 2 }}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={{ sm: 2 }}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={{ sm: 2 }}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={{ sm: 2 }}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={{ sm: 2 }}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={{ sm: 2 }}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={{ sm: 1 }}>
      <Test color="grey">1</Test>
    </Column>
  </>
);

export const responsiveGridGap = () => {
  return (
    <Container>
      <LayoutGrid
        columnGap={{ sm: 'sm', md: 'md', lg: 'lg' }}
        rowGap={{ sm: 'sm', md: 'md', lg: 'lg' }}
      >
        <KitchenSinkColumns />
      </LayoutGrid>
    </Container>
  );
};

responsiveGridGap.story = {
  name: 'Responsive Gap',
};

export const smallGap = () => {
  return (
    <Container>
      <LayoutGrid columnGap={{ sm: 'sm' }} rowGap={{ sm: 'sm' }}>
        <KitchenSinkColumns />
      </LayoutGrid>
    </Container>
  );
};

smallGap.story = {
  name: 'Small Gap',
};

export const mediumGap = () => {
  return (
    <Container>
      <LayoutGrid columnGap={{ sm: 'md' }} rowGap={{ sm: 'md' }}>
        <KitchenSinkColumns />
      </LayoutGrid>
    </Container>
  );
};

mediumGap.story = {
  name: 'Medium Gap',
};

export const largeGap = () => {
  return (
    <Container>
      <LayoutGrid columnGap={{ sm: 'lg' }} rowGap={{ sm: 'lg' }}>
        <KitchenSinkColumns />
      </LayoutGrid>
    </Container>
  );
};

largeGap.story = {
  name: 'Large Gap',
};

export const extraLargeGap = () => {
  return (
    <Container>
      <LayoutGrid columnGap={{ sm: 'xl' }} rowGap={{ sm: 'xl' }}>
        <KitchenSinkColumns />
      </LayoutGrid>{' '}
    </Container>
  );
};

extraLargeGap.story = {
  name: 'X-Large Gap',
};

export const noGap = () => {
  return (
    <Container>
      <LayoutGrid>
        <KitchenSinkColumns alt />
      </LayoutGrid>
    </Container>
  );
};

noGap.story = {
  name: 'No Gap',
};
