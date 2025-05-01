import {
  Box,
  DelayedRenderWrapper,
  FillButton,
  FlexBox,
  Text,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof DelayedRenderWrapper> = {
  component: DelayedRenderWrapper,
  args: {},
  argTypes: {
    delay: {
      control: {
        type: 'number',
        min: 0,
        step: 500,
      },
      description: 'Delay in milliseconds before rendering children',
      defaultValue: 1000,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DelayedRenderWrapper>;

const DelayedRenderExample = ({ delay }: { delay: number }) => {
  const [showChildren, setShowChildren] = useState(false);
  return (
    <>
      <FlexBox column gap={16}>
        <Box>
          <FillButton onClick={() => setShowChildren(!showChildren)}>
            Render!
          </FillButton>
        </Box>
        {showChildren && (
          <DelayedRenderWrapper delay={showChildren ? delay : 0}>
            <Text>
              This text will be delayed by {delay} milliseconds before
              rendering.
            </Text>
          </DelayedRenderWrapper>
        )}
      </FlexBox>
    </>
  );
};

export const ZeroSecondsDelay: Story = {
  render: () => <DelayedRenderExample delay={0} />,
};

export const ThreeSecondDelay: Story = {
  render: () => <DelayedRenderExample delay={3000} />,
};

export const Default: Story = {
  args: { delay: 1000 },
  render: (args) => <DelayedRenderExample delay={args.delay} />,
};
