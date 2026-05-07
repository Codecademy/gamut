import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

import {
  createGamutStorybookChromeTheme,
  resolveStorybookToolbarThemeKey,
  type StorybookToolbarThemeKey,
} from './theming/createGamutStorybookChromeTheme';

const DEFAULT_THEME_KEY: StorybookToolbarThemeKey = 'core';

addons.setConfig({
  theme: createGamutStorybookChromeTheme(DEFAULT_THEME_KEY),
});

addons.register('gamut-toolbar-theme-sync', () => {
  const channel = addons.getChannel();
  channel.on(
    GLOBALS_UPDATED,
    ({
      userGlobals = {},
      initialGlobals = {},
    }: {
      userGlobals?: { theme?: unknown };
      initialGlobals?: { theme?: unknown };
    }) => {
      const globals = { ...initialGlobals, ...userGlobals };
      const key = resolveStorybookToolbarThemeKey(globals.theme);
      addons.setConfig({
        theme: createGamutStorybookChromeTheme(key),
      });
    }
  );
});
