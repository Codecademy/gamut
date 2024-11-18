import { HiddenText } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HiddenText> = {
  component: HiddenText,
  args: { children: 'Surprise!' },
};

export default meta;
type Story = StoryObj<typeof HiddenText>;

export const Default: Story = {
  args: {},
};
