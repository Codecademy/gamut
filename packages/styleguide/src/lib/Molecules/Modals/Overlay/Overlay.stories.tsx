import { FillButton, FlexBox, Overlay, Text } from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta: Meta<typeof Overlay> = {
  component: Overlay,
  args: { shroud: true, clickOutsideCloses: true },
};

export default meta;

export const Default: React.FC<React.ComponentProps<typeof Overlay>> = (
  args
) => {
  const [open, setOpen] = useState(args.isOpen);

  useEffect(() => {
    setOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <>
      <FillButton onClick={() => setOpen(true)}>Open Overlay</FillButton>
      <FlexBox>
        <Overlay {...args} isOpen={open} onRequestClose={() => setOpen(false)}>
          <FlexBox>
            <Text variant="title-lg">Hooray!</Text>
            <FillButton onClick={() => setOpen(false)}>
              Close Overlay
            </FillButton>
          </FlexBox>
        </Overlay>
      </FlexBox>
    </>
  );
};
