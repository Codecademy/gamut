import { Box, Tag } from '@codecademy/gamut';
import { MiniStarIcon } from '@codecademy/gamut-icons';
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
    variant: 'readOnly',
  },
};

export const ReadOnlyLarge: Story = {
  args: {
    size: 'large',
  }
}

export const Selection: Story = {
  args: {
    variant: 'selection',
    onDismiss: () => {console.log('yo')}
  },
};

export const SelectionLarge: Story = {
  args: {
    variant: 'selection',
    size: 'large',
  },
};

export const Navigation: Story = {
  args: {
    variant: 'navigation',
    href: 'https://www.codecademy.com',
  },
};

export const Suggestion: Story = {
  args: {
    variant: 'suggestion',
  },
};

export const ReadOnly: Story = {
  args: {
    variant: 'selection',
    size: 'large',
    icon: MiniStarIcon,
  },
};

export const Truncated: Story = {
  args: {
    variant: 'selection'
  },
  render: (args) => (
    <Box width="12rem">
      <Tag {...args}>I am long tag yes I am much am a very long tag I am long tag yes I am much am a very long tag I am long tag yes I am much am a very long tag I am long tag yes I am much am a very long tag</Tag>
    </Box>
  ),
};
