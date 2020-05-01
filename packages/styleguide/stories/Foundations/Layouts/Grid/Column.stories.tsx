import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import {
  LayoutGrid,
  Column,
  ColumnSizes,
  OffsetColumnSizes,
} from '@codecademy/gamut/src';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../../../Templating';
import { Content, Container } from './Elements';

export default {
  title: 'Gamut|Foundations/Layouts/Grid/Column',
  component: Column,
  decorators: [withKnobs],
};

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
    </StoryTemplate>
  );
});

export const editable = decoratedStory(() => {
  const sizes = new Array(12).fill('').map((x, i) => i + 1);

  const columnSizes = sizes as ColumnSizes[];
  const offsetColumnSizes = [0, ...sizes] as OffsetColumnSizes[];

  const size = select('Size', columnSizes, columnSizes[1]);
  const offset = select('Row Gap', offsetColumnSizes, offsetColumnSizes[0]);

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        Columns may be offset from the left by numbers within the [0-12] scale.
        As with column and row gaps, those numbers may be static or responsive.
      </StoryDescription>
      <Container>
        <LayoutGrid rowGap="sm" columnGap="sm">
          <Column offset={offset} size={size}>
            <Content>I am a column</Content>
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
          <Column size={8}>
            <Content />
          </Column>
          <Column offset={{ xs: 6, md: 4, lg: 2 }} size={6}>
            <Content>sm: 6, md: 4, lg: 2</Content>
          </Column>
          <Column offset={{ xs: 0, md: 4 }} size={6}>
            <Content>no offset sm, md: 4</Content>
          </Column>
        </LayoutGrid>
      </Container>
    </StoryTemplate>
  );
});
