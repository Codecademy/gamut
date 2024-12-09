import { FormRequiredText } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormRequiredText> = {
  component: FormRequiredText,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FormRequiredText>;

export const Default: Story = {
  args: {},
};
