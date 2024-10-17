import type { Meta, StoryObj } from '@storybook/react';

import { RadialProgress } from '../RadialProgress';

const meta: Meta<typeof RadialProgress> = {
  component: RadialProgress,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadialProgress>;

export const Default: Story = {
  render: (args) => <RadialProgress {...args} />,
  name: 'Default',

  args: {
    value: [50, 75],
  },
};
