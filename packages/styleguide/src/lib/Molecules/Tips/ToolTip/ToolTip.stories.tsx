import {
  FillButton,
  FlexBox,
  IconButton,
  StrokeButton,
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

export const AriaDisabled: Story = {
  render: () => (
    <FlexBox center py={64} m={24}>
      <ToolTip id="fill-id" info="Tooltip">
        <FillButton aria-describedby="fill-id" aria-disabled icon={SparkleIcon}>
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
            tip={alignment}
            icon={SparkleIcon}
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
        tip="Wonder at the majesty of the universe"
        icon={SparkleIcon}
        tipProps={{ alignment: 'left-center' }}
      />
      <IconButton
        tip="Next Prompt"
        icon={ArrowRightIcon}
        variant="secondary"
        tipProps={{ alignment: 'bottom-center' }}
      />
    </FlexBox>
  ),
};

export const Floating: Story = {
  render: () => (
    <FlexBox center m={24} justifyContent="space-around">
      <IconButton
        tip="Wonder at the majesty of the universe"
        icon={SmileyStarEyesIcon}
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

export const Default: Story = {
  render: (args) => (
    <FlexBox center py={64} m={24}>
      <ToolTip {...args}>
        <FillButton aria-describedby="fill-id" icon={SparkleIcon}>
          Click me
        </FillButton>
      </ToolTip>
    </FlexBox>
  ),
};
