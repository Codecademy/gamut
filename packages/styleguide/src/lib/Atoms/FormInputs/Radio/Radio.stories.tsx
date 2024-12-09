import { Radio, RadioGroup } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Radio> = {
  component: Radio,
  args: {
    htmlFor: 'example-radio',
    label: 'Option 1',
    name: 'example-radio',
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
      <Radio htmlFor="example-radio" name="example-radio-1" label="Radio 1" />
      <Radio htmlFor="example-radio" name="example-radio-2" label="Radio 2" />
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
