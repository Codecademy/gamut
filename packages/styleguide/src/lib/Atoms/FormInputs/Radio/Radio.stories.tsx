import { Radio, RadioGroup } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

const meta: TypeWithDeepControls<Meta<typeof Radio>> = {
  component: Radio,
  args: {
    htmlFor: 'example-radio',
    label: 'Option 1',
    name: 'example-radio',
  },
  argTypes: {
    infotip: {
      table: {
        disable: true,
      },
    },
    'infotip.emphasis': {
      control: 'radio',
      options: ['high', 'low'],
      table: {
        defaultValue: { summary: 'low' },
        type: { summary: 'high | low' },
      },
    },
    'infotip.alignment': {
      control: 'radio',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
      table: {
        defaultValue: { summary: 'top-right' },
        type: { summary: 'bottom-left | bottom-right | top-left | top-right' },
      },
    },
    'infotip.placement': {
      control: 'radio',
      options: ['floating', 'inline'],
      table: {
        defaultValue: { summary: 'inline' },
        type: { summary: 'floating | inline' },
      },
    },
    'infotip.narrow': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description:
        'Forces the tooltip to be its narrowest width. For use along the edges of the page or other tight spaces.',
    },
    'infotip.inheritDims': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description:
        'If ToolTipWrapper should inherit the dimensions of the parent element. Can only be used for inline tips.',
    },
    'infotip.info': {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      description: 'The text for the infotip.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {},
};

export const RadioGroupComponent: Story = {
  render: () => (
    <RadioGroup htmlForPrefix="example-radio">
      <Radio htmlFor="example-radio" label="Radio 1" name="example-radio-1" />
      <Radio htmlFor="example-radio" label="Radio 2" name="example-radio-2" />
    </RadioGroup>
  ),
};

export const Checked: Story = {
  args: {
    htmlFor: 'example-checked',
    name: 'example-checked',
    label: 'Checked',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'example-disabled',
    name: 'example-disabled',
    label: 'Disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    htmlFor: 'example-disabled-checked',
    name: 'example-disabled-checked',
    label: 'Disabled and Checked',
    disabled: true,
    checked: true,
  },
};

export const Error: Story = {
  args: {
    htmlFor: 'example-error',
    label: 'Error',
    name: 'example-error',
    error: true,
  },
};

export const CustomLabel: Story = {
  args: {
    infotip: {
      emphasis: 'high',
      info: 'This is an infotip',
      placement: 'floating',
    },
    htmlFor: 'example-custom',
    name: 'example-custom',
    label: 'Option with infotip',
  },
};
