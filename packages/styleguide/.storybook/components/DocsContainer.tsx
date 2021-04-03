import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { components as htmlComponents } from '@storybook/components';
import {
  DocsContext,
  SourceContainer,
  DocsContextProps,
  CodeOrSourceMdx,
  AnchorMdx,
  HeadersMdx,
} from '@storybook/addon-docs/blocks';
import { AssetProvider } from '@codecademy/gamut-styles/src/AssetProvider';
import {
  createEmotionCache,
  GamutProvider,
} from '@codecademy/gamut-styles/src';
import { NavigationProvider } from './Navigation/NavigationProvider';
import React from 'react';
import { merge } from 'lodash';

const emotionCache = createEmotionCache();

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  a: AnchorMdx,
  ...HeadersMdx,
};

export const DocsContainer: React.FC<{ context: DocsContextProps }> = ({
  context,
  children,
}) => {
  const { parameters = {} } = context || {};
  const { docs = {} } = parameters;

  let themeVars = docs.theme;

  const theme = ensureTheme(themeVars);
  const overrides = merge({}, theme, {
    appBorderRadius: 2,
    typography: {
      size: {
        s2: 16,
      },
    },
  });
  const allComponents = { ...defaultComponents, ...docs.components };

  return (
    <DocsContext.Provider value={context}>
      <GamutProvider cache={emotionCache}>
        <AssetProvider />
        <NavigationProvider>
          <SourceContainer>
            <ThemeProvider theme={overrides}>
              <MDXProvider components={allComponents}>{children}</MDXProvider>
            </ThemeProvider>
          </SourceContainer>
        </NavigationProvider>
      </GamutProvider>
    </DocsContext.Provider>
  );
};
