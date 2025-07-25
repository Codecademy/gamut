import { Anchor, GridBox, Text } from '@codecademy/gamut';
import {
  MiniArrowRightIcon,
  MiniInfoOutlineIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { PolymorphicAnchors, VariantsExample } from './Anchor.examples';

const meta: Meta<typeof Anchor> = {
  component: Anchor,
  args: {
    children: 'Click me',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    icon: MiniInfoOutlineIcon,
    iconPosition: 'left',
    target: '_blank',
    variant: 'inline',
  },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Default: Story = {
  args: {},
};

export const IconAnchor: Story = {
  render: (args) => (
    <GridBox gap={4}>
      <Anchor
        {...args}
        href="/"
        icon={[MiniInfoOutlineIcon, MiniInfoOutlineIcon]}
        iconPosition="left"
      >
        Left-aligned icon anchor
      </Anchor>
      <Anchor
        {...args}
        href="/"
        icon={[MiniArrowRightIcon, MiniArrowRightIcon]}
        iconPosition="right"
        variant="inline"
      >
        Right-aligned icon anchor
      </Anchor>
    </GridBox>
  ),
};

export const IconAnchorExample: Story = {
  render: (args) => (
    <Text fontSize={14}>
      I started painting as a hobby when I was little. I didn&apos;t know I had
      any talent. I believe talent is just a pursued interest.e{' '}
      <Anchor
        {...args}
        href="/"
        icon={MiniInfoOutlineIcon}
        iconPosition="left"
        variant="inline"
      >
        Anybody can do what I do.
      </Anchor>{' '}
      Just go back and put one little more happy tree in there. Everybody&apos;s
      different.{' '}
      <Anchor
        {...args}
        href="/"
        icon={MiniArrowRightIcon}
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
