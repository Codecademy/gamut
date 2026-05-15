import { FormGroup, TextArea } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  args: {
    id: 'example-input',
    name: 'example-input',
    defaultValue: 'Some text',
    rows: 4,
  },
  decorators: [
    (Story) => (
      <FormGroup htmlFor="example-input" isSoloField label="Enter text">
        <Story />
      </FormGroup>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Disabled',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    defaultValue: 'Error',
    error: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder',
    defaultValue: undefined,
  },
};
