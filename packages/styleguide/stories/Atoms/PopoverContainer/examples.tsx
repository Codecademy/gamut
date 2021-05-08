import {
  Box,
  FillButton,
  FlexBox,
  PopoverContainer,
  PopoverContainerProps,
} from '@codecademy/gamut';
import React, { useRef } from 'react';

export const PopoverExample = (props: Partial<PopoverContainer>) => {
  const targetRef = useRef<HTMLButtonElement>(null);
  return (
    <FlexBox
      minHeight="600px"
      width={1}
      justifyContent="center"
      alignItems="center"
    >
      <Box display="inline-block">
        <PopoverContainer isOpen targetRef={targetRef} {...props}>
          <Box border={1} p={8}>
            I am a popover
          </Box>
        </PopoverContainer>
        <FillButton ref={targetRef}>Target</FillButton>
      </Box>
    </FlexBox>
  );
};
