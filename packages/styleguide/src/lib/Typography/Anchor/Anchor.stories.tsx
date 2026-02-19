import { Anchor, GridBox, Text } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { PolymorphicAnchors, VariantsExample } from './Anchor.examples';

const meta: Meta<typeof Anchor> = {
  component: Anchor,
  args: {
    children: 'Click me',
    // href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    icon: icons.MiniInfoOutlineIcon,
    iconPosition: 'left',
    target: '_blank',
    variant: 'inline',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Default: Story = {
  args: {},
};

export const IconFlexAnchor: Story = {
  render: (args) => (
    <GridBox gap={4}>
      <Anchor
        {...args}
        href="/"
        icon={icons.MiniInfoOutlineIcon}
        iconPosition="left"
      >
        Left-aligned icon anchor
      </Anchor>
      <Anchor
        {...args}
        href="/"
        icon={icons.MiniArrowRightIcon}
        iconPosition="right"
        variant="inline"
      >
        Right-aligned icon anchor
      </Anchor>
    </GridBox>
  ),
};

export const IconInlineAnchorExample: Story = {
  render: (args) => (
    <Text fontSize={14}>
      I started painting as a hobby when I was little.{' '}
      <Anchor
        {...args}
        href="/"
        icon={icons.MiniInfoOutlineIcon}
        iconPosition="left"
        variant="inline"
      >
        I didn&apos;t know I had any talent.
      </Anchor>{' '}
      I believe talent is just a pursued interest.{' '}
      <Anchor
        {...args}
        href="/"
        icon={icons.BulbIcon}
        iconPosition="right"
        variant="inline"
      >
        Anybody can do what I do.
      </Anchor>{' '}
      Just go back and put one little more happy tree in there. Everybody&apos;s
      different. <br />
      <Anchor
        {...args}
        href="/"
        icon={icons.MiniArrowRightIcon}
        iconPosition="right"
        variant="inline"
      >
        Learn more
      </Anchor>
    </Text>
  ),
};

export const Modes: Story = {
  render: () => <VariantsExample useIcon={false} />,
};

export const IconModes: Story = {
  render: () => <VariantsExample useIcon />,
};

export const PolymorphicAnchor: Story = {
  render: () => <PolymorphicAnchors />,
};

export const DisabledAnchor: Story = {
  render: () => <Anchor disabled> This is disabled, inspect me! </Anchor>,
};
