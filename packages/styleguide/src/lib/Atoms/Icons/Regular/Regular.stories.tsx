import { AlertIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AlertIcon> = {
  component: AlertIcon,
  args: {},
};

export default meta;
type Story = StoryObj<typeof AlertIcon>;

export const Default: Story = {
  args: {
    size: 40,
  },
};
