import React, { useRef, useState } from 'react';
import { FillButton, Container } from '@codecademy/gamut/src';
import { ReachPopover } from '@codecademy/gamut-labs/src';

export const ReachPopoverExample = () => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLButtonElement>(null);

  return (
    <React.Fragment>
      The other plain buttons are just here to show <kbd>Tab</kbd> order being
      preserved. Glorious.
      <br />
      <button type="button">before</button>
      <FillButton
        onClick={() => {
          setOpen(!open);
        }}
        ref={activeElRef}
        type="button"
      >
        Toggle Popover
      </FillButton>
      <Container>
        <ReachPopover isOpen={open} />
      </Container>
      <button type="button">after</button>
    </React.Fragment>
  );
};
