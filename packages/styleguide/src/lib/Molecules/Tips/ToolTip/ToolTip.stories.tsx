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
        tip="Next"
        icon={ArrowRightIcon}
        variant="secondary"
        tipProps={{ alignment: 'right-center', hideAriaToolTip: true }}
      />
    </FlexBox>
  ),
};

export const Floating: Story = {
  render: () => (
    <FlexBox justifyContent="space-around" m={24} width="95%">
      <IconButton
        tip="Wonder at the"
        icon={SmileyStarEyesIcon}
        tipProps={{ placement: 'floating' }}
      />
      <IconButton
        tip="Wonder at the majesty of the universe"
        icon={SmileyStarEyesIcon}
        tipProps={{ alignment: 'left-center', placement: 'floating' }}
      />
      <IconButton
        tip="Woah"
        icon={SmileyStarEyesIcon}
        tipProps={{ alignment: 'right-center', placement: 'floating' }}
      />
    </FlexBox>
  ),
};
