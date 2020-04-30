import React from 'react';
import { select } from '@storybook/addon-knobs';
import { LayoutGrid, Column } from '@codecademy/gamut/src';

import {
  decoratedStories,
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../../../Templating';
import { Box, Container } from '../Elements';

export default decoratedStories('Foundations', 'Layouts', 'Grid', LayoutGrid);

const KitchenSinkColumns = () => (
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

export const basics = decoratedStory(() => {
  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        A flexible grid that can support arbitrary rows of content, each of
        which snaps to assuming 12 "units" of width. Cells in the rows are
        stored as <code>&lt;Column&gt;</code>s that have a grid-specified gap
        between them.
        <br />
        Row and column gaps can be configured in a responsive way. For example,
        you might have a particular set of gaps at small viewports and bigger
        ones on large viewports.
      </StoryDescription>
      <Container>
        <LayoutGrid
          columnGap={{ xs: 'sm', lg: 'lg' }}
          rowGap={{ xs: 'sm', lg: 'lg' }}
        >
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
          <Column size={2}>
            <Box>2</Box>
          </Column>
          <Column size={2}>
            <Box>2</Box>
          </Column>
          <Column size={2}>
            <Box>2</Box>
          </Column>
          <Column size={2}>
            <Box>2</Box>
          </Column>
          <Column size={2}>
            <Box>2</Box>
          </Column>
          <Column size={2}>
            <Box>2</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
          <Column size={1}>
            <Box>1</Box>
          </Column>
        </LayoutGrid>
      </Container>
    </StoryTemplate>
  );
});

export const editable = decoratedStory(() => {
  const columnGap = select(
    'Column Gap',
    [undefined, 'sm', 'md', 'lg', 'xl'],
    'sm'
  );
  const rowGap = select('Row Gap', [undefined, 'sm', 'md', 'lg', 'xl'], 'sm');

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        You can specify both the <em>column</em> and <em>row</em> gap amounts
        manually to override the default responsive layout. They both default to
        0 if not specified.
      </StoryDescription>
      <Container>
        <LayoutGrid {...{ columnGap, rowGap }}>
          <KitchenSinkColumns />
        </LayoutGrid>
      </Container>
    </StoryTemplate>
  );
});
