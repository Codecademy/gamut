import { Box } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

// This file only exists because ConnectedFormInputs would break without it
// since it requires a Meta and stories to render the page in Storybook
const meta: Meta<typeof Box> = {
  component: Box,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {},
};
