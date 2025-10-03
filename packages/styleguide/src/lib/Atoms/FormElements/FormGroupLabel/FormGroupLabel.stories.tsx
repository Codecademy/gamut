import { FormGroupLabel } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

const meta: TypeWithDeepControls<Meta<typeof FormGroupLabel>> = {
  component: FormGroupLabel,
  args: { children: 'I am a label' },
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
type Story = StoryObj<typeof FormGroupLabel>;

export const Default: Story = {
  args: {
    htmlFor: 'label-default',
  },
};

export const LargeSize: Story = {
  args: {
    htmlFor: 'label-large',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'label-disabled',
    disabled: true,
  },
};

export const WithHtmlFor: Story = {
  args: {
    htmlFor: 'label',
    children: 'I look like a label, and I am a label.',
  },
};

export const WithoutHtmlFor: Story = {
  args: {
    children: 'I look like a label, but I am not a label.',
  },
};
