import { Box, FlexBox, Tag } from '@codecademy/gamut';
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
    children: 'Read-only',
    variant: 'readOnly',
  },
};

export const ReadOnlyLarge: Story = {
  args: {
    children: 'Large read-only',
    size: 'large',
  }
}

export const Selection: Story = {
  args: {
    variant: 'selection',
    children: 'Selection',
    onDismiss: () => {}
  },
};

export const SelectionLarge: Story = {
  args: {
    variant: 'selection',
    children: 'Large selection',
    size: 'large',
    onDismiss: () => {}
  },
};

export const SelectionDisabled: Story = {
  args: {
    variant: 'selection',
    children: 'Disabled selection',
    onDismiss: () => {},
    disabled: true,
  },
};

export const Navigation: Story = {
  args: {
    variant: 'navigation',
    children: 'Navigation',
    href: '/',
  },
};

export const NavigationLarge: Story = {
  args: {
    variant: 'navigation',
    children: 'Large navigation',
    href: '/',
    size: 'large',
  },
};

export const NavigationDisabled: Story = {
  args: {
    variant: 'navigation',
    children: 'Navigation disabled',
    href: '/',
    disabled: true,
  },
};

export const Suggestion: Story = {
  args: {
    variant: 'suggestion',
    children: 'Suggestion',
    onClick: () => {},
  },
};

export const SuggestionLarge: Story = {
  args: {
    variant: 'suggestion',
    children: 'Large suggestion',
    onClick: () => {},
    size: 'large',
  },
};

export const SuggestionDisabled: Story = {
  args: {
    variant: 'suggestion',
    children: 'Suggestion disabled',
    onClick: () => {},
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    icon: MiniStarIcon,
  },
  render: (args) => (
    <FlexBox column>
      <FlexBox row>
        <Box mx={2}>
          <Tag variant='readOnly' {...args}>Gotcha!</Tag>
        </Box>
        <Box mx={2}>
          <Tag variant='selection' {...args}>Tag!</Tag>
        </Box>
        <Box mx={2}>
          <Tag variant='suggestion' {...args}>You&apos;re it!</Tag>
        </Box>
        <Box mx={2}>
          <Tag variant='navigation' href="" {...args}>No tagbacks!</Tag>
        </Box>
      </FlexBox>
      <FlexBox row mt={10}>
        <Box mx={2}>
          <Tag size="large" variant='readOnly' {...args}>Duck,</Tag>
        </Box>
        <Box mx={2}>
          <Tag size="large" variant='selection' {...args}>Duck,</Tag>
        </Box>
        <Box mx={2}>
          <Tag size="large" variant='suggestion' {...args}>Duck...</Tag>
        </Box>
        <Box mx={2}>
          <Tag size="large" variant='navigation' href="" {...args}>Goose!</Tag>
        </Box>
    </FlexBox>
  </FlexBox>
  )
};

export const Overflow: Story = {
  args: {
    variant: 'selection'
  },
  render: (args) => (
    <Box width="12rem">
      <Tag {...args}>I am long tag yes I am much am a very long tag</Tag>
    </Box>
  ),
};
