import {
  AssetProvider,
  coreTheme,
  createEmotionCache,
  css,
  GamutProvider,
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
import { useMemo } from 'react';
import { Link } from './Markdown';
import { HelmetProvider } from 'react-helmet-async';
import theme from '../../theming/GamutTheme';
import { createTheme } from '@codecademy/variance';
export const storybookTheme = createTheme(coreTheme)
  .addColors(platformPalette)
  .build();

const themeMap = {
  core: coreTheme,
  admin: adminTheme,
  lxStudio: lxStudioTheme,
  percipio: percipioTheme,
  /* The Platform theme is a sub-theme of the Core theme, so it doesn't work as a standalone.
   * This is a workaround so that the Platform colors show up in the Platform theme story but keep
   * the main Core theme.
   */
  platform: storybookTheme,
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

const themeSpecificStories = {
  'foundations-theme-lx-studio-theme--docs': 'lxStudio',
  'foundations-theme-percipio-theme--docs': 'percipio',
  'foundations-theme-platform-theme--docs': 'platform',
  'foundations-theme-admin-theme--docs': 'admin',
  'foundations-theme-core-theme--docs': 'core',
};
export const DocsContainer: React.FC<{
  context: DocsContextProps;
  children: React.ReactNode;
}> = ({ context, children }, ...rest) => {
  /** Select the docs theme based on the global toolbar item unless it is a theme specific story
   *  This is admittedly a bit fragile - when updating Storybook this likely will need to be changed
   */
  const storyId = (context?.channel as any)?.data?.currentStoryWasSet?.[0]
    ?.storyId;

  const globalTheme =
    (context as any).store.userGlobals?.globals?.theme || 'core';

  const { currentTheme } = useMemo(() => {
    const findThemeStory: keyof typeof themeSpecificStories | undefined =
      storyId;

    const isThemeStory =
      findThemeStory &&
      Object.keys(themeSpecificStories).includes(findThemeStory);

    const theme = isThemeStory
      ? themeSpecificStories[findThemeStory]
      : globalTheme;

    return {
      selectedTheme: theme,
      currentTheme: themeMap[theme as keyof typeof themeMap],
    };
  }, [storyId, globalTheme]);

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
