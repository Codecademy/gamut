import { Box, Container, FillButton } from '@codecademy/gamut';
import { Popover, PopoverProps } from '@codecademy/gamut-labs';
import { useState } from '@storybook/addons';
import React, { useRef } from 'react';

export const PopoverExample = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box ref={activeElRef}>
        <FillButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          Open Popover
        </FillButton>
      </Box>
      <Container>
        <Popover
          {...args}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <Container>
            <Box fontSize={44}>Hooray!</Box>
            <FillButton onClick={() => setOpen(false)}>
              Close Popover
            </FillButton>
          </Container>
        </Popover>
      </Container>
    </>
  );
};
