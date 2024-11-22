import { Input } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    htmlFor: 'example-input',
    name: 'example-input',
    placeholder: 'Placeholder',
    type: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const Text: Story = {
  args: {
    htmlFor: 'example-text',
    defaultValue: 'Text',
    name: 'example-text',
    type: 'text',
    required: true,
  },
};

export const Number: Story = {
  args: {
    htmlFor: 'example-number',
    name: 'example-number',
    type: 'number',
    defaultValue: 1,
  },
};

export const File: Story = {
  args: {
    htmlFor: 'example-file',
    name: 'example-file',
    type: 'file',
    value: '',
    onChange: () => {},
  },
};

export const Error: Story = {
  args: {
    htmlFor: 'example-error',
    defaultValue: 'Error',
    name: 'example-error',
    error: true,
  },
};

export const Validated: Story = {
  args: {
    htmlFor: 'example-valid',
    name: 'example-placeholder',
    placeholder: 'Placeholder',
    defaultValue: 'Verified Text',
    valid: true,
  },
};

export const Placeholder: Story = {
  args: {
    htmlFor: 'example-placeholder',
    name: 'example-placeholder',
    placeholder: 'Placeholder',
    defaultValue: undefined,
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'example-disabled',
    name: 'example-disabled',
    placeholder: 'Disabled',
    disabled: true,
    defaultValue: undefined,
  },
};
