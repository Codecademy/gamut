import { Box, FillButton, FlexBox, Modal } from "@codecademy/gamut";
import { useState } from "react";

export const ModalExample = () => {
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
        >
          Hi, this is an modal!
        </Modal>
      </FlexBox>
    </>
  );
};
