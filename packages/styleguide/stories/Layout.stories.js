import React from 'react';
import { LayoutGrid, Column } from '../../gamut/src';
import gamut from '../../gamut-styles/utils/variables';

export default {
  component: LayoutGrid,
  title: 'Layout/LayoutGrid',
};

const Container = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1440px',
        padding: '25px',
        backgroundColor: gamut.deprecatedColors.swatches.ccBlue[100],
      }}
    >
      {children}
    </div>
  );
};

const Content = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: gamut.deprecatedColors.swatches.ccBlue[500],
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

const KitchenSinkColumns = () => (
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

export const responsiveGridGap = () => {
  return (
    <Container>
      <LayoutGrid
        columnGap={{ xs: 'sm', lg: 'lg' }}
        rowGap={{ xs: 'sm', lg: 'lg' }}
      >
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
        <Column size={2}>
          <Content>2</Content>
        </Column>
        <Column size={2}>
          <Content>2</Content>
        </Column>
        <Column size={2}>
          <Content>2</Content>
        </Column>
        <Column size={2}>
          <Content>2</Content>
        </Column>
        <Column size={2}>
          <Content>2</Content>
        </Column>
        <Column size={2}>
          <Content>2</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
        <Column size={1}>
          <Content>1</Content>
        </Column>
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
          <Content>2 Column offset</Content>
        </Column>
        <Column size={2}>
          <Content />
        </Column>
        <Column size={2}>
          <Content />
        </Column>
        <Column size={4}>
          <Content>No offset</Content>
        </Column>
        <Column size={4}>
          <Content />
        </Column>
      </LayoutGrid>
    </Container>
  );
};

offsets.story = {
  name: 'Column offsets',
};

export const optionalOffsetColumns = () => {
  return (
    <>
      <Container>
        <LayoutGrid rowGap="sm" columnGap="sm">
          <Column offset={{ xs: 6, md: 4, lg: 2 }} size={6}>
            <Content>sm: 6, md: 4, lg: 2</Content>
          </Column>
          <Column offset={{ xs: 0, md: 4 }} size={4}>
            <Content>no offset sm, md: 4</Content>
          </Column>
        </LayoutGrid>
      </Container>
    </>
  );
};

offsets.optionalOffsetColumns = {
  name: 'Optional offset columns',
};
