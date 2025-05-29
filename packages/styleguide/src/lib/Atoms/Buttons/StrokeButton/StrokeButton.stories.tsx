import { StrokeButton } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StrokeButton> = {
  component: StrokeButton,
  args: {
    children: 'Click Me',
    disabled: false,
    size: 'normal',
    variant: 'primary',
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
    },
    icon: {
      control: {
        options: [SearchIcon],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StrokeButton>;

export const Default: Story = {
  args: {},
};
