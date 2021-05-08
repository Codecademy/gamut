import {
  Box,
  FillButton,
  FlexBox,
  Popover,
  PopoverProps,
} from '@codecademy/gamut';
import React, { useRef } from 'react';

export const PopoverExample = (props: Partial<PopoverProps>) => {
  const targetRef = useRef<HTMLButtonElement>(null);
  return (
    <FlexBox
      minHeight="600px"
      width={1}
      justifyContent="center"
      alignItems="center"
    >
      <Box display="inline-block">
        <Popover isOpen targetRef={targetRef} {...props}>
          <Box border={1} p={8}>
            I am a popover
          </Box>
        </Popover>
        <FillButton ref={targetRef}>Target</FillButton>
      </Box>
    </FlexBox>
  );
};
