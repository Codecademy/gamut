import { Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import {
  AlertIcon,
  BookFlipPageIcon,
  BookFlippyPageIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AlertIcon> = {
  component: AlertIcon,
  args: {},
};

export default meta;
type Story = StoryObj<typeof AlertIcon>;

export const TestStory: Story = {
  render: () => (
    <>
      <FlexBox flexDirection="column">
        <Text as="code" width="100%">
          different stroke-widths
        </Text>
        <GridBox gridTemplateColumns="1fr 1fr 1fr" gridTemplateRows="1fr 1fr">
          <FlexBox flexDirection="column">
            <Text>1.5</Text>
            <BookFlipPageIcon size={100} />
          </FlexBox>
          <FlexBox flexDirection="column">
            <Text>1.5px</Text>
            <BookFlipPageIcon size={100} strokeWidth="1.5px" />
          </FlexBox>
          <FlexBox flexDirection="column">
            <Text>.8</Text>
            <BookFlipPageIcon size={100} strokeWidth={0.8} />
          </FlexBox>
        </GridBox>
      </FlexBox>
      <FlexBox flexDirection="column">
        <Text as="code" width="100%">
          vector-effect="non-scaling-stroke"
        </Text>
        <GridBox gap={4}>
          <BookFlippyPageIcon size={20} />
          <BookFlippyPageIcon size={40} />
          <BookFlippyPageIcon size={60} />
          <BookFlippyPageIcon size={300} />
          <BookFlippyPageIcon size={400} />
          <BookFlippyPageIcon size={500} />
        </GridBox>
      </FlexBox>
    </>
  ),
};
export const Default: Story = {
  args: {
    size: 40,
  },
};
