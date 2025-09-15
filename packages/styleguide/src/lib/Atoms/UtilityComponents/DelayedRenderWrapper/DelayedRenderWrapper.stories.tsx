import {
  Box,
  DelayedRenderWrapper,
  FillButton,
  FlexBox,
  Text,
} from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { ComponentProps, useState } from 'react';

const meta: Meta<typeof DelayedRenderWrapper> = {
  component: DelayedRenderWrapper,
  args: { delay: 1000 },
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

export const Default: React.FC<ComponentProps<typeof DelayedRenderWrapper>> = ({
  delay,
}) => {
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
