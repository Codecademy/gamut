import { Logo } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Logo> = {
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Pro: Story = {
  args: {
    variant: 'pro',
  },
};

export const Mini: Story = {
  args: {
    variant: 'mini',
  },
};

export const Enterprise: Story = {
  args: {
    variant: 'enterprise',
    height: 36,
  },
};
