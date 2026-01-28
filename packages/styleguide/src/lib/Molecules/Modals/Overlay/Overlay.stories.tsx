import { Box, FillButton, FlexBox, Overlay, Text } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta: Meta<typeof Overlay> = {
  component: Overlay,
  args: { shroud: true, clickOutsideCloses: true },
};

export default meta;
type Story = StoryObj<typeof Overlay>;

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

export const ZIndex: Story = {
  render: function ZIndexExample() {
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [customOpen, setCustomOpen] = useState(false);

    return (
      <FlexBox flexDirection="column" gap={16}>
        <FlexBox gap={16}>
          <FillButton onClick={() => setDefaultOpen(true)}>
            Open Overlay (default z-index: 3)
          </FillButton>
          <FillButton onClick={() => setCustomOpen(true)}>
            Open Overlay (z-index: 10)
          </FillButton>
        </FlexBox>

        <Box position="relative" height="100px">
          <Box
            position="absolute"
            top={0}
            left={0}
            bg="paleYellow"
            p={16}
            zIndex={5}
          >
            <Text>Element with z-index: 5</Text>
          </Box>
        </Box>

        <Overlay
          isOpen={defaultOpen}
          onRequestClose={() => setDefaultOpen(false)}
          shroud
        >
          <FlexBox bg="white" p={24} borderRadius="md" flexDirection="column" gap={16}>
            <Text>
              This overlay uses the default z-index of 3.
              <br />
              It may appear behind elements with higher z-index values.
            </Text>
            <FillButton onClick={() => setDefaultOpen(false)}>Close</FillButton>
          </FlexBox>
        </Overlay>

        <Overlay
          isOpen={customOpen}
          onRequestClose={() => setCustomOpen(false)}
          shroud
          zIndex={10}
        >
          <FlexBox bg="white" p={24} borderRadius="md" flexDirection="column" gap={16}>
            <Text>
              This overlay uses z-index: 10.
              <br />
              It will appear above the yellow element with z-index: 5.
            </Text>
            <FillButton onClick={() => setCustomOpen(false)}>Close</FillButton>
          </FlexBox>
        </Overlay>
      </FlexBox>
    );
  },
};
