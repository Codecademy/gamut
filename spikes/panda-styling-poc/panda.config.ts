import { adminTheme } from '@codecademy/gamut-styles/dist/themes/admin';
import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import {
  borderRadii,
  corePalette,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from '@codecademy/gamut-styles/dist/variables';
import { defineConfig, defineRecipe } from '@pandacss/dev';

/* Gamut → Panda spike (GMT-1715), using the REAL Gamut Core theme. Tokens are
 * derived directly from `@codecademy/gamut-styles` (palette, semantic light/dark
 * color modes, spacing / fontSize / fontFamily / fontWeight / lineHeight /
 * borderRadii), so the spike matches production values. `getColorValue`
 * (src/gamut/color-values.ts) reads the SAME theme, so the JS resolver can't
 * drift. Real Apercu/Suisse web fonts are loaded via src/fonts.css. */

type ModeMap = Record<string, string>;
type ThemeWithModes = { modes: { light: ModeMap; dark: ModeMap } };

const asTokens = (obj: Record<string, string | number>) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, { value: String(v) }])
  );

// semantic alias → { base: {colors.<lightKey>}, _dark: {colors.<darkKey>} }
const toSemanticColors = (theme: ThemeWithModes) => {
  const { light, dark } = theme.modes;
  const colors: Record<string, { value: { base: string; _dark: string } }> = {};
  for (const alias of Object.keys(light)) {
    colors[alias] = {
      value: {
        base: `{colors.${light[alias]}}`,
        _dark: `{colors.${dark[alias] ?? light[alias]}}`,
      },
    };
  }
  return colors;
};

const makeFillVariant = (color: string) => ({
  bg: color,
  color: 'background',
  _hover: { bg: `${color}-hover`, color: 'background' },
  _active: { bg: color, color: 'background', borderColor: 'border-primary' },
  _disabled: { bg: 'background-disabled', color: 'text-disabled' },
});

const button = defineRecipe({
  className: 'gmt-button',
  jsx: ['Button'],
  base: {
    position: 'relative',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 'md',
    fontFamily: 'base',
    cursor: 'pointer',
    _disabled: { cursor: 'not-allowed', userSelect: 'none' },
  },
  variants: {
    size: {
      // height/minWidth aren't design tokens in Gamut — author them as raw
      // values via Panda's `[value]` escape hatch (strictTokens still guards
      // colors/spacing/fontSize, which ARE tokens).
      small: {
        fontSize: '14',
        height: '[32px]',
        minWidth: '[32px]',
        py: '4',
        px: '8',
        fontWeight: 'title',
      },
      normal: {
        fontSize: '16',
        height: '[40px]',
        minWidth: '[40px]',
        py: '4',
        px: '16',
        fontWeight: 'title',
      },
      large: {
        fontSize: '18',
        height: '[56px]',
        minWidth: '[40px]',
        py: '4',
        px: '16',
        fontWeight: 'title',
      },
    },
    variant: {
      primary: makeFillVariant('primary'),
      secondary: makeFillVariant('secondary'),
      danger: makeFillVariant('danger'),
      interface: makeFillVariant('interface'),
    },
  },
  defaultVariants: { size: 'normal', variant: 'primary' },
});

export default defineConfig({
  preflight: false,
  strictTokens: true,
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
  conditions: {
    extend: {
      dark: '[data-color-mode=dark] &',
      light: '[data-color-mode=light] &',
    },
  },

  // force-emit all recipe variants + the admin theme (dynamic selection safe)
  staticCss: { recipes: { button: ['*'] }, themes: ['admin'] },
  themes: {
    admin: {
      semanticTokens: {
        colors: toSemanticColors(adminTheme as unknown as ThemeWithModes),
      },
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: asTokens(corePalette as Record<string, string>),
        spacing: asTokens(spacing as Record<string, string | number>),
        fontSizes: asTokens(fontSize as Record<string, string>),
        fonts: asTokens(fontFamily as Record<string, string>),
        fontWeights: asTokens(fontWeight as Record<string, string | number>),
        lineHeights: asTokens(lineHeight as Record<string, string | number>),
        radii: asTokens(borderRadii as Record<string, string>),
        borderWidths: { '1': { value: '1px' }, '2': { value: '2px' } },
      },
      semanticTokens: {
        colors: toSemanticColors(coreTheme as unknown as ThemeWithModes),
      },
      recipes: { button },
    },
  },
});
