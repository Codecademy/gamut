import { Box, FadeInSlideOut, FillButton, FlexBox } from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const meta: Meta<typeof FadeInSlideOut> = {
  component: FadeInSlideOut,
  args: {},
};

export default meta;

export const Default: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FlexBox column>
      <Box>
        <FillButton onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Thanks!' : 'Click me.'}
        </FillButton>
      </Box>
      <Box height="50px" mt={8}>
        <AnimatePresence>
          {isVisible && (
            <FadeInSlideOut>
              <Box border={1} p={8}>
                Even in a stupid, stupid universe where we have hot dogs for
                fingers, we get very good with our feet.
              </Box>
            </FadeInSlideOut>
          )}
        </AnimatePresence>
      </Box>
    </FlexBox>
  );
};
