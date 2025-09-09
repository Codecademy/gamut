import {
  Box,
  ExpandInCollapseOut,
  FillButton,
  FlexBox,
} from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { AnimatePresence } from 'framer-motion';
import { PropsWithChildren, useState } from 'react';

const meta: Meta<typeof ExpandInCollapseOut> = {
  component: ExpandInCollapseOut,
  args: {
    children:
      "I got bored one day - and I put everything on a bagel. Everything. All my hopes and dreams, my old report cards, every breed of dog, every last personal ad on craigslist. Sesame. Poppy seed. Salt. And it collapsed in on itself. 'Cause, you see, when you really put everything on a bagel, it becomes this.",
  },
};

export default meta;

export const Default: React.FC<PropsWithChildren> = ({ children }) => {
  const [isExpanded, setExpanded] = useState(true);

  return (
    <FlexBox column>
      <Box>
        <FillButton onClick={() => setExpanded(!isExpanded)}>
          Look, the text expands in and collapses out!
        </FillButton>
      </Box>
      <Box mt={8}>
        <AnimatePresence>
          {isExpanded && <ExpandInCollapseOut>{children}</ExpandInCollapseOut>}
        </AnimatePresence>
      </Box>
    </FlexBox>
  );
};
