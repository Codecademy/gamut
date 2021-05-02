import {
  Box,
  Column,
  Container,
  FillButton,
  FlexBox,
  LayoutGrid,
  PatternName,
} from '@codecademy/gamut';
import { Popover, PopoverProps } from '@codecademy/gamut-labs';
import React, { useRef, useState } from 'react';

export const PopoverExample = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
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

export const PopoverWithoutFocus = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
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
              Nothing clickable here but the container has fallback focus
            </Box>
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
        'checkerLoose',
        'checkerRegular',
        'checkerDense',
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
