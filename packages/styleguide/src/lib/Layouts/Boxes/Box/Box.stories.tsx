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
    as: 'div',
    children: 'Hello work, I am a box!',
  },
};

export const Bordered: Story = {
  args: {
    border: 1,
    p: 8,
    children: 'I am a bordered box',
    // Adding mostly to test borderColor -- which works, I can clean up after approval
    borderColor: 'border-primary',
  },
};

export const Positioning: Story = {
  render: () => (
    <Box position="relative" height="500px">
      <Box position="absolute" left="0" top="0" bg="gray-200" p={16}>
        Top Left
      </Box>
      <Box position="absolute" bottom="0" left="0" bg="gray-200" p={16}>
        Bottom Left
      </Box>
      <Box position="absolute" right="0" top="0" bg="gray-200" p={16}>
        Top Right
      </Box>
      <Box position="absolute" right="0" bottom="0" bg="gray-200" p={16}>
        Bottom Right
      </Box>
    </Box>
  ),
};

export const Lists: Story = {
  render: () => (
    <Box as="ul" listStyle="none" p={16} border={1}>
      <Box as="li" border={1} p={8} my={8}>
        list item 1
      </Box>
      <Box as="li" border={1} p={8} my={8}>
        list item 2
      </Box>
      <Box as="li" border={1} p={8} my={8}>
        and so on
      </Box>
    </Box>
  ),
};
