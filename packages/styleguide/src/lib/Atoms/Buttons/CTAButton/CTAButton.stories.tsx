import { CTAButton } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CTAButton> = {
  component: CTAButton,
  args: {
    children: 'Click Me',
    disabled: false,
    size: 'normal',
  },
  argTypes: {
    href: {
      description: 'If defined, component will use an anchor tag',
    },
    size: {
      control: {
        type: 'select',
        options: ['normal', 'small', 'large'],
      },
    },
    as: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CTAButton>;

export const Default: Story = {
  args: {},
};
