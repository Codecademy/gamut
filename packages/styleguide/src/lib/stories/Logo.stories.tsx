import { Logo } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Logo> = {
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: (args) => <Logo {...args} />,
  name: 'Default',

  args: {
    variant: 'default',
  },
};

export const Pro: Story = {
  render: (args) => <Logo {...args} />,
  name: 'Pro',

  args: {
    variant: 'pro',
  },
};

export const Mini: Story = {
  render: (args) => <Logo {...args} />,
  name: 'Mini',

  args: {
    variant: 'mini',
  },
};

export const Enterprise: Story = {
  render: (args) => <Logo {...args} />,
  name: 'Enterprise',

  args: {
    variant: 'enterprise',
    height: 36,
  },
};
