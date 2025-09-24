import { Drawer, FlexBox, StrokeButton } from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  args: {
    expanded: true,
    alignContentContainer: 'left',
  },
};

export default meta;

export const Default: React.FC<ComponentProps<typeof Drawer>> = (args) => {
  const [expanded, setExpanded] = useState(args.expanded);
  useEffect(() => {
    setExpanded(args.expanded);
  }, [args.expanded]);

  return (
    <FlexBox bg="paleYellow" height="20rem">
      <Drawer
        alignContentContainer={args.alignContentContainer}
        expanded={expanded}
      >
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
