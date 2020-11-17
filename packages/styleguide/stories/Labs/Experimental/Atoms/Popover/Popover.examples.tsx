import React, { useRef, useState } from 'react';
import { FillButton, Container } from '@codecademy/gamut/src';
import { Popover, PopoverProps } from '@codecademy/gamut-labs/src';

export const PopoverExample = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLButtonElement>(null);

  return (
    <React.Fragment>
      <div>
        <FillButton
          onClick={() => {
            setOpen(!open);
          }}
          ref={activeElRef}
        >
          Open Popover
        </FillButton>
      </div>
      <Container>
        <Popover
          {...args}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <Container>
            <h1>Hooray!</h1>
            <FillButton onClick={() => setOpen(false)}>
              Close Popover
            </FillButton>
          </Container>
        </Popover>
      </Container>
    </React.Fragment>
  );
};
