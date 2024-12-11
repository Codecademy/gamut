import { Badge } from '@codecademy/gamut';
import { MiniStarIcon, MiniWarningTriangleIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { TertiaryFillExample } from './examples';

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: { children: 'Badge' },
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

export const DefaultSize: Story = {
  args: {
    children: 'default size'
  },
}

export const SmallSize: Story = {
  args: {
    children: 'sm size',
    size: 'sm',
    variant: 'tertiary'
  },
}

export const DefaultSizeWithIcon: Story = {
  args: {
    children: 'sample icon',
    variant: 'tertiaryFill',
    icon: MiniStarIcon,
  }
}

export const SmallSizeWithIcon: Story = {
  args: {
    children: 'sm icon',
    size: 'sm',
    variant: 'accent',
    icon: MiniWarningTriangleIcon,
  }
}
