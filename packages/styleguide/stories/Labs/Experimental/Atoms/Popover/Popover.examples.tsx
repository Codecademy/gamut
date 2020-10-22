import React, { useRef, useState } from 'react';
import { Button, Container } from '@codecademy/gamut/src';
import {
  Popover,
  PopoverProps,
} from 'gamut-labs/src/experimental/Popover/index';

export const PopoverExample = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <div ref={activeElRef}>
        <Button
          onClick={() => {
            if (disable) {
              setDisable(false);
              return;
            }
            setOpen(true);
          }}
        >
          Open Popover
        </Button>
      </div>
      <Container>
        <Popover
          {...args}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
          disableOutsideEvent={() => setDisable(true)}
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
