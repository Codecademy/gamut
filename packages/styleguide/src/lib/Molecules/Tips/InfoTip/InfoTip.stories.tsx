import {
  Anchor,
  Box,
  FlexBox,
  GridBox,
  InfoTip,
  Text,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';

const meta: Meta<typeof InfoTip> = {
  component: InfoTip,
  args: {
    alignment: 'top-left',
    info: `I am additional information about a nearby element or content.`,
  },
};

export default meta;
type Story = StoryObj<typeof InfoTip>;

type InfoTipProps = React.ComponentProps<typeof InfoTip>;

const InfoTipExample: React.FC<InfoTipProps> = (args) => {
  return (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info</Text> <InfoTip {...args} />
    </FlexBox>
  );
};

export const Default: Story = {
  render: (args) => <InfoTipExample {...args} />,
};

const EmphasisExample: React.FC<InfoTipProps> = (args) => {
  return (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info and its super important</Text>{' '}
      <InfoTip emphasis="high" {...args} />
    </FlexBox>
  );
};

export const Emphasis: Story = {
  render: (args) => <EmphasisExample {...args} />,
};

const AlignmentsExample: React.FC<InfoTipProps> = (args) => {
  return (
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
  );
};

export const Alignments: Story = {
  render: (args) => <AlignmentsExample {...args} />,
};

const PlacementExample: React.FC<InfoTipProps> = (args) => {
  return (
    <FlexBox center>
      <Text mr={4}>
        This text is in a small space and needs floating placement
      </Text>{' '}
      <InfoTip placement="floating" {...args} />
    </FlexBox>
  );
};

export const Placement: Story = {
  render: (args) => <PlacementExample {...args} />,
};

const WithLinksOrButtonsExample: React.FC<InfoTipProps> = ({ args }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const onClick = ({ isTipHidden }: { isTipHidden: boolean }) => {
    if (!isTipHidden) ref.current?.focus();
  };

  return (
    <FlexBox center py={64}>
      <Text mr={4}>This text is in a small space and needs info </Text>
      <InfoTip info="I am cool" placement="floating" {...args} />
      <Text mr={4}>This text is in a small space and needs info </Text>{' '}
      <InfoTip
        info={
          <Text>
            Hey! Here is a{' '}
            <Anchor href="https://giphy.com/search/nichijou" ref={ref}>
              cool link
            </Anchor>{' '}
            that is super important.
          </Text>
        }
        placement="floating"
        onClick={onClick}
        {...args}
      />
    </FlexBox>
  );
};

export const WithLinksOrButtons: Story = {
  render: (args) => <WithLinksOrButtonsExample {...args} />,
};

const ZIndexExample: React.FC<InfoTipProps> = () => {
  return (
    <FlexBox center flexDirection="column" m={24} py={64}>
      <Box bg="paleBlue" zIndex={3}>
        I will not be behind the infotip, sad + unreadable
      </Box>
      <InfoTip info="I am inline, cool" />
      <Box bg="paleBlue" zIndex={3}>
        I will be behind the infotip, nice + great
      </Box>
      <InfoTip info="I am inline, cool" zIndex={5} />
    </FlexBox>
  );
};

export const ZIndex: Story = {
  render: (args) => <ZIndexExample {...args} />,
};
