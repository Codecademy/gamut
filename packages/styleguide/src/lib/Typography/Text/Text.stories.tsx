import { Column, LayoutGrid, Text } from '@codecademy/gamut';
// eslint-disable-next-line gamut/import-paths
import {
  typographyElementVariants,
  typographyUtilities,
} from '@codecademy/gamut/src/Typography/variants';
import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';

const meta: Meta<typeof Text> = {
  component: Text,
  args: {
    children: 'Welcome to Gamut!',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {},
};

export const Elements: Story = {
  render: () => (
    <LayoutGrid gap={32}>
      {Object.keys(typographyElementVariants).map((tag) => (
        <Fragment key={tag}>
          <Column size={2} alignItems="center">
            <Text as="code" fontSize={14}>
              {tag}
            </Text>
          </Column>
          <Column size={10}>
            <Text as={tag as any}>Lorem Ipsum Dolor</Text>
          </Column>
        </Fragment>
      ))}
    </LayoutGrid>
  ),
};

export const Variants: Story = {
  render: () => (
    <LayoutGrid gap={32} my={48}>
      {Object.keys(typographyElementVariants).map((tag) => (
        <Fragment key={tag}>
          <Column size={1} alignItems="center">
            <Text as="code" fontSize={14}>
              {tag}
            </Text>
          </Column>
          <Column size={11}>
            <Text as={tag as any}>Lorem Ipsum Dolor</Text>
          </Column>
        </Fragment>
      ))}
    </LayoutGrid>
  ),
};

export const Truncation: Story = {
  render: () => (
    <LayoutGrid gap={32}>
      {typographyUtilities.truncation.map((truncateType) =>
        typographyUtilities.truncateLines.map((lines) => (
          <Fragment key={lines}>
            <Column size={3} alignItems="center">
              <Text as="code" fontSize={14}>
                truncate="{truncateType}"
                <br />
                truncateLines={lines}
              </Text>
            </Column>
            <Column size={9}>
              <Text truncateLines={lines} truncate={truncateType} width="400px">
                This is a very long text thingy that we want to truncate it's
                very long indeed. This is a very long text thingy that we want
                to truncate it's very long indeed. This is a very long text
                thingy that we want to truncate it's very long indeed. This is a
                very long text thingy that we want to truncate it's very long
                indeed.
              </Text>
            </Column>
          </Fragment>
        ))
      )}
    </LayoutGrid>
  ),
};

export const FontSmoothing: Story = {
  render: () => (
    <LayoutGrid gap={32} mt={24} mb={48}>
      {typographyUtilities.smoothing.map((variant) => (
        <Fragment key={variant}>
          <Column size={3} alignItems="center">
            <Text as="code" fontSize={14}>
              smooth="{variant.toString()}"
            </Text>
          </Column>
          <Column size={9}>
            <Text variant="title-md" smooth={variant}>
              Am I smooth?
            </Text>
          </Column>
        </Fragment>
      ))}
    </LayoutGrid>
  ),
};

export const Screenreader: Story = {
  render: () => (
    <LayoutGrid gap={32} mt={24} mb={48}>
      {typographyUtilities.screenreader.map((variant) => (
        <Fragment key={variant}>
          <Column size={3} alignItems="center">
            <Text as="code" fontSize={14}>
              screenreader="{variant.toString()}"
            </Text>
          </Column>
          <Column size={9}>
            <Text screenreader={variant}>
              {variant
                ? 'Visible only to screenreaders'
                : 'When set to "false", this text is visible to non-screenreaders.'}
            </Text>
          </Column>
        </Fragment>
      ))}
    </LayoutGrid>
  ),
};

export const Highlight: Story = {
  render: () => (
    <LayoutGrid gap={32} mt={24} mb={48}>
      <Column size={3} alignItems="center">
        <Text as="code" fontSize={14}>
          {`highlight="true"`}
        </Text>
      </Column>
      <Column size={3} alignItems="center">
        <Text>
          A{' '}
          <Text as="span" highlight>
            highlighted
          </Text>{' '}
          example
        </Text>
      </Column>
    </LayoutGrid>
  ),
};
