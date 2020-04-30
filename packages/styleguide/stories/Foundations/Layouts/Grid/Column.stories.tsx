import React from 'react';
import { select } from '@storybook/addon-knobs';
import {
  LayoutGrid,
  Column,
  ColumnSizes,
  OffsetColumnSizes,
} from '@codecademy/gamut/src';

import {
  decoratedStories,
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../../../Templating';
import { Box, Container } from '../Elements';

export default decoratedStories('Foundations', 'Layouts', 'Grid', Column);

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
        <LayoutGrid columnGap="sm" rowGap="sm">
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
  const sizes = new Array(12).fill('').map((x, i) => i + 1);

  const columnSizes = sizes as ColumnSizes[];
  const offsetColumnSizes = [0, ...sizes] as OffsetColumnSizes[];

  const size = select('Size', columnSizes, columnSizes[1]);
  const offset = select('Offset', offsetColumnSizes, offsetColumnSizes[0]);

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        Columns may be offset from the left by numbers within the [0-12] scale.
        As with column and row gaps, those numbers may be static or responsive.
      </StoryDescription>
      <Container>
        <LayoutGrid rowGap="sm" columnGap="sm">
          <Column offset={offset} size={size}>
            <Box>I am a column</Box>
          </Column>
        </LayoutGrid>
      </Container>
    </StoryTemplate>
  );
});

export const offsets = decoratedStory(() => {
  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        Columns may be offset from the left by numbers within the [0-12] scale.
        As with column and row gaps, those numbers may be static or responsive.
      </StoryDescription>
      <Container>
        <LayoutGrid rowGap="sm" columnGap="sm">
          <Column offset={2} size={4}>
            <Box>2 Column offset</Box>
          </Column>
          <Column size={2}>
            <Box />
          </Column>
          <Column size={2}>
            <Box />
          </Column>
          <Column size={4}>
            <Box>No offset</Box>
          </Column>
          <Column size={8}>
            <Box />
          </Column>
          <Column offset={{ xs: 6, md: 4, lg: 2 }} size={6}>
            <Box>sm: 6, md: 4, lg: 2</Box>
          </Column>
          <Column offset={{ xs: 0, md: 4 }} size={6}>
            <Box>no offset sm, md: 4</Box>
          </Column>
        </LayoutGrid>
      </Container>
    </StoryTemplate>
  );
});
