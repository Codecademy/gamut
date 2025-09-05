import {
  AssetProvider,
  coreTheme,
  createEmotionCache,
  css,
  GamutProvider,
  lxStudioPalette,
  platformPalette,
  percipioTheme,
} from '@codecademy/gamut-styles';
import { MDXProvider } from '@mdx-js/react';
import {
  CodeOrSourceMdx,
  DocsContainer as StorybookDocsContainer,
  DocsContextProps,
  HeadersMdx,
  SourceContainer,
} from '@storybook/blocks';
import { components as htmlComponents } from '@storybook/components';
import { styled, ThemeProvider } from '@storybook/theming';
import * as React from 'react';
import { Link } from './Markdown';
import { HelmetProvider } from 'react-helmet-async';
import theme from '../../theming/GamutTheme';
import { createTheme } from '@codecademy/variance';

// this theme gives us access to the percipio tokens for the storybook
export const storybookTheme = percipioTheme;

const WrappedPre = styled(htmlComponents.pre)(
  // gives the source block a white background - pretty fragile but easy to change if needed
  css({
    '.docblock-source, .css-5owncf': { backgroundColor: 'background' },
  })
);

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  pre: WrappedPre,
  ...HeadersMdx,
  a: Link as any,
};

export const DocsContainer: React.FC<{
  context: DocsContextProps;
  children: React.ReactNode;
}> = ({ context, children }, ...rest) => {
  return (
    <StorybookDocsContainer theme={theme} context={context} {...rest}>
      <GamutProvider
        cache={createEmotionCache({ speedy: false })}
        theme={storybookTheme}
      >
        <HelmetProvider>
          <AssetProvider />
        </HelmetProvider>
        <SourceContainer channel={context.channel}>
          <ThemeProvider theme={coreTheme}>
            <MDXProvider components={defaultComponents}>{children}</MDXProvider>
          </ThemeProvider>
        </SourceContainer>
      </GamutProvider>
    </StorybookDocsContainer>
  );
};
