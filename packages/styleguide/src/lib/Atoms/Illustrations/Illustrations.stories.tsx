import * as illustrations from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';

const Illustration = illustrations.NumberBlocks;

const meta: Meta<typeof Illustration> = {
  component: Illustration,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Default: Story = {
  args: {
    width: 256,
  },
};
