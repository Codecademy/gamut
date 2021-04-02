import React from 'react';
import { Box, ContentContainer } from '@codecademy/gamut/src';
import { GlobalHeader } from '@codecademy/gamut-labs';

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
    parameters: {
      layoutOptions = {
        context: false,
        backgroundColor: 'background',
      },
    },
  } = options;
  const { context, backgroundColor } = layoutOptions;

  if (!context) {
    return (
      <Box backgroundColor={backgroundColor} padding={32}>
        {Story()}
      </Box>
    );
  }

  const { size = 'medium', showHeader = false } = context;

  return (
    <Box backgroundColor={backgroundColor}>
      {showHeader && (
        <GlobalHeader
          action={() => {}}
          type="free"
          user={{
            avatar:
              'https://www.gravatar.com/avatar/1c959a9a1e2f9f9f1ac06b05cccc1d60?s=150&d=retro',
            displayName: 'Codey',
          }}
        />
      )}
      <ContentContainer size={size}>{Story()}</ContentContainer>
    </Box>
  );
};
