import { Shimmer } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Shimmer> = {
  component: Shimmer,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

export const Default: Story = {
  args: {
    height: 200,
  },
};
