import {
  Anchor,
  Box,
  FlexBox,
  GridBox,
  InfoTip,
  Text,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

const meta: Meta<typeof InfoTip> = {
  component: InfoTip,
  args: {
    alignment: 'top-left',
    info: `I am additional information about a nearby element or content.`,
  },
};

export default meta;
type Story = StoryObj<typeof InfoTip>;

export const Default: Story = {
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info</Text> <InfoTip {...args} />
    </FlexBox>
  ),
};

export const Emphasis: Story = {
  args: {
    emphasis: 'high',
  },
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info</Text> <InfoTip {...args} />
    </FlexBox>
  ),
};

export const Alignments: Story = {
  render: (args) => (
    <GridBox gap={24} gridTemplateColumns="1fr 1fr" ml={8} py={64}>
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map(
        (alignment) => {
          return (
            <Box key={alignment}>
              <Text>{alignment}</Text>
              <InfoTip {...args} alignment={alignment} />
            </Box>
          );
        }
      )}
    </GridBox>
  ),
};

export const Placement: Story = {
  args: {
    placement: 'floating',
  },
  render: (args) => (
    <FlexBox center>
      <Text mr={4}>
        This text is in a small space and needs floating placement
      </Text>{' '}
      <InfoTip {...args} />
    </FlexBox>
  ),
};

export const WithLinksOrButtons: Story = {
  args: {
    placement: 'floating',
  },
  render: function WithLinksOrButtons(args) {
    const ref = useRef<HTMLButtonElement>(null);

    const onClick = ({ isTipHidden }: { isTipHidden: boolean }) => {
      if (!isTipHidden) ref.current?.focus();
    };

    return (
      <FlexBox center py={64}>
        <Text mr={4}>This text is in a small space and needs info </Text>{' '}
        <InfoTip
          {...args}
          info={
            <Text>
              Hey! Here is a{' '}
              <Anchor href="https://giphy.com/search/nichijou" ref={ref}>
                cool link
              </Anchor>{' '}
              that is super important. This is a
              <Anchor href="https://giphy.com/search/nichijou">
                second cool link
              </Anchor>
              that is also super important.
            </Text>
          }
          onClick={onClick}
        />
      </FlexBox>
    );
  },
};

export const ZIndex: Story = {
  args: {
    info: 'I am inline, cool',
    zIndex: 5,
  },
  render: (args) => (
    <FlexBox center flexDirection="column" m={24} py={64}>
      <Box bg="paleBlue" zIndex={3}>
        I will not be behind the infotip, sad + unreadable
      </Box>
      <InfoTip info="I am inline, cool" />
      <Box bg="paleBlue" zIndex={3}>
        I will be behind the infotip, nice + great
      </Box>
      <InfoTip {...args} />
    </FlexBox>
  ),
};
