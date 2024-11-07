import { Logo } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Logo> = {
  component: Logo,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Variant2: Story = {
  args: {
    variant: 'pro',
  },
};

