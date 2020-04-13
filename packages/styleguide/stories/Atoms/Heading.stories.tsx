import React from 'react';

import {
  FontSizes,
  HeadingTags,
  LayoutGrid,
  Column,
} from '@codecademy/gamut/src';

import { Heading } from '../../../gamut/src/Typography/Heading';
import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStory('Atoms', Heading);

const tags: HeadingTags[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const sizes: FontSizes[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'];

export const heading = () => (
  <LayoutGrid>
    <Column size={12}>
      <StoryTemplate status={StoryStatus.InProgress}>
        <StoryDescription>
          <p>
            This is a single primitive to handle all <strong>h1-h6</strong> tags
            with defined size intervals to allow for semantic html that also
            matches the designs.
          </p>
          <p>
            Note: Please only{' '}
            <a
              href="https://dequeuniversity.com/rules/axe/3.0/heading-order"
              target="_blank"
              rel="noopener noreferrer"
            >
              increase heading levels by 1
            </a>{' '}
            (and picking the appropriate size to match the design).
          </p>
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
