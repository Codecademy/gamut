import { Box, Markdown } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Positioning',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const PositionExample: Story = {
  render: () => (
    <Box bg="background-selected" height="250px" position="relative">
      <Box
        bg="primary"
        color="background-contrast"
        left={16}
        p={16}
        position="absolute"
        top={16}
      >
        This box has{' '}
        <Markdown text="`position='absolute'`, `top={16}`, and `left={16}`." />{' '}
        Inspect the example to see what CSS properties are rendered. You can
        also change the value of{' '}
        <Markdown text="`useLogicalProperties` and `direction`" /> in the
        toolbar to see how the box renders differently.
      </Box>
    </Box>
  ),
};
