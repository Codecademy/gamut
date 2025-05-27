import { Column, LayoutGrid, Text } from '@codecademy/gamut';
// eslint-disable-next-line gamut/import-paths
import {
  typographyElementVariants,
  typographyStyleVariants,
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

const layoutGridStyles = { gap: 32, ml: 4 } as const;

export const Elements: Story = {
  render: () => (
    <LayoutGrid {...layoutGridStyles}>
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
    <LayoutGrid {...layoutGridStyles}>
      {Object.keys(typographyStyleVariants).map((variant) => (
        <Fragment key={variant}>
          <Column size={1} alignItems="center">
            <Text as="code" fontSize={14}>
              {typographyStyleVariants[
                variant as keyof typeof typographyStyleVariants
              ].fontSize.toString()}
            </Text>
          </Column>
          <Column size={11}>
            <Text
              as="span"
              variant={variant as keyof typeof typographyStyleVariants}
            >
              {variant}
            </Text>
          </Column>
        </Fragment>
      ))}
    </LayoutGrid>
  ),
};

export const Truncation: Story = {
  render: () => (
    <LayoutGrid {...layoutGridStyles}>
      {typographyUtilities.truncation.map((truncateType) =>
        typographyUtilities.truncateLines.map((lines) => (
          <Fragment key={lines}>
            <Column size={3} alignItems="center">
              <Text as="code" fontSize={14}>
                truncate=&quot;{truncateType}&quot;
                <br />
                truncateLines={lines}
              </Text>
            </Column>
            <Column size={9}>
              <Text truncateLines={lines} truncate={truncateType} width="400px">
                This is a very long text thingy that we want to truncate
                it&#39;s very long indeed. This is a very long text thingy that
                we want to truncate it&#39;s very long indeed. This is a very
                long text thingy that we want to truncate it&#39;s very long
                indeed. This is a very long text thingy that we want to truncate
                it&#39;s very long indeed.
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
    <LayoutGrid {...layoutGridStyles}>
      {typographyUtilities.smoothing.map((variant) => (
        <Fragment key={variant.toString()}>
          <Column size={3} alignItems="center">
            <Text as="code" fontSize={14}>
              smooth=&quot;{variant.toString()}&quot;
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
    <LayoutGrid {...layoutGridStyles}>
      {typographyUtilities.screenreader.map((variant) => (
        <Fragment key={variant.toString()}>
          <Column size={3} alignItems="center">
            <Text as="code" fontSize={14}>
              screenreader=&quot;{variant.toString()}&quot;
            </Text>
          </Column>
          <Column size={9}>
            <Text screenreader={variant} id={`${variant}-id`}>
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
    <LayoutGrid {...layoutGridStyles}>
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
