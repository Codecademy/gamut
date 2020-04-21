import React from 'react';
import { colors } from '@codecademy/gamut-styles/utils/variables';
import {
  FontSizes,
  HeadingTags,
  LayoutGrid,
  Column,
  Text,
  Heading,
} from '@codecademy/gamut/src';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
  decoratedStories,
} from '../Templating';

export default decoratedStories('Foundations', 'Typography');

const headingTags: HeadingTags[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const headingSizes: FontSizes[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'];
const textTags: ('p' | 'span')[] = ['p', 'span'];
const textSizes: ('sm' | 'lg')[] = ['lg', 'sm'];

export const baseTypography = () => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Responsive Typography primitives for all your textual needs.
    </StoryDescription>
    <LayoutGrid rowGap="lg">
      <Column size={12}>
        <Heading as="h2" fontSize="lg">
          Headings
        </Heading>
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
        {headingSizes.map(size => (
          <Heading key={size} fontSize={size} as={headingTags[0]}>
            Heading {size}
          </Heading>
        ))}
      </Column>
      <Column size={12}>
        <Heading as="h2" fontSize="lg">
          Text
        </Heading>
        <p>
          This is a single primitive to handle all <strong>{'<p>'}</strong> and{' '}
          <strong>{'<span>'}</strong> tags with defined size intervals
        </p>
        {textSizes.map(size => (
          <React.Fragment key={size}>
            <Heading fontSize="md" as="h3">
              Size: {size}
            </Heading>
            <Text key={size} fontSize={size} as={textTags[0]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <br />
          </React.Fragment>
        ))}
      </Column>
    </LayoutGrid>
  </StoryTemplate>
);

export const colorCustomization = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Pass custom colors via a limited style prop
    </StoryDescription>
    <LayoutGrid>
      <Column size={12}>
        <Heading fontSize="md" as="h3" style={{ color: colors.royalBlue }}>
          Royal Blue
        </Heading>
        <Text as="p" style={{ color: colors.royalBlue }}>
          Royal Blue
        </Text>
      </Column>
    </LayoutGrid>
  </StoryTemplate>
));

export const collapsableMargin = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>Toggle margins</StoryDescription>
    <LayoutGrid rowGap="md">
      <Column size={12}>
        <Heading fontSize="md" as="h3">
          With Margin
        </Heading>
        <Text as="p">I am body text</Text>
      </Column>
      <Column size={12}>
        <Heading fontSize="md" as="h3" hideMargin>
          Sans margin
        </Heading>
        <Text as="p">I am body text</Text>
      </Column>
    </LayoutGrid>
  </StoryTemplate>
));
