import { Box, GridBox } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GridBox> = {
  component: GridBox,
  args: { justifyContent: 'space-around' },
};

export default meta;
type Story = StoryObj<typeof GridBox>;

export const Default: Story = {
  render: (args) => {
    const elProps = {
      border: 1,
      p: 16,
    } as const;
    return (
      <GridBox {...args}>
        <Box {...elProps}>Child Element 1</Box>
        <Box {...elProps}>Child Element 2</Box>
      </GridBox>
    );
  },
};

export const FourColumnGrid: Story = {
  render: () => {
    const elProps = {
      border: 1,
      p: 16,
    } as const;
    return (
      <GridBox columnGap={16} gridAutoColumns="1fr" gridAutoFlow="column">
        <Box {...elProps}>Child Element 1</Box>
        <Box {...elProps}>Child Element 2</Box>
        <Box {...elProps}>Child Element 3</Box>
        <Box {...elProps}>Child Element 4</Box>
      </GridBox>
    );
  },
};
