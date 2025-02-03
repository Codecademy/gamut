import { BarChart } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  args: {},
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {},
};
