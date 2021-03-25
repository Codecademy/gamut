/* eslint-disable local-rules/gamut-import-paths */
import { Anchor, Box } from '@codecademy/gamut/src';
import { Text } from '@codecademy/gamut-labs/src';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import { BooleanControl } from '@storybook/components';
import React, { ComponentProps, useState } from 'react';

export const ColorModeExample = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <Box marginY={16} marginBottom={32}>
      <Box fontWeight="title" marginBottom={8}>
        Use Dark Mode{' '}
        <BooleanControl name="color-mode" value={isDark} onChange={setIsDark} />
      </Box>
      <ColorMode mode={isDark ? 'dark' : 'light'}>
        <Box
          backgroundColor="background"
          textColor="text"
          padding={24}
          borderColor="text"
          borderStyle="solid"
          borderWidth="1px"
        >
          <Text as="h1" fontSize={26} fontWeight="title" marginBottom={16}>
            {isDark ? 'Dark' : 'Light'} Mode
          </Text>
          <Text as="p" marginBottom={16}>
            Lorem ipsum dolor sit amet,{' '}
            <Anchor>consectetur adipiscing elit</Anchor>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
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
    <Background {...rest}>
      <Box padding={24}>
        <Text fontSize={26} fontWeight="title" marginBottom={16}>
          {rest.color}
        </Text>
        <Text as="p" marginBottom={16}>
          Lorem ipsum dolor sit amet,{' '}
          <Anchor>consectetur adipiscing elit</Anchor>, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </Text>
        {children}
      </Box>
    </Background>
  );
};
