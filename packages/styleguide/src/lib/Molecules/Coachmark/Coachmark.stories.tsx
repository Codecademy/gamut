import {
  Coachmark,
  CoachmarkProps,
  FillButton,
  FlexBox,
  Text,
} from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Coachmark> = {
  component: Coachmark,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Coachmark>;

export const CoachmarkExample = (args: CoachmarkProps) => {
  const [shouldShow, setShouldShow] = useState(
    args.shouldShow === undefined ? true : args.shouldShow
  );

  const renderPopover = () => (
    <FlexBox flexDirection="column" p={16} alignItems="flex-start">
      <Text mb={8}>You should click the button.</Text>
      <FillButton
        onClick={() => {
          setShouldShow(false);
        }}
        size="small"
      >
        Got it
      </FillButton>
    </FlexBox>
  );

  return (
    <Coachmark
      {...args}
      // delay={args.delay ?? 0}
      delay={750}
      renderPopover={renderPopover}
      shouldShow={shouldShow}
    >
      <FillButton onClick={() => setShouldShow(true)}>A Button</FillButton>
    </Coachmark>
  );
};

export const Default: Story = {
  render: (props) => <CoachmarkExample {...props} />,
};

export const Customized: Story = {
  render: (props) => (
    <CoachmarkExample
      {...props}
      popoverProps={{
        beak: 'left',
        outline: true,
        pattern: CheckerDense,
      }}
    />
  ),
};

export const ShouldShow: Story = {
  render: (props) => (
    <CoachmarkExample
      {...props}
      shouldShow={false}
      popoverProps={{
        beak: 'left',
        outline: true,
        pattern: CheckerDense,
      }}
    />
  ),
};

export const Delay: Story = {
  render: (props) => (
    <CoachmarkExample
      {...props}
      delay={3000}
      shouldShow={false}
      popoverProps={{
        beak: 'left',
        outline: true,
        pattern: CheckerDense,
      }}
    />
  ),
};
