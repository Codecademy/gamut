import { LayoutGrid, Column } from '@codecademy/gamut/src';
import gamut from '@codecademy/gamut-styles/utils/variables';
import { select } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../../Templating';

export default decoratedStory('Foundations', 'Layouts', LayoutGrid);

const Container: React.FC = ({ children }) => {
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

const Content: React.FC = ({ children }) => {
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

export const layoutGrid = () => {
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
};

export const gaps = () => {
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
};

export const offsets = () => {
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
};
