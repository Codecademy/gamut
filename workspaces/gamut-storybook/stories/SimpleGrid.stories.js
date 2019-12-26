import React from 'react';
import { SimpleGrid } from 'gamut';
import gamut from 'gamut-styles/utils/variables';

export default {
  component: SimpleGrid,
  title: 'Component/SimpleGrid',
};

const Test = ({ color, children }) => {
  return (
    <div style={{ backgroundColor: color, padding: '15px', color: 'white' }}>
      {children}
    </div>
  );
};

export const gridTown = () => {
  return (
    <SimpleGrid ratio="1fr:2fr" repeat={false}>
      <Test color="grey" />
      <Test color="lightgrey" />
      <Test color="lightgrey" />
      <Test color="grey" />
    </SimpleGrid>
  );
};

gridTown.story = {
  name: '1:2 Ratio',
};

export const hardValues = () => (
  <SimpleGrid ratio="200px:1fr" repeat={false}>
    <Test color="grey" />
    <Test color="lightgrey" />
  </SimpleGrid>
);

hardValues.story = {
  name: '200px:auto',
};

export const simpleCard = () => (
  <SimpleGrid ratio="1fr:2fr" repeat={false} direction="row">
    <Test color="grey" />
    <Test color="lightgrey" />
  </SimpleGrid>
);

simpleCard.story = {
  name: 'Simple Card Composition',
};

export const complexCard = () => (
  <SimpleGrid ratio="2rem:auto:2rem" repeat={false}>
    <Test color="grey" />
    <SimpleGrid ratio="1fr:2fr:1fr" repeat={false} direction="row">
      <Test color="grey" />
      <Test color="lightgrey" />
      <Test color="grey" />
    </SimpleGrid>
    <Test color="grey" />
  </SimpleGrid>
);

complexCard.story = {
  name: 'Complex Card Composition',
};

export const cardGrid = () => (
  <SimpleGrid ratio="1fr:1fr:1fr:1fr" gap="lg" repeat={false}>
    {new Array(10).fill('').map((x, i) => {
      const blahKey = i + 'key';
      return (
        <SimpleGrid
          key={blahKey}
          direction="row"
          ratio="2rem:10rem"
          repeat={false}
        >
          <Test color="grey" />
          <Test color="lightgrey" />
        </SimpleGrid>
      );
    })}
  </SimpleGrid>
);

cardGrid.story = {
  name: 'Simple Card Grid',
};
