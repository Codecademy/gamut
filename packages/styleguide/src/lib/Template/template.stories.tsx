import { Box } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  component: Box,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: <img src="./cinna.jpg" alt="jpeg" />,
  },
};

export const Variant2: Story = {
  args: {
    children: 'pro',
  },
};
