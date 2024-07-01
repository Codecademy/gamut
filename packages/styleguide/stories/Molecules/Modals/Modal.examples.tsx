import { Box, FillButton, FlexBox, Modal, ModalProps } from "@codecademy/gamut";
import { useState } from "react";

export const PopoverExample = ({ p = 16, ...rest }: PopoverExampleProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <FlexBox>
        <Popover
          {...rest}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox flexDirection="column" p={p} alignItems="flex-start">
            <Box mb={8}>Hooray!</Box>
            <FillButton size="small" onClick={() => setOpen(false)}>
              Close Popover
            </FillButton>
          </FlexBox>
        </Popover>
      </FlexBox>
    </>
  );
};


export const ModalFocusExample = ({ ...rest }: ModalProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Box >
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <FlexBox>
        <Modal
          {...rest}
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          shroud
          escapeCloses
        >
          <FlexBox flexDirection="column" alignItems="flex-start">
            <FillButton size="small" onClick={() => setOpen(false)}>
              Close Modal
            </FillButton>
          </FlexBox>
        </Modal>
      </FlexBox>
    </>
  );
};
