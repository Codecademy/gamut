import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from '../../Logo';

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ['autodocs'],
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
