import { IconButton } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  args: {
    children: 'Click Me',
    disabled: false,
    size: 'normal',
    icon: icons.SearchIcon,
    tip: 'ToolTip',
    tipProps: { placement: 'floating' },
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
        type: 'select',
      },
      options: Object.keys(icons),
      mapping: icons,
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {},
};
