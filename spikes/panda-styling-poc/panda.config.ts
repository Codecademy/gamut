import { defineConfig, defineRecipe } from '@pandacss/dev';

import {
  type SemanticAlias,
  type ThemeName,
  palette,
  semanticColors,
} from './src/tokens.source';

/* Gamut → Panda spike (GMT-1715). Tokens are built from the shared
 * `src/tokens.source` so the CSS variables Panda emits and the JS `getColorValue`
 * escape hatch share one source of truth. */

// palette hex → Panda raw color tokens
const colorTokens = Object.fromEntries(
  Object.entries(palette).map(([key, value]) => [key, { value }])
);

// semantic alias map (per theme) → Panda semanticTokens with light/dark
const toSemanticColors = (theme: ThemeName) => {
  const light = semanticColors[theme].light;
  const dark = semanticColors[theme].dark;
  const colors: Record<string, { value: { base: string; _dark: string } }> = {};
  (Object.keys(light) as SemanticAlias[]).forEach((alias) => {
    colors[alias] = {
      value: {
        base: `{colors.${light[alias]}}`,
        _dark: `{colors.${dark[alias]}}`,
      },
    };
  });
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
      small: {
        fontSize: '14',
        height: '32',
        minWidth: '32',
        py: '4',
        px: '8',
        fontWeight: 'title',
      },
      normal: {
        fontSize: '16',
        height: '40',
        minWidth: '40',
        py: '4',
        px: '16',
        fontWeight: 'title',
      },
      large: {
        fontSize: '18',
        height: '56',
        minWidth: '40',
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

  // A DESIGN SYSTEM must force-generate all recipe variants + themes, so
  // consumers can select any variant — including DYNAMICALLY (`variant={x}` in a
  // loop), which Panda's usage scanner can't see. Without this, only
  // statically-literal variants ship. `['*']` = every variant combination.
  staticCss: { recipes: { button: ['*'] }, themes: ['admin'] },
  themes: {
    admin: { semanticTokens: { colors: toSemanticColors('admin') } },
  },

  theme: {
    extend: {
      tokens: {
        colors: colorTokens,
        spacing: {
          '4': { value: '4px' },
          '8': { value: '8px' },
          '16': { value: '16px' },
          '24': { value: '24px' },
        },
        sizes: {
          '32': { value: '32px' },
          '40': { value: '40px' },
          '56': { value: '56px' },
        },
        fontSizes: {
          '14': { value: '14px' },
          '16': { value: '16px' },
          '18': { value: '18px' },
        },
        fontWeights: { base: { value: '400' }, title: { value: '700' } },
        fonts: { base: { value: 'system-ui, sans-serif' } },
        radii: { md: { value: '4px' }, lg: { value: '8px' } },
        borderWidths: { '2': { value: '2px' } },
      },
      semanticTokens: { colors: toSemanticColors('core') },
      recipes: { button },
    },
  },
});
