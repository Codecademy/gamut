import { Box, Tag } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  component: Tag,
  args: {
    children: 'Tag',
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Grey: Story = {
  args: {
    variant: 'grey',
  },
};

export const ReadOnly: Story = {
  args: {
    readonly: true,
  },
};

export const Truncated: Story = {
  render: (args) => (
    <Box width="12rem">
      <Tag {...args}>I am long tag yes I am much am a very long tag</Tag>
    </Box>
  ),
};
