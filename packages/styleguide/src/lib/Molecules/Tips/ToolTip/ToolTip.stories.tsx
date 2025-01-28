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
        aria-label="Next Prompt"
        tip="Next Prompt"
        icon={ArrowRightIcon}
        variant="secondary"
        tipProps={{ alignment: 'bottom-center', hideAriaToolTip: true }}
      />
    </FlexBox>
  ),
};

export const Floating: Story = {
  render: () => (
    <IconButton
      aria-label="Wonder"
      tip="Wonder at the majesty of the universe"
      icon={SmileyStarEyesIcon}
      tipProps={{ alignment: 'bottom-center', placement: 'floating' }}
      onClick={() => {
        console.log(
          'This is a test, and will be deleted before the PR is merged'
        );
      }}
    />
  ),
};
