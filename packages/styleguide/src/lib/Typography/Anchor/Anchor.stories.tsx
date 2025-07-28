import { Anchor, FlexBox, Text } from '@codecademy/gamut';
import {
  BulbIcon,
  MiniArrowLeftIcon,
  MiniArrowRightIcon,
  MiniInfoOutlineIcon,
  MiniOpenIcon,
  SmileySadIcon,
  StudyBookIcon,
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

export const IconFlexAnchor: Story = {
  render: (args) => (
    <FlexBox alignItems="center" column gap={4}>
      <Text>These anchors with icons are in a FlexBox:</Text>
      <Anchor {...args} href="/" icon={MiniArrowLeftIcon} iconPosition="left">
        Left-aligned icon anchor
      </Anchor>
      <Anchor
        {...args}
        href="/"
        icon={[MiniArrowLeftIcon, MiniArrowRightIcon]}
        iconPosition="right"
        variant="inline"
      >
        Has both left and right-aligned icons
      </Anchor>
      <Anchor
        {...args}
        href="/"
        icon={MiniArrowRightIcon}
        iconPosition="right"
        variant="inline"
      >
        Right-aligned icon anchor
      </Anchor>
    </FlexBox>
  ),
};

export const IconInlineAnchorExample: Story = {
  render: (args) => (
    <Text fontSize={14}>
      I started painting as a hobby when I was little.{' '}
      <Anchor
        {...args}
        href="/"
        icon={SmileySadIcon}
        iconPosition="left"
        variant="inline"
      >
        I didn&apos;t know I had any talent.
      </Anchor>{' '}
      I believe talent is just a pursued interest.{' '}
      <Anchor
        {...args}
        href="/"
        icon={BulbIcon}
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
        icon={[StudyBookIcon, MiniOpenIcon]}
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
