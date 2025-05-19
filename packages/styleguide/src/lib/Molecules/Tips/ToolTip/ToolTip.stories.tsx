import { FillButton, FlexBox, IconButton, ToolTip } from '@codecademy/gamut';
import {
  ArrowRightIcon,
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
    <FlexBox center m={24} py={64}>
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
        icon={SparkleIcon}
        tip="Beautify your code"
        tipProps={{ alignment: 'bottom-center' }}
      />
      <IconButton
        aria-label="Next Prompt"
        icon={ArrowRightIcon}
        tip="Next Prompt"
        tipProps={{ alignment: 'bottom-center', hideAriaToolTip: true }}
        variant="secondary"
      />
    </FlexBox>
  ),
};

export const Floating: Story = {
  render: () => (
    <IconButton
      aria-label="Wonder"
      icon={SmileyStarEyesIcon}
      tip="Wonder at the majesty of the universe"
      tipProps={{ alignment: 'bottom-center', placement: 'floating' }}
    />
  ),
};
