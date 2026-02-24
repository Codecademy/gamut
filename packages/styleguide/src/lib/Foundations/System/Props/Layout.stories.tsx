import { Box, Markdown } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Layout',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const OverflowXExample: Story = {
  render: () => (
    <Box
      bg="background-selected"
      p={16}
      width="200px"
      overflowX="scroll"
      whiteSpace="nowrap"
    >
      <Box
        bg="primary"
        color="background-contrast"
        p={8}
        display="inline-block"
      >
        This content is wider than its container and has{' '}
        <Markdown text="`overflowX='scroll'`." /> Inspect the example to see
        what CSS properties are rendered.
      </Box>
    </Box>
  ),
};

export const OverflowYExample: Story = {
  render: () => (
    <Box bg="background-selected" p={16} height="100px" overflowY="scroll">
      <Box bg="primary" color="background-contrast" p={8}>
        This content is taller than its container and has{' '}
        <Markdown text="`overflowY='scroll'`." /> Inspect the example to see
        what CSS properties are rendered.
        <Box mt={16}>Line 2</Box>
        <Box mt={16}>Line 3</Box>
        <Box mt={16}>Line 4</Box>
        <Box mt={16}>Line 5</Box>
      </Box>
    </Box>
  ),
};
