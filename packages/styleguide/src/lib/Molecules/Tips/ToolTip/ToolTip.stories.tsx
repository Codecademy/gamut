import { FillButton, FlexBox, IconButton, StrokeButton, ToolTip } from '@codecademy/gamut';
import {
  ArrowRightIcon,
  DeleteIcon,
  SmileyStarEyesIcon,
  SparkleIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ToolTip> = {
  component: ToolTip,
  args: {},
};

export default meta;
type Story = StoryObj<typeof ToolTip>;

export const Default: Story = {
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

export const WithIconButton: Story = {
  render: () => (
    <FlexBox justifyContent="space-around" m={24} width="95%">
      <IconButton
        tip="Beautify your code"
        icon={SparkleIcon}
        tipProps={{ alignment: 'bottom-center' }}
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
    <IconButton
      tip="Wonder at the majesty of the universe"
      icon={SmileyStarEyesIcon}
      tipProps={{ alignment: 'bottom-center', placement: 'floating' }}
    />
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
      <ToolTip id="fill-id" info="Tooltip still shows">
        <FillButton aria-describedby="fill-id" aria-disabled icon={DeleteIcon}>
          Using aria-disabled
        </FillButton>
      </ToolTip>
    </FlexBox>
  ),
};
