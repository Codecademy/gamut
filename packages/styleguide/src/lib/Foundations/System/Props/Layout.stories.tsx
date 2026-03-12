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
      overflowX="scroll"
      p={16}
      whiteSpace="nowrap"
      width="200px"
    >
      <Box
        bg="primary"
        color="background-contrast"
        display="inline-block"
        p={8}
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
    <Box bg="background-selected" height="100px" overflowY="scroll" p={16}>
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

export const WidthExample: Story = {
  render: () => (
    <Box bg="background-selected" p={16}>
      <Box
        bg="primary"
        color="background-contrast"
        height="300px"
        p={16}
        width="50%"
      >
        This box has <Markdown text="`width='50%' and height='300px'`." />{' '}
        Inspect the box to see the rendered CSS property.
      </Box>
    </Box>
  ),
};

export const DirectionExample: Story = {
  render: () => (
    <Box display="flex" flexDirection="row" gap={16}>
      <Box bg="background-selected" p={16} width="50%">
        <Box bg="primary" color="background-contrast" direction="ltr" p={16}>
          <Markdown text="`direction='ltr'`." /> Left-to-right text direction
          (default for English).
        </Box>
      </Box>
      <Box bg="background-selected" p={16} width="50%">
        <Box bg="primary" color="background-contrast" direction="rtl" p={16}>
          <Markdown text="`direction='rtl'`." /> Right-to-left text direction
          (used for Arabic, Hebrew, etc.).
        </Box>
      </Box>
    </Box>
  ),
};
