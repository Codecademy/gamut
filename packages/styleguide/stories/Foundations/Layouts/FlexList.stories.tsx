import React from 'react';

import { List, ListRow, ListColumn } from '@codecademy/gamut/src';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
  decoratedStories,
} from '../../Templating';

export default decoratedStories('Foundations', 'Layouts', 'FlexList');

export const listBasics = decoratedStory(() => {
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
      <List bordered alternating>
        <ListRow>
          <ListColumn size="xs">xs</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="sm">sm</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="md">md</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="lg">lg</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="xl">xl</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="xxl">xxl</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="fill">fill</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="max">max</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="content">content</ListColumn>
        </ListRow>
      </List>
    </StoryTemplate>
  );
});

export const borderedList = decoratedStory(() => {
  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription></StoryDescription>
      <List bordered>
        <ListRow>
          <ListColumn size="md">Col</ListColumn>
          <ListColumn size="fill">Col</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="md">Col</ListColumn>
          <ListColumn size="fill">Col</ListColumn>
        </ListRow>
      </List>
    </StoryTemplate>
  );
});

export const alternatingList = decoratedStory(() => {
  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription></StoryDescription>
      <List alternating>
        <ListRow>
          <ListColumn size="md">Col</ListColumn>
          <ListColumn size="fill">Col</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="md">Col</ListColumn>
          <ListColumn size="fill">Col</ListColumn>
        </ListRow>
      </List>
    </StoryTemplate>
  );
});

export const gapList = decoratedStory(() => {
  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription></StoryDescription>
      <List gap>
        <ListRow>
          <ListColumn size="md">Col</ListColumn>
          <ListColumn size="fill">Col</ListColumn>
        </ListRow>
        <ListRow>
          <ListColumn size="md">Col</ListColumn>
          <ListColumn size="fill">Col</ListColumn>
        </ListRow>
      </List>
    </StoryTemplate>
  );
});
