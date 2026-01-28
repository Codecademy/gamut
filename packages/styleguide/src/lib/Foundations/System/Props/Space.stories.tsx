import { Box, Markdown } from '@codecademy/gamut';
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
      color="background-contrast"
      mb={64}
      ml={16}
      mr={32}
      mt={4}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`mt={4}`, `mr={32}`, `mb={64}`, and `ml={16}`." /> Inspect
      the example to see what CSS properties are rendered.
    </Box>
  ),
};

export const PaddingExample: Story = {
  render: () => (
    <Box bg="background-selected">
      <Box
        bg="primary"
        color="background-contrast"
        pb={64}
        pl={16}
        pr={32}
        pt={4}
        textAlign="center"
      >
        This box has{' '}
        <Markdown text="`pt={4}`, `pr={32}`, `pb={64}`, and `pl={16}`." />{' '}
        Inspect the example to see what CSS properties are rendered.
      </Box>
    </Box>
  ),
};
