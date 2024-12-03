import { Badge } from '@codecademy/gamut';
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
