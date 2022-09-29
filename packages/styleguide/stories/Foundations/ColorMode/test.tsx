import { Anchor, Box, FlexBox } from '@codecademy/gamut';
import {
  Background,
  ColorMode,
  useColorModes,
  useCurrentMode,
} from '@codecademy/gamut-styles';
import React from 'react';

export const AnotherThing = () => (
  <FlexBox center p={24}>
    hej
  </FlexBox>
);

export const TextExample2 = () => {
  const [mode, modeColors, modes] = useColorModes();

  const bgCurrent = modes[mode]['background-current'];
  console.log(bgCurrent);

  return (
    <Box>
      <AnotherThing />
    </Box>
  );
};

export const TextExample = () => {
  const mode = useCurrentMode();

  return (
    <ColorMode mode={mode} bg="navy-400">
      <TextExample2 />
    </ColorMode>
  );
};
