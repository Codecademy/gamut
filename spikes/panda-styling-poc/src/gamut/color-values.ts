import { adminTheme } from '@codecademy/gamut-styles/dist/themes/admin';
import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import { corePalette } from '@codecademy/gamut-styles/dist/variables';

/* ESCAPE HATCH #1 — read a resolved color VALUE in JS.
 *
 * Under a zero-runtime engine a semantic token resolves to `var(--colors-…)`, so
 * JS can't read a hex from it. Anything feeding a color to a NON-CSS consumer
 * (@nivo/canvas, SVG fill, third-party inline styles) needs the literal value.
 * This reads the SAME real Gamut theme the Panda tokens are built from
 * (coreTheme/adminTheme `.modes` + `corePalette`), so it can't drift — the analog
 * of gamut's `_getColorValue` / platform's raw-hex workaround. */

export type ColorMode = 'light' | 'dark';
export type ThemeName = 'core' | 'admin';
export type SemanticAlias = keyof (typeof coreTheme)['modes']['light'];

const themeModes = {
  core: coreTheme,
  admin: adminTheme,
} as unknown as Record<
  ThemeName,
  { modes: Record<ColorMode, Record<string, string>> }
>;
const palette = corePalette as unknown as Record<string, string>;

export const getColorValue = (
  alias: SemanticAlias,
  mode: ColorMode = 'light',
  theme: ThemeName = 'core'
): string => palette[themeModes[theme].modes[mode][alias as string]];

export { corePalette as palette } from '@codecademy/gamut-styles/dist/variables';
