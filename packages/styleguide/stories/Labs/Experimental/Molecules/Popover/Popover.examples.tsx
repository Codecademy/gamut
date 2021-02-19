import {
  Box,
  Column,
  Container,
  FillButton,
  FlexBox,
  LayoutGrid,
  PatternName,
} from '@codecademy/gamut/src';
import { Popover, PopoverProps } from '@codecademy/gamut-labs/src';
import React, { useRef, useState } from 'react';

export const PopoverExample = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box ref={activeElRef}>
        <FillButton
          onClick={() => {
            setOpen(true);
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
          <FlexBox flexDirection="column" padding={16} alignItems="flex-start">
            <Box fontSize={16} marginBottom={8}>
              Hooray!
            </Box>
            <FillButton size="small" onClick={() => setOpen(false)}>
              Close Popover
            </FillButton>
          </FlexBox>
        </Popover>
      </Container>
    </>
  );
};

export const PatternedPopoversGrid = (args: PopoverProps) => {
  return (
    <LayoutGrid columnGap="sm" rowGap="xl">
      {[
        'diagonalStripesLoose',
        'diagonalStripesRegular',
        'diagonalStripesDense',
        'dotsLoose',
        'dotsRegular',
        'dotsDense',
      ].map((pattern: PatternName) => (
        <Column key={pattern} size={4}>
          <FlexBox justifyContent="center">
            <PopoverExample {...args} pattern={pattern} />
          </FlexBox>
        </Column>
      ))}
    </LayoutGrid>
  );
};
