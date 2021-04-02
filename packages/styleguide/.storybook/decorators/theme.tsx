import React from 'react';
import { Box, ContentContainer } from '@codecademy/gamut/src';
import { ColorMode, GamutProvider } from '@codecademy/gamut-styles/src';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

export const withEmotion = (Story: any, context) => {
  // Always give iframes the full provider
  if (process.env.NODE_ENV === 'test') {
    return (
      <GamutProvider useCache={false} useGlobals={false}>
        {Story()}
      </GamutProvider>
    );
  }

  // Wrap all stories in minimal provider
  return (
    <GamutProvider>
      <ColorMode mode={context.globals.colorModes}>
        <Box backgroundColor="background">{Story()}</Box>
      </ColorMode>
    </GamutProvider>
  );
};

export const withContext = (Story: any, options) => {
  if (process.env.NODE_ENV === 'test') {
    return Story();
  }
  const {
    parameters: { layoutType = 'padded' },
  } = options;
  switch (layoutType) {
    case 'isolated':
      return <Box backgroundColor="background">{Story()}</Box>;
    case 'content':
      return (
        <Box backgroundColor="background">
          <ContentContainer>{Story()}</ContentContainer>
        </Box>
      );
    case 'wide':
      return (
        <Box backgroundColor="background">
          <ContentContainer size="wide">{Story()}</ContentContainer>
        </Box>
      );
    case 'padded':
    default:
      return (
        <Box backgroundColor="background" padding={32}>
          {Story()}
        </Box>
      );
  }
};
