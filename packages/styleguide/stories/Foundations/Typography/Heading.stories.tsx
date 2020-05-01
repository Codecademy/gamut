import React from 'react';
import { colors } from '@codecademy/gamut-styles/utils/variables';
import {
  FontSizes,
  HeadingTags,
  LayoutGrid,
  Column,
  Heading,
  Container,
} from '@codecademy/gamut/src';
import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../Templating';

const headingTags: HeadingTags[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const headingSizes: FontSizes[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'];

export default decoratedStories('Foundations', 'Typography', Heading);

export const headingSizePairings = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Responsive Typography primitives for all your textual needs.
    </StoryDescription>
    <LayoutGrid rowGap="md">
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
      </Column>

      {headingSizes.map(size => (
        <React.Fragment key={size}>
          <Column size={1}>
            <Container align="center">
              <Heading
                fontSize="sm"
                as="h2"
                hideMargin
                style={{ color: colors.gray[400] }}
              >
                {size}
              </Heading>
            </Container>
          </Column>
          <Column size={11}>
            <Container key={size} align="center">
              <Heading fontSize={size} as="h3" hideMargin>
                Heading
              </Heading>
            </Container>
          </Column>
        </React.Fragment>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));

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
        <p>Random text</p>
      </Column>
      <Column size={12}>
        <Heading fontSize="md" as="h3" hideMargin>
          Sans margin
        </Heading>
        <p>Random text</p>
      </Column>
    </LayoutGrid>
  </StoryTemplate>
));
