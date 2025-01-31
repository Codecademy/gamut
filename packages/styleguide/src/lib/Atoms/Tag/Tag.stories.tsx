import { Box, FlexBox, Tag } from '@codecademy/gamut';
import { MiniCheckCircleIcon, MiniChevronDownIcon, MiniChevronUpIcon,MiniKebabMenuIcon, MiniPinIcon,MiniRemoveCircleIcon, MiniStarIcon } from '@codecademy/gamut-icons';
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

export const ReadOnly: Story = {
  args: {
    variant: 'readOnly',
  },
  render: (args) => (
    <FlexBox gap={24}>
      <Box>
        <Tag {...args}>Read-only</Tag>
      </Box>
      <Box>
        <Tag size="large" {...args}>Large read-only</Tag>
      </Box>
    </FlexBox>
  ),
}

export const Selection: Story = {
  args: {
    variant: 'selection',
    onDismiss: () => {}
  },
  render: (args) => (
    <FlexBox gap={24}>
      <Box>
        <Tag {...args}>Selection</Tag>
      </Box>
      <Box>
        <Tag size="large" {...args}>Large selection</Tag>
      </Box>
      <Box>
        <Tag disabled {...args}>Selection disabled</Tag>
      </Box>
      <Box>
        <Tag disabled size="large" {...args}>Large selection disabled</Tag>
      </Box>
    </FlexBox>
  ),
};

export const Navigation: Story = {
  args: {
    variant: 'navigation',
    href: '/',
  },
  render: (args) => (
    <FlexBox gap={24}>
      <Box>
        <Tag {...args}>Navigation</Tag>
      </Box>
      <Box>
        <Tag size="large" {...args}>Large navigation</Tag>
      </Box>
      <Box>
        <Tag disabled {...args}>Navigation disabled</Tag>
      </Box>
      <Box>
        <Tag disabled size="large" {...args}>Large navigation disabled</Tag>
      </Box>
    </FlexBox>
  ),
};


export const Suggestion: Story = {
  args: {
    variant: 'suggestion',
    onClick: () => {},
  },
  render: (args) => (
    <FlexBox gap={24}>
      <Box>
        <Tag {...args}>Suggestion</Tag>
      </Box>
      <Box>
        <Tag size="large" {...args}>Large suggestion</Tag>
      </Box>
      <Box>
        <Tag disabled {...args}>Suggestion disabled</Tag>
      </Box>
      <Box>
        <Tag disabled size="large" {...args}>Large suggestion disabled</Tag>
      </Box>
    </FlexBox>
  ),
};


export const WithIcon: Story = {
  args: {

  },
  render: () => (
    <FlexBox column>
      <FlexBox row>
        <Box mx={4}>
          <Tag  variant='readOnly' icon={MiniStarIcon} >Gotcha!</Tag>
        </Box>
        <Box mx={4}>
          <Tag onDismiss={() => null} variant='selection' icon={MiniPinIcon} >Tag!</Tag>
        </Box>
        <Box mx={4}>
          <Tag variant='navigation' href="" icon={MiniCheckCircleIcon} >You&apos;re it!</Tag>
        </Box>
        <Box mx={4}>
          <Tag onClick={() => null} variant='suggestion' icon={MiniRemoveCircleIcon}>No tagbacks!</Tag>
        </Box>
      </FlexBox>
      <FlexBox row mt={12}>
        <Box mx={4}>
          <Tag size="large" variant='readOnly' icon={MiniChevronDownIcon}>Duck,</Tag>
        </Box>
        <Box mx={4}>
          <Tag onDismiss={() => null} size="large" variant='selection' icon={MiniChevronDownIcon}>Duck,</Tag>
        </Box>
        <Box mx={4}>
          <Tag size="large" variant='navigation' href="" icon={MiniKebabMenuIcon}>Duck...</Tag>
        </Box>
        <Box mx={4}>
          <Tag onClick={() => null} size="large" variant='suggestion'  icon={MiniChevronUpIcon}>Goose!</Tag>
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
