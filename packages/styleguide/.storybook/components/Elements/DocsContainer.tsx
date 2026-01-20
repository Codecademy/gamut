import {
  AssetProvider,
  coreTheme,
  createEmotionCache,
  GamutProvider,
  platformPalette,
  adminTheme,
  lxStudioTheme,
  percipioTheme,
  CoreTheme,
  platformTheme,
  ColorMode,
} from '@codecademy/gamut-styles';
import {
  DocsContainer as StorybookDocsContainer,
  DocsContextProps,
  SourceContainer,
} from '@storybook/blocks';
import { ThemeProvider } from '@storybook/theming';
import { useMemo } from 'react';
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
  platform: platformTheme,
} as const;

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
        // This is typed to the CoreTheme in theme.d.ts
        theme={currentTheme as unknown as CoreTheme}
      >
        <ColorMode mode="light">
          <HelmetProvider>
            <AssetProvider />
          </HelmetProvider>
          <SourceContainer channel={context.channel}>
            <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
          </SourceContainer>
        </ColorMode>
      </GamutProvider>
    </StorybookDocsContainer>
  );
};
