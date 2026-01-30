import { Box, FlexBox, Markdown } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Border',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const DirectionalBorderExample: Story = {
  render: () => (
    <FlexBox gap={16} row>
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
    <Box
      bg="background-selected"
      borderLeft={2}
      borderRight={1}
      p={16}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`borderLeft={2}`, `borderRight={1}`." />{' '}
      Inspect the example to see what CSS properties are rendered based on the
      logical properties mode.
    </Box>
    </FlexBox>
  ),
};

export const BorderWidthExample: Story = {
  render: () => (
    <FlexBox gap={16} row>
    <Box
      bg="background-selected"
      border={1}
      borderWidthX="4px"
      borderWidthY="10px"
      p={16}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`borderWidthX='4px'` and `borderWidthY='10px'`." />{' '}
      Inspect the example to see what CSS properties are rendered based on the
      logical properties mode.
    </Box>
    <Box
      bg="background-selected"
      border={1}
      borderWidthRight="10px"
      borderWidthTop="4px"

      p={16}
      textAlign="center"
    >
      This box has{' '}
      <Markdown text="`borderWidthTop='4px'` and `borderWidthRight='10px'`." />{' '}
      Inspect the example to see what CSS properties are rendered based on the
      logical properties mode.
    </Box>
    </FlexBox>
  ),
};

export const BorderRadiusExample: Story = {
  render: () => (
    <FlexBox gap={16} row>
      <Box
        bg="background-selected"
        border={1}
        borderRadiusLeft="lg"
        borderRadiusRight="none"
        p={16}
        textAlign="center"
      >
        This box has{' '}
        <Markdown text="`borderRadiusLeft='lg'` and `borderRadiusRight='none'`." />{' '}
        Inspect the example to see what CSS properties are rendered based on the
        logical properties mode.
      </Box>
      <Box
        bg="background-selected"
        border={1}
        borderRadiusBottomLeft="xl"
        borderRadiusTopRight="xl"
        p={16}
        textAlign="center"
      >
        This box has{' '}
        <Markdown text="`borderRadiusTopRight='xl'` and `borderRadiusBottomLeft='xl'`." />{' '}
        Inspect the example to see what CSS properties are rendered based on the
        logical properties mode.
      </Box>
    </FlexBox>
  ),
};

export const BorderStyleExample: Story = {
  render: () => (
    <FlexBox gap={16} row>
      <Box
        bg="background-selected"
        border={1}
        borderStyleX="dashed"
        borderStyleY="dotted"
        p={16}
        textAlign="center"
      >
        This box has{' '}
        <Markdown text="`borderStyleX='dashed'` and `borderStyleY='dotted'`." />{' '}
        Inspect the example to see what CSS properties are rendered based on the
        logical properties mode.
      </Box>
      <Box
        bg="background-selected"
        border={1}
        borderStyleBottom="dotted"
        borderStyleLeft="dashed"
        p={16}
        textAlign="center"
      >
        This box has{' '}
        <Markdown text="`borderStyleBottom='dotted'` and `borderStyleLeft='dashed'`." />{' '}
        Inspect the example to see what CSS properties are rendered based on the
        logical properties mode.
      </Box>
    </FlexBox>
  ),
};
