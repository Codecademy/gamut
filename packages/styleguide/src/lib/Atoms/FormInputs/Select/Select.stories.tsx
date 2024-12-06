import { FormGroup, Select } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const fruitOptions = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Eggplant'];

const fruitObjects = {
  month: 'Pro Monthly - $39.99 a month',
  annual: 'Pro Annual - $19.99 a month',
};

const selectObject = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
};

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    htmlFor: 'example-select',
    name: 'example-select',
    options: fruitOptions,
  },
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: fruitOptions,
      },
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
  },
  render: (args) => (
    <FormGroup
      label="i am a large label"
      labelSize="large"
      error="error!"
      isSoloField
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
  },
  render: (args) => (
    <FormGroup label="i am small and have a label" isSoloField>
      <Select {...args} />
    </FormGroup>
  ),
};
