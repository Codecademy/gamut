/* eslint-disable local-rules/gamut-import-paths */
import { Box, FlexBox, Text, Toggle } from '@codecademy/gamut/src';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import React, { ComponentProps, useState } from 'react';

export const ColorModeExample = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <Box marginY={16} marginBottom={32}>
      <FlexBox fontWeight="title" marginBottom={8} alignItems="center">
        <Text marginRight={8} as="strong">
          Use Dark Mode
        </Text>
        <Toggle
          label="color-mode"
          size="small"
          variant="hyper"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </FlexBox>
      <ColorMode mode={isDark ? 'dark' : 'light'}>
        <Box
          backgroundColor="background"
          padding={24}
          borderColor="text"
          borderStyle="solid"
          borderWidth="1px"
        >
          <Text as="h5" fontSize={26} fontWeight="title" marginBottom={16}>
            {isDark ? 'Dark' : 'Light'} Mode
          </Text>
          <Text as="p" marginBottom={16}>
            Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
        </Box>
      </ColorMode>
    </Box>
  );
};

export const BackgroundExample: React.FC<ComponentProps<typeof Background>> = ({
  children,
  ...rest
}) => {
  return (
    <Background {...rest} p={24}>
      <Text as="p" fontSize={26} fontWeight="title" marginBottom={16}>
        {rest.bg}
      </Text>
      <Text as="p" marginBottom={16}>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
      {children}
    </Background>
  );
};
