import {
  AssetProvider,
  coreTheme,
  createEmotionCache,
  GamutProvider,
} from '@codecademy/gamut-styles';
import { MDXProvider } from '@mdx-js/react';
import {
  CodeOrSourceMdx,
  DocsContainer as StorybookDocsContainer,
  DocsContextProps,
  HeadersMdx,
} from '@storybook/blocks';
import { components as htmlComponents } from '@storybook/components';
import { ThemeProvider } from '@storybook/theming';
import * as React from 'react';
import { HelmetProvider } from 'react-helmet-async';

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  ...HeadersMdx,
};

export const DocsContainer: React.FC<{
  context: DocsContextProps;
  children: React.ReactNode;
}> = ({ context, children }, ...rest) => {
  const allComponents = { ...defaultComponents };

  return (
    <StorybookDocsContainer context={context} {...rest}>
      <GamutProvider
        cache={createEmotionCache({ speedy: false })}
        theme={coreTheme}
      >
        <HelmetProvider>
          <AssetProvider />
        </HelmetProvider>
        <ThemeProvider theme={coreTheme}>
          <MDXProvider components={allComponents}>{children}</MDXProvider>
        </ThemeProvider>
      </GamutProvider>
    </StorybookDocsContainer>
  );
};
