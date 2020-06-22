import React, { useState, useRef } from 'react';
import { Popover, Button, Container } from '@codecademy/gamut/src';

export const PopoverExample = () => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <div ref={activeElRef}>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Popover
        </Button>
      </div>
      <Container>
        <Popover
          isOpen={open}
          offset={20}
          position="below"
          showBeak={true}
          showScreen={true}
          targetRef={activeElRef}
          overlayProps={{
            onRequestClose: () => setOpen(false),
          }}
        >
          <Container>
            <h1>Hooray!</h1>
            <Button onClick={() => setOpen(false)}>Close Popover</Button>
          </Container>
        </Popover>
      </Container>
    </React.Fragment>
  );
};
