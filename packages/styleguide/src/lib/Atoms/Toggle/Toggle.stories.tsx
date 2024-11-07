import { Text, Toggle } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import {
  InteractiveButtonToggle,
  InteractiveInputToggle,
} from './Toggle.examples';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'My label is to the left',
    labelSide: 'left',
  },
};

export const LabelRight: Story = {
  args: {
    label: 'My label is to the right',
    labelSide: 'right',
  },
};

export const ReactComponentLabel: Story = {
  args: {
    checked: false,
    label: <Text>I am a Text component</Text>,
    ariaLabel: 'Hello there',
  },
};

export const InputElement: Story = {
  args: {
    label: 'input toggle',
    onChange: () => null,
  },
};

export const ButtonElement: Story = {
  args: {
    as: 'button',
    checked: true,
    label: 'button toggle',
    onChange: undefined,
    onClick: () => null,
  },
};

export const InteractiveInput: Story = {
  render: () => <InteractiveInputToggle />,
};

export const InteractiveButton: Story = {
  render: () => <InteractiveButtonToggle />,
};
