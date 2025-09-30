import { Box, FlexBox, Tag } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  component: Tag,
  args: {
    children: 'Tag',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
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
        <Tag size="large" {...args}>
          Large read-only
        </Tag>
      </Box>
    </FlexBox>
  ),
};

export const Selection: Story = {
  args: {
    variant: 'selection',
    onDismiss: () => {},
  },
  render: (args) => (
    <FlexBox gap={24}>
      <Box>
        <Tag {...args}>Selection</Tag>
      </Box>
      <Box>
        <Tag size="large" {...args}>
          Large selection
        </Tag>
      </Box>
      <Box>
        <Tag disabled {...args}>
          Selection disabled
        </Tag>
      </Box>
      <Box>
        <Tag disabled size="large" {...args}>
          Large selection disabled
        </Tag>
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
        <Tag size="large" {...args}>
          Large navigation
        </Tag>
      </Box>
      <Box>
        <Tag disabled {...args}>
          Navigation disabled
        </Tag>
      </Box>
      <Box>
        <Tag disabled size="large" {...args}>
          Large navigation disabled
        </Tag>
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
        <Tag size="large" {...args}>
          Large suggestion
        </Tag>
      </Box>
      <Box>
        <Tag disabled {...args}>
          Suggestion disabled
        </Tag>
      </Box>
      <Box>
        <Tag disabled size="large" {...args}>
          Large suggestion disabled
        </Tag>
      </Box>
    </FlexBox>
  ),
};

export const WithIcon: Story = {
  args: {},
  render: () => (
    <FlexBox column>
      <FlexBox row>
        <Box mx={4}>
          <Tag icon={icons.MiniStarIcon} variant="readOnly">
            Gotcha!
          </Tag>
        </Box>
        <Box mx={4}>
          <Tag
            icon={icons.MiniPinIcon}
            variant="selection"
            onDismiss={() => null}
          >
            Tag!
          </Tag>
        </Box>
        <Box mx={4}>
          <Tag href="" icon={icons.MiniCheckCircleIcon} variant="navigation">
            You&apos;re it!
          </Tag>
        </Box>
        <Box mx={4}>
          <Tag
            icon={icons.MiniRemoveCircleIcon}
            variant="suggestion"
            onClick={() => null}
          >
            No tagbacks!
          </Tag>
        </Box>
      </FlexBox>
      <FlexBox mt={12} row>
        <Box mx={4}>
          <Tag icon={icons.MiniChevronDownIcon} size="large" variant="readOnly">
            Duck,
          </Tag>
        </Box>
        <Box mx={4}>
          <Tag
            icon={icons.MiniChevronDownIcon}
            size="large"
            variant="selection"
            onDismiss={() => null}
          >
            Duck,
          </Tag>
        </Box>
        <Box mx={4}>
          <Tag
            href=""
            icon={icons.MiniKebabMenuIcon}
            size="large"
            variant="navigation"
          >
            Duck...
          </Tag>
        </Box>
        <Box mx={4}>
          <Tag
            icon={icons.MiniChevronUpIcon}
            size="large"
            variant="suggestion"
            onClick={() => null}
          >
            Goose!
          </Tag>
        </Box>
      </FlexBox>
    </FlexBox>
  ),
};

export const Overflow: Story = {
  args: {
    variant: 'selection',
  },
  render: (args) => (
    <Box width="12rem">
      <Tag {...args}>I am long tag yes I am much am a very long tag</Tag>
    </Box>
  ),
};
