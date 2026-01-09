import { TextButton } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextButton> = {
  component: TextButton,
  args: {
    children: 'Click Me',
    disabled: false,
    size: 'normal',
    variant: 'primary',
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
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    as: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: {},
};
