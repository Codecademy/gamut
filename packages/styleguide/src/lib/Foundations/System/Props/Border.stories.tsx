import { Box, Markdown } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Border',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const DirectionalBorderExample: Story = {
  render: () => (
    <Box
      bg="background-selected"
      borderX={2}
      borderY={1}
      p={16}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`borderX={2}`, `borderY={1}`." />{' '}
      Inspect the example to see what CSS properties are rendered based on the
      logical properties mode.
    </Box>
  ),
};

export const BorderWidthExample: Story = {
  render: () => (
    <Box
      bg="background-selected"
      borderWidthX="4px"
      borderWidthY="1px"
      p={16}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`borderWidthX='4px'` and `borderWidthY='1px'`." />{' '}
      Inspect the example to see what CSS properties are rendered based on the
      logical properties mode.
    </Box>
  ),
};
