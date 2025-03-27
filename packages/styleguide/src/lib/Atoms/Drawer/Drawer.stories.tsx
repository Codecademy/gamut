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
  const drawerId = useId();
  return (
    <FlexBox bg="paleYellow" height="20rem">
      <Drawer expanded={expanded} id={drawerId}>Drawer content in here!</Drawer>
      <StrokeButton
        aria-expanded={expanded}
        aria-controls={drawerId}
        onClick={() => setExpanded((previousExpanded) => !previousExpanded)}
      >
        Toggle Drawer
      </StrokeButton>
    </FlexBox>
  );
};
