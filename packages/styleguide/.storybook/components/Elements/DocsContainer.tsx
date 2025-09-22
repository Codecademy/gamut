import {
  AssetProvider,
  coreTheme,
  createEmotionCache,
  css,
  GamutProvider,
  lxStudioPalette,
  percipioPalette,
  platformPalette,
  adminTheme,
  lxStudioTheme,
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

export const storybookTheme = createTheme(coreTheme)
  .addColors(lxStudioPalette)
  .addColors(percipioPalette)
  .addColors(platformPalette)
  .build();

const themeMap = {
  core: coreTheme,
  admin: adminTheme,
  lxStudio: lxStudioTheme,
  percipio: percipioTheme,
} as const;

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
  /** Select the docs theme based on the global toolbar item
   *  a bit fragile - when updating Storybook this likely will need to be changed
   */
  const selectedTheme =
    (context as any).store.userGlobals?.globals?.theme || 'core';
  const currentTheme =
    themeMap[selectedTheme as keyof typeof themeMap] || coreTheme;

  return (
    <StorybookDocsContainer theme={theme} context={context} {...rest}>
      <GamutProvider
        cache={createEmotionCache({ speedy: false })}
        theme={currentTheme as any}
      >
        <HelmetProvider>
          <AssetProvider />
        </HelmetProvider>
        <SourceContainer channel={context.channel}>
          <ThemeProvider theme={currentTheme as any}>
            <MDXProvider components={defaultComponents}>{children}</MDXProvider>
          </ThemeProvider>
        </SourceContainer>
      </GamutProvider>
    </StorybookDocsContainer>
  );
};
