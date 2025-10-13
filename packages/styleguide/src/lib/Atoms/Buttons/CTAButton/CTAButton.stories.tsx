import { CTAButton } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CTAButton> = {
  component: CTAButton,
  args: {
    children: 'Click Me',
    disabled: false,
  },
  argTypes: {
    href: {
      description: 'If defined, component will use an anchor tag',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CTAButton>;

export const Default: Story = {
  args: {},
};
