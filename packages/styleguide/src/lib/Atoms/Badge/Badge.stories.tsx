import { Badge, FlexBox } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { TertiaryFillExample } from './examples';

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: { children: 'Badge' },
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: Object.keys(icons),
      mapping: icons,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const TertiaryFill: Story = {
  render: () => {
    return <TertiaryFillExample />;
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
  },
};

export const Custom: Story = {
  render: (args) => (
    <FlexBox gap={8}>
      <Badge
        background="linear-gradient(91deg, #FFE712 0.08%, #FF9641 100%)"
        variant="custom"
        {...args}
      />
      <Badge bg="green" variant="custom" {...args} />
      <Badge bg="orange-500" variant="custom" {...args} />
      <Badge
        bg="lightBlue"
        variant="custom"
        {...args}
        icon={icons.MiniStarIcon}
      />
    </FlexBox>
  ),
};

export const DefaultSize: Story = {
  args: {
    children: 'default size',
  },
};

export const SmallSize: Story = {
  args: {
    children: 'sm size',
    size: 'sm',
    variant: 'tertiary',
  },
};

export const DefaultSizeWithIcon: Story = {
  args: {
    children: 'sample icon',
    variant: 'tertiaryFill',
    icon: icons.MiniStarIcon,
  },
};

export const SmallSizeWithIcon: Story = {
  args: {
    children: 'sm icon',
    size: 'sm',
    variant: 'accent',
    icon: icons.MiniWarningTriangleIcon,
  },
};
