import React from 'react';

import {
  Heading,
  FontSizes,
  HeadingTags,
  LayoutGrid,
  Column,
} from '@codecademy/gamut/src';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStory('Atoms', 'Heading');

const tags: HeadingTags[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const sizes: FontSizes[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'];

export const heading = () => (
  <LayoutGrid>
    <Column size={12}>
      <StoryTemplate status={StoryStatus.InProgress}>
        <StoryDescription>
          Do whatever you like with these badass new Headings
        </StoryDescription>
      </StoryTemplate>
    </Column>
    <Column size={12}>
      {sizes.map(size => {
        return (
          <Heading key={size} fontSize={size} as={tags[0]}>
            Heading {size}
          </Heading>
        );
      })}
    </Column>
  </LayoutGrid>
);
