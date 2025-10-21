import { FormGroup, Select } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const fruitOptions = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Eggplant'];

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    htmlFor: 'example-select',
    name: 'example-select',
    options: fruitOptions,
  },
  argTypes: {
    value: {
      control: 'select',
      options: fruitOptions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
};

export const Base: Story = {
  args: {
    options: ['Base', 'Regular Size', 'Normal'],
    defaultValue: 'Regular Size',
  },
};

export const Small: Story = {
  args: {
    options: ['Small', 'Quite little'],
    defaultValue: 'Small',
    sizeVariant: 'small',
    id: 'small-variant',
  },
};

export const Disabled: Story = {
  args: {
    options: ['Disabled'],
    defaultValue: 'Disabled',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    options: ['Error'],
    defaultValue: 'Error',
    error: true,
  },
};

export const FormGroupBase: Story = {
  args: {
    options: ['Error', 'oh no', ':('],
    defaultValue: 'oh no',
    name: 'form-group-base',
  },
  render: (args) => (
    <FormGroup
      error="error!"
      htmlFor="form-group-base"
      isSoloField
      label="i am a large label"
      labelSize="large"
    >
      <Select error {...args} />
    </FormGroup>
  ),
};

export const FormGroupSmall: Story = {
  args: {
    options: ['Small', 'Quite little'],
    value: 'Small',
    sizeVariant: 'small',
    name: 'form-group-small',
  },
  render: (args) => (
    <FormGroup
      htmlFor="form-group-small"
      isSoloField
      label="i am small and have a label"
    >
      <Select {...args} />
    </FormGroup>
  ),
};
