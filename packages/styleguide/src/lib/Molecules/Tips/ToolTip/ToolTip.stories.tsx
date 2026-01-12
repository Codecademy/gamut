import {
  Box,
  FillButton,
  FlexBox,
  IconButton,
  StrokeButton,
  Text,
  ToolTip,
} from '@codecademy/gamut';
import {
  ArrowRightIcon,
  DeleteIcon,
  SmileyStarEyesIcon,
  SparkleIcon,
  StudyBookIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ToolTip> = {
  component: ToolTip,
  args: { id: 'fill-id', info: 'Tooltip' },
};

export default meta;
type Story = StoryObj<typeof ToolTip>;

export const Default: Story = {
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <ToolTip {...args}>
        <FillButton aria-describedby="fill-id" icon={SparkleIcon}>
          Click me
        </FillButton>
      </ToolTip>
    </FlexBox>
  ),
};

const alignments = [
  'top-center',
  'bottom-center',
  'left-center',
  'right-center',
] as const;

export const Alignments: Story = {
  render: () => (
    <FlexBox justifyContent="space-around" m={24} width="95%">
      {alignments.map((alignment) => {
        return (
          <IconButton
            icon={SparkleIcon}
            tip={alignment}
            tipProps={{ alignment }}
          />
        );
      })}
    </FlexBox>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <FlexBox justifyContent="space-around" m={24} width="95%">
      <IconButton
        icon={SparkleIcon}
        tip="Wonder at the majesty of the universe"
        tipProps={{ alignment: 'left-center' }}
      />
      <IconButton
        icon={ArrowRightIcon}
        tip="Next Prompt"
        tipProps={{ alignment: 'bottom-center' }}
        variant="secondary"
      />
    </FlexBox>
  ),
};

export const Floating: Story = {
  render: () => (
    <FlexBox center justifyContent="space-around">
      <IconButton
        icon={SmileyStarEyesIcon}
        tip="Wonder at the majesty of the universe"
        tipProps={{ alignment: 'bottom-center', placement: 'floating' }}
      />
      <ToolTip
        id="floating-ex"
        info="Tooltip for a FillButton"
        placement="floating"
      >
        <FillButton aria-describedby="floating-ex" icon={StudyBookIcon}>
          Also floating
        </FillButton>
      </ToolTip>
      <IconButton
        icon={SmileyStarEyesIcon}
        tip="Wonder at the majesty of the universe"
        tipProps={{ alignment: 'right-center', placement: 'floating' }}
      />
      <IconButton
        icon={SmileyStarEyesIcon}
        tip="Wonder at the majesty of the universe"
        tipProps={{ alignment: 'left-center', placement: 'floating' }}
      />
    </FlexBox>
  ),
};

export const InteractiveElement: Story = {
  render: () => (
    <FlexBox center m={32}>
      <ToolTip id="stroke-button-ex" info="And here's a tooltip">
        <StrokeButton aria-describedby="stroke-button-ex">
          I&apos;ve got my own text
        </StrokeButton>
      </ToolTip>
    </FlexBox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FlexBox center m={24}>
      <ToolTip id="disabled-ex" info="Tooltip still shows" placement="floating">
        <FillButton
          aria-describedby="disabled-ex"
          aria-disabled
          icon={DeleteIcon}
        >
          Using aria-disabled
        </FillButton>
      </ToolTip>
    </FlexBox>
  ),
};

export const ZIndex: Story = {
  render: () => (
    <FlexBox center flexDirection="column" gap={16} m={24} py={64}>
      <Text variant="p-small">Inline placement:</Text>
      <FlexBox alignItems="center" gap={16}>
        <Box bg="paleBlue" p={8} zIndex={3} position="relative">
          z-index: 3
        </Box>
        <ToolTip id="zindex-inline-default" info="Default z-index (inline)">
          <FillButton aria-describedby="zindex-inline-default">
            Default
          </FillButton>
        </ToolTip>
        <Box bg="paleBlue" p={8} zIndex={3} position="relative">
          z-index: 3
        </Box>
        <ToolTip id="zindex-inline-custom" info="z-index: 5 (inline)" zIndex={5}>
          <FillButton aria-describedby="zindex-inline-custom">
            z-index: 5
          </FillButton>
        </ToolTip>
      </FlexBox>

      <Text variant="p-small" mt={24}>
        Floating placement:
      </Text>
      <FlexBox alignItems="center" gap={16}>
        <Box bg="paleGreen" p={8} zIndex={3} position="relative">
          z-index: 3
        </Box>
        <ToolTip
          id="zindex-floating-default"
          info="Default z-index (floating)"
          placement="floating"
        >
          <FillButton aria-describedby="zindex-floating-default">
            Default
          </FillButton>
        </ToolTip>
        <Box bg="paleGreen" p={8} zIndex={3} position="relative">
          z-index: 3
        </Box>
        <ToolTip
          id="zindex-floating-custom"
          info="z-index: 5 (floating)"
          placement="floating"
          zIndex={5}
        >
          <FillButton aria-describedby="zindex-floating-custom">
            z-index: 5
          </FillButton>
        </ToolTip>
      </FlexBox>
    </FlexBox>
  ),
};
