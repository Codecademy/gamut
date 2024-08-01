import { Box, FillButton, FlexBox, Modal } from '@codecademy/gamut';
import { useState } from 'react';

export const ClickOpenModal = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(true);

  return (
    <>
      <Box>
        <FillButton onClick={toggleOpen}>Open Modal</FillButton>
      </Box>
      <FlexBox>
        <Modal
          aria-label="Example Modal"
          onRequestClose={() => setOpen(false)}
          title="Example Modal"
          isOpen={open}
          size="small"
        >
          Hi, this is an modal!
        </Modal>
      </FlexBox>
    </>
  );
};

export const ClickOpenMultiViewModal = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(true);

  return (
    <>
      <Box>
        <FillButton onClick={toggleOpen}>Open multi-view Modal</FillButton>
      </Box>
      <FlexBox>
        <Modal
          aria-label="Example Modal"
          onRequestClose={() => setOpen(false)}
          title="Example Modal"
          isOpen={open}
          views={[
            {
              title: 'First view',
              nextCta: { children: 'Next' },
              cancelCta: { children: 'Close' },
              children: <>Hey for the first time</>,
            },
            {
              title: 'Second view',
              nextCta: { children: 'Next' },
              cancelCta: { children: 'Close' },
              children: <>Hey for the second time</>,
            },
            {
              title: 'Third view',
              confirmCta: { children: 'Done' },
              cancelCta: { children: 'Close' },
              children: <>Last one</>,
            },
          ]}
          size="medium"
        />
      </FlexBox>
    </>
  );
};
