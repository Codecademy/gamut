import { FormGroupDescription } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormGroupDescription> = {
  component: FormGroupDescription,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FormGroupDescription>;

export const Default: Story = {
  args: { children: 'I am a description' },
};

