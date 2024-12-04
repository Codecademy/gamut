import { FormGroupLabel } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormGroupLabel> = {
  component: FormGroupLabel,
  args: {children: 'I am a label'},
};

export default meta;
type Story = StoryObj<typeof FormGroupLabel>;

export const Default: Story = {
  args: {
    htmlFor: "label-default",
  },
};

export const LargeSize: Story = {
  args: {
    htmlFor: "label-large",
    size: "large"
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: "label-disabled",
    disabled: true
  },
};

export const WithHtmlFor: Story = {
  args: {
    htmlFor: "label",
    children: 'I look like a label, and I am a label.'
  },
};

export const WithoutHtmlFor: Story = {
  args: {
    children: 'I look like a label, but I am not a label.'
  },
};
