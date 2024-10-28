import Helmet from 'react-helmet';
import { DocsContainer } from '@storybook/blocks';
import { AssetProvider } from '@codecademy/gamut-styles/src/AssetProvider';
import {
  createEmotionCache,
  GamutProvider,
} from '@codecademy/gamut-styles/src';
import * as React from 'react';
import { coreTheme } from '@codecademy/gamut-styles/src/themes/core';

export const CustomDocsContainer: React.FC<
  React.ComponentProps<typeof DocsContainer>
> = ({ context, children }, ...props) => {
  return (
    <DocsContainer context={context} {...props}>
      <GamutProvider
        cache={createEmotionCache({ speedy: false })}
        theme={coreTheme}
      >
        <Helmet>
          <AssetProvider />
        </Helmet>
        {children}
      </GamutProvider>
    </DocsContainer>
  );
};
