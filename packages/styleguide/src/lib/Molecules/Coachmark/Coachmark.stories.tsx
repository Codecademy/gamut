import { Coachmark, FillButton, FlexBox, Text } from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Coachmark> = {
  component: Coachmark,
  args: {},
  argTypes: {
    skipFocusTrap: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Coachmark>;

export const Default: React.FC<ComponentProps<typeof Coachmark>> = (args) => {
  const [shouldShow, setShouldShow] = useState(args.shouldShow);

  useEffect(() => {
    setShouldShow(args.shouldShow);
  }, [args.shouldShow]);

  return (
    <Coachmark
      {...args}
      renderPopover={() => (
        <FlexBox alignItems="flex-start" flexDirection="column" p={16}>
          <Text mb={8}>You should click the button.</Text>
          <FillButton
            size="small"
            onClick={() => {
              setShouldShow(false);
            }}
          >
            Got it
          </FillButton>
        </FlexBox>
      )}
      shouldShow={shouldShow}
    >
      <FillButton onClick={() => setShouldShow(true)}>A Button</FillButton>
    </Coachmark>
  );
};

export const Customized: Story = {
  render: (props) => (
    <Default
      {...props}
      popoverProps={{
        beak: 'left',
        outline: true,
        pattern: CheckerDense,
        position: 'above',
      }}
    />
  ),
};

export const ShouldShow: Story = {
  render: (props) => (
    <Default
      {...props}
      popoverProps={{
        beak: 'left',
        outline: true,
        pattern: CheckerDense,
      }}
      shouldShow={false}
    />
  ),
};

export const Delay: Story = {
  render: (props) => (
    <Default
      {...props}
      delay={3000}
      popoverProps={{
        beak: 'left',
        outline: true,
        pattern: CheckerDense,
      }}
      shouldShow={false}
    />
  ),
};
