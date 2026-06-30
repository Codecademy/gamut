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
    <FlexBox center justifyContent="space-around">
      <ToolTip id="stroke-button-ex" info="And here's a tooltip">
        <StrokeButton aria-describedby="stroke-button-ex">
          I&apos;ve got my own text
        </StrokeButton>
      </ToolTip>
      <ToolTip
        alignment="left-center"
        id="floating-ex-lc"
        info="Tooltip for a FillButton"
        placement="floating"
      >
        <FillButton aria-describedby="floating-ex-lc" icon={StudyBookIcon}>
          Left center
        </FillButton>
      </ToolTip>
      <ToolTip
        alignment="right-center"
        id="floating-ex-rc"
        info="Tooltip for a FillButton"
        placement="floating"
      >
        <FillButton aria-describedby="floating-ex-rc" icon={StudyBookIcon}>
          Right center
        </FillButton>
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

export const CloseOnClick: Story = {
  render: () => (
    <FlexBox center justifyContent="space-around" pt={48}>
      <ToolTip
        closeOnClick
        id="coc-floating"
        info="Closes on click (floating)"
        placement="floating"
      >
        <StrokeButton aria-describedby="coc-floating">Floating</StrokeButton>
      </ToolTip>
      <ToolTip
        closeOnClick
        id="coc-inline"
        info="Closes on click (inline)"
        placement="inline"
      >
        <StrokeButton aria-describedby="coc-inline">Inline</StrokeButton>
      </ToolTip>
      <ToolTip
        closeOnClick={false}
        id="stays-floating"
        info="Stays open on click (floating)"
        placement="floating"
      >
        <StrokeButton aria-describedby="stays-floating">
          Floating (stays open)
        </StrokeButton>
      </ToolTip>
      <ToolTip
        closeOnClick={false}
        id="stays-inline"
        info="Stays open on click (inline)"
        placement="inline"
      >
        <StrokeButton aria-describedby="stays-inline">
          Inline (stays open)
        </StrokeButton>
      </ToolTip>
    </FlexBox>
  ),
};

export const HorizontalAlignments: Story = {
  render: () => (
    <>
      <FlexBox center width="95%">
        Check me out with `dir=rtl` using the toolbar!
      </FlexBox>
      <FlexBox justifyContent="space-around" width="95%">
        <IconButton
          icon={SparkleIcon}
          tip="Inline (Leading)"
          tipProps={{ alignment: 'left-center' }}
        />
        <IconButton
          icon={SparkleIcon}
          tip="Inline (Trailing)"
          tipProps={{ alignment: 'right-center' }}
        />
        <IconButton
          icon={SparkleIcon}
          tip="Floating (Leading)"
          tipProps={{ alignment: 'left-center', placement: 'floating' }}
        />
        <IconButton
          icon={DeleteIcon}
          tip="Floating (Trailing)"
          tipProps={{ alignment: 'right-center', placement: 'floating' }}
        />
      </FlexBox>
    </>
  ),
};
