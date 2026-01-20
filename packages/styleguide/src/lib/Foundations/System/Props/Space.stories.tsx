import { Box } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Space',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const MarginExample: Story = {
  render: () => (
    <Box
      bg="primary"
      color="white"
      mb={64}
      ml={16}
      mr={32}
      mt={4}
      textAlign="center"
    >
      This box has <code>mt={4}</code>, <code>mr={32}</code>,{' '}
      <code>mb={64}</code>, and <code>ml={16}</code>. Inspect the example to see
      what CSS properties are rendered.
    </Box>
  ),
};
