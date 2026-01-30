import { Box, FlexBox, Markdown } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Color',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const BorderColorExample: Story = {
  render: () => (
    <FlexBox gap={16} row>
    <Box
      bg="background-selected"
      border={1}
      borderColorX="feedback-success"
      borderColorY="feedback-error"
      borderWidth="4px"
      p={16}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`borderColorX='feedback-success'` and `borderColorY='feedback-error'`." />{' '}
      Inspect the example to see what CSS properties are rendered based on the
      logical properties mode.
    </Box>
    <Box
      bg="background-selected"
      border={1}
      borderColorBottom="feedback-warning"
      borderColorLeft="feedback-success"
      borderColorRight="feedback-error"
      borderColorTop="interface"
      borderWidth="4px"
      p={16}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`borderColorBottom='feedback-warning'`, `borderColorLeft='feedback-success'`, `borderColorRight='feedback-error'`, and `borderColorTop='interface'`." />{' '}
      Inspect the example to see what CSS properties are rendered based on the
      logical properties mode.
    </Box>
    </FlexBox>
  ),
};
