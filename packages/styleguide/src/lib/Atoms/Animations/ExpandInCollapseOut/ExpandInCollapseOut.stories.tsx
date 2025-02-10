import {
  Box,
  ExpandInCollapseOut,
  FillButton,
  FlexBox,
  Text,
} from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const meta: Meta<typeof ExpandInCollapseOut> = {
  component: ExpandInCollapseOut,
  args: {},
};

export default meta;

export const Default: React.FC = () => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <FlexBox column>
      <Box>
        <FillButton onClick={() => setExpanded(!isExpanded)}>
          Look, the text expands in and collapses out!
        </FillButton>
      </Box>
      <Box mt={8}>
        <AnimatePresence>
          {isExpanded && (
            <ExpandInCollapseOut>
              <Text>
                I got bored one day - and I put everything on a bagel.
                Everything. All my hopes and dreams, my old report cards, every
                breed of dog, every last personal ad on craigslist. Sesame.
                Poppy seed. Salt. And it collapsed in on itself. &apos;Cause,
                you see, when you really put everything on a bagel, it becomes
                this.
              </Text>
            </ExpandInCollapseOut>
          )}
        </AnimatePresence>
      </Box>
    </FlexBox>
  );
};
