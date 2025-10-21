import { FormGroup, Input } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    htmlFor: 'example-input',
    name: 'example-input',
    placeholder: 'Placeholder',
    type: 'text',
    size: 'base',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
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

export const CustomIcon: Story = {
  args: {
    htmlFor: 'example-icon',
    name: 'example-icon',
    defaultValue: 'Hello...',
    icon: icons.ViewIcon,
  },
};

export const FormGroupDefault: Story = {
  args: {
    defaultValue: '123',
    name: 'example-123',
  },
  render: (args) => (
    <FormGroup htmlFor="example-123" isSoloField label="i am a smol label">
      <Input {...args} />
    </FormGroup>
  ),
};

export const FormGroupError: Story = {
  args: {
    defaultValue: '123',
    name: 'example-123',
    error: true,
  },
  render: (args) => (
    <FormGroup
      error="this is not updog."
      htmlFor="example-123"
      isSoloField
      label="i am a smol label"
    >
      <Input {...args} />
    </FormGroup>
  ),
};

export const FormGroupLarge: Story = {
  args: {
    defaultValue: '123',
    name: 'example-123',
    placeholder: 'Placeholder',
  },
  render: (args) => (
    <FormGroup
      disabled
      htmlFor="example-123"
      isSoloField
      label="i am a large disabled label"
      labelSize="large"
    >
      <Input {...args} />
    </FormGroup>
  ),
};

export const FormGroupErrorLarge: Story = {
  args: {
    defaultValue: '123',
    name: 'example-123',
    error: true,
  },
  render: (args) => (
    <FormGroup
      error="this is still not updog..."
      htmlFor="example-123"
      isSoloField
      label="i am also large label, but something is wrong."
      labelSize="large"
    >
      <Input {...args} />
    </FormGroup>
  ),
};

export const TextSmall: Story = {
  args: {
    htmlFor: 'example-text',
    defaultValue: 'This input has less padding!',
    name: 'example-text',
    type: 'text',
    required: true,
    size: 'small',
  },
};

export const TextSmallError: Story = {
  args: {
    htmlFor: 'example-text',
    defaultValue: 'Still works like a charm!',
    name: 'example-text',
    type: 'text',
    required: true,
    size: 'small',
    error: true,
  },
};

export const NumberSmall: Story = {
  args: {
    htmlFor: 'example-number',
    name: 'example-number',
    type: 'number',
    defaultValue: 1,
    size: 'small',
    icon: icons.ViewIcon,
  },
};

export const FileSmall: Story = {
  args: {
    htmlFor: 'example-file',
    name: 'example-file',
    type: 'file',
    value: '',
    onChange: () => {},
    size: 'small',
    valid: true,
  },
};

export const DisabledSmall: Story = {
  args: {
    htmlFor: 'example-disabled',
    name: 'example-disabled',
    placeholder: 'Disabled',
    disabled: true,
    defaultValue: undefined,
    size: 'small',
  },
};
