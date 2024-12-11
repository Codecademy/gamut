import { MiniStarIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MiniStarIcon> = {
  component: MiniStarIcon,
  args: {},
};

export default meta;
type Story = StoryObj<typeof MiniStarIcon>;

export const Default: Story = {
  args: {},
};
