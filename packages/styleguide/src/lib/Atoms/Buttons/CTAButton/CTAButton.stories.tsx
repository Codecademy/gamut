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
    mode: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['normal', 'small', 'large'],
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof CTAButton>;

export const Default: Story = {
  args: {},
};

