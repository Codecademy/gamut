import { FillButton } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FillButton> = {
  component: FillButton,
  args: {
    children: 'Click Me',
    disabled: false,
    size: 'normal',
  },
  argTypes: {
    href: {
      description: 'If defined, component will use an anchor tag',
      type: 'string',
    },
    size: {
      control: 'radio',
      options: ['normal', 'small', 'large'],
    },
    icon: {
      control: {
        options: [SearchIcon], // what is this
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FillButton>;

export const Default: Story = {
  args: {},
};
