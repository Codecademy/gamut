import { Box, Dialog, FillButton, FlexBox } from '@codecademy/gamut';
import { useState } from 'react';

export const ClickOpenDialog = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(true);

  return (
    <>
      <Box>
        <FillButton onClick={toggleOpen}>Open Dialog</FillButton>
      </Box>
      <FlexBox>
        <Dialog
          aria-label="Example Dialog"
          onRequestClose={() => setOpen(false)}
          title="Example Dialog"
          isOpen={open}
          confirmCta={{ children: 'Confirm' }}
          cancelCta={{ children: 'Cancel' }}
        >
          Hi, this is an Dialog!
        </Dialog>
      </FlexBox>
    </>
  );
};
