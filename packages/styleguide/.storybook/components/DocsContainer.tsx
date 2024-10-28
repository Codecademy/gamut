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
import { Link } from './Markdown';
import { HelmetProvider } from 'react-helmet-async';

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  ...HeadersMdx,
  a: Link as any,
};

export const DocsContainer: React.FC<{
  context: DocsContextProps;
  children: React.ReactNode;
}> = ({ context, children }, ...rest) => {
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
          <MDXProvider components={defaultComponents}>{children}</MDXProvider>
        </ThemeProvider>
      </GamutProvider>
    </StorybookDocsContainer>
  );
};
