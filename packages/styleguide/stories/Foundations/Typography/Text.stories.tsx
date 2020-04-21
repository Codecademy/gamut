import React from 'react';
import { colors } from '@codecademy/gamut-styles/utils/variables';
import { LayoutGrid, Column, Text, Heading } from '@codecademy/gamut/src';

import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../Templating';

export default decoratedStories('Foundations', 'Typography', Text);

const textTags: ('p' | 'span')[] = ['p', 'span'];
const textSizes: ('sm' | 'lg')[] = ['lg', 'sm'];

export const baseTypography = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Responsive Typography primitives for all your textual needs.
    </StoryDescription>
    <LayoutGrid rowGap="lg">
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
));

export const colorCustomization = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Pass custom colors via a limited style prop
    </StoryDescription>
    <Text as="p" style={{ color: colors.royalBlue }}>
      Royal Blue
    </Text>
  </StoryTemplate>
));
