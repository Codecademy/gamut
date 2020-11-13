import React, { useRef, useState } from 'react';
import { FillButton, Container } from '@codecademy/gamut/src';
import { ReachPopover } from '@codecademy/gamut-labs/src';

export const ReachPopoverExample = () => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      The plain buttons are just here to show <kbd>Tab</kbd> order being
      preserved. Glorious.
      <br />
      <button type="button">before</button>
      <div ref={activeElRef}>
        <FillButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? 'Close' : 'Open'} Popover
        </FillButton>
      </div>
      <Container>
        <ReachPopover isOpen={open} />
      </Container>
      <button type="button">after</button>
    </React.Fragment>
  );
};
