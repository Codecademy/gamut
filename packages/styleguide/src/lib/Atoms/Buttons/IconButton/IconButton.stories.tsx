import { IconButton } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

const meta: TypeWithDeepControls<Meta<typeof IconButton>> = {
  component: IconButton,
  args: {
    disabled: false,
    size: 'normal',
    icon: icons.SearchIcon,
    tip: 'ToolTip',
    tipProps: { placement: 'floating', alignment: 'top-center' },
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
    'tipProps.placement': {
      control: 'radio',
      options: ['floating', 'inline'],
    },
    'tipProps.alignment': {
      control: 'radio',
      options: ['top-center', 'bottom-center', 'left-center', 'right-center'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {},
};
