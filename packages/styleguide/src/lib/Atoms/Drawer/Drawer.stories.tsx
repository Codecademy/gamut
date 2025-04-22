import { Drawer, FlexBox, StrokeButton } from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { useId, useState } from 'react';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  args: {},
};

export default meta;

export const Default: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <FlexBox bg="paleYellow" height="20rem">
      <Drawer expanded={expanded}>
        Drawer content in here!
      </Drawer>
      <StrokeButton
        aria-expanded={expanded}
        onClick={() => setExpanded((previousExpanded) => !previousExpanded)}
      >
        Toggle Drawer
      </StrokeButton>
    </FlexBox>
  );
};
