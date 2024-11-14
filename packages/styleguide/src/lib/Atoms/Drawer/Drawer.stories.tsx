import { Drawer } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {},
};
