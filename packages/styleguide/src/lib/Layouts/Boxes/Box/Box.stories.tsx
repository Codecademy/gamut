import { Box } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  component: Box,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'Hello work, I am a box!',
  },
};

export const Bordered: Story = {
  args: {
    border: 1,
    p: 8,
    children: 'I am a bordered box',
  },
};

export const Positioning: Story = {
  render: () => (
    <Box height="500px" position="relative">
      <Box bg="gray-200" left="0" p={16} position="absolute" top="0">
        Top Left
      </Box>
      <Box bg="gray-200" bottom="0" left="0" p={16} position="absolute">
        Bottom Left
      </Box>
      <Box bg="gray-200" p={16} position="absolute" right="0" top="0">
        Top Right
      </Box>
      <Box bg="gray-200" bottom="0" p={16} position="absolute" right="0">
        Bottom Right
      </Box>
    </Box>
  ),
};

export const Lists: Story = {
  render: () => (
    <Box as="ul" border={1} listStyle="none" p={16}>
      <Box as="li" border={1} my={8} p={8}>
        list item 1
      </Box>
      <Box as="li" border={1} my={8} p={8}>
        list item 2
      </Box>
      <Box as="li" border={1} my={8} p={8}>
        and so on
      </Box>
    </Box>
  ),
};
