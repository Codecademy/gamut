import React from 'react';
import { LayoutGrid, Column } from '../../gamut-elements/src';

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

const KitchenSinkColumns = () => (
  <>
    <Column size={12}>
      <Test color="grey">12</Test>
    </Column>
    <Column size={6}>
      <Test color="grey">6</Test>
    </Column>
    <Column size={6}>
      <Test color="grey">6</Test>
    </Column>
    <Column size={3}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={3}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={3}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={3}>
      <Test color="grey">3</Test>
    </Column>
    <Column size={2}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={2}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={2}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={2}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={2}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={2}>
      <Test color="grey">2</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
      <Test color="grey">1</Test>
    </Column>
    <Column size={1}>
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
      <LayoutGrid columnGap="sm" rowGap="sm">
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
      <LayoutGrid columnGap="md" rowGap="md">
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
      <LayoutGrid columnGap="lg" rowGap="lg">
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
      <LayoutGrid columnGap="xl" rowGap="xl">
        <KitchenSinkColumns />
      </LayoutGrid>
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
        <KitchenSinkColumns />
      </LayoutGrid>
    </Container>
  );
};

noGap.story = {
  name: 'No Gap',
};

export const offsets = () => {
  return (
    <Container>
      <LayoutGrid rowGap="sm" columnGap="sm">
        <Column offset={2} size={4}>
          <Test color="grey">2 Column offset</Test>
        </Column>
        <Column size={2}>
          <Test color="grey" />
        </Column>
        <Column size={2}>
          <Test color="grey" />
        </Column>
        <Column size={4}>
          <Test color="grey">No offset</Test>
        </Column>
        <Column size={4}>
          <Test color="grey" />
        </Column>
      </LayoutGrid>
    </Container>
  );
};

offsets.story = {
  name: 'Column offsets',
};
