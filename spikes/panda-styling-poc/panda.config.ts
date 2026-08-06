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

/* Recipes mirror the real Gamut Button atoms: Fill/Stroke/Text share a variant
 * set (primary/secondary/danger/interface) + text size scale; CTA is
 * primary-only; Icon uses square sizes. Heights use the `[value]` escape hatch
 * (not tokens). Colors/spacing/fontSize stay real tokens under strictTokens. */
const VARIANTS = ['primary', 'secondary', 'danger', 'interface'] as const;
type RecipeConfig = Parameters<typeof defineRecipe>[0];

const variantMap = (fn: (c: string) => object) =>
  Object.fromEntries(VARIANTS.map((v) => [v, fn(v)]));

// mirrors real Gamut's ButtonSelectors.OUTLINE / OUTLINE_FOCUS_VISIBLE — the
// focus-ring `::before` pseudo-element, colored per variant
const outline = (c: string) => ({ '&::before': { borderColor: c } });

const fillVariant = (c: string) => ({
  bg: c,
  color: 'background',
  ...outline(c),
  _hover: { bg: `${c}-hover`, color: 'background' },
  _active: { bg: c, color: 'background', borderColor: 'border-primary' },
  _disabled: { bg: 'background-disabled', color: 'text-disabled' },
});
const strokeVariant = (c: string) => ({
  bg: 'transparent',
  borderColor: c,
  color: c,
  ...outline(c),
  _hover: { bg: 'background-hover' },
  _active: { bg: c, color: 'background' },
  _disabled: {
    bg: 'transparent',
    borderColor: 'background-disabled',
    color: 'text-disabled',
  },
});
const textVariant = (c: string) => ({
  borderColor: 'transparent',
  color: c === 'interface' ? 'text' : c,
  ...outline(c),
  _hover: { color: c, bg: 'background-hover' },
  _focusVisible: { color: c },
  _active: { color: 'text' },
  _disabled: { color: 'text-disabled', bg: 'transparent' },
});

const base = {
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
  appearance: 'none',
  textDecoration: 'none',
  _disabled: { cursor: 'not-allowed', userSelect: 'none' },
  // focus ring: transparent by default, colored per-variant via `outline()`,
  // revealed only on keyboard focus (matches real Gamut's OUTLINE selectors)
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '[-5px]',
    borderRadius: 'lg',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: 'transparent',
    opacity: '0',
    zIndex: '0',
    transitionProperty: 'opacity',
    transitionDuration: 'fast',
  },
  '&:focus-visible::before': { opacity: '1' },
};
const textSize = {
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
};
const iconSize = {
  small: { height: '[32px]', width: '[32px]' },
  normal: { height: '[40px]', width: '[40px]' },
  large: { height: '[56px]', width: '[56px]' },
};

const makeButton = (
  className: string,
  jsx: string,
  variantFn: (c: string) => object,
  opts: { size?: object; defaultVariant?: string } = {}
) =>
  defineRecipe({
    className,
    jsx: [jsx],
    base,
    variants: { size: opts.size ?? textSize, variant: variantMap(variantFn) },
    defaultVariants: {
      size: 'normal',
      variant: opts.defaultVariant ?? 'primary',
    },
  } as RecipeConfig);

const fillButton = makeButton('gmt-fill-button', 'FillButton', fillVariant);
const strokeButton = makeButton(
  'gmt-stroke-button',
  'StrokeButton',
  strokeVariant
);
const textButton = makeButton('gmt-text-button', 'TextButton', textVariant);
const iconButton = makeButton('gmt-icon-button', 'IconButton', textVariant, {
  size: iconSize,
  defaultVariant: 'secondary',
});
// real Gamut's CTAButton casts a hard drop-shadow that grows on hover and
// flattens on active/disabled — the "brutalist" CTA treatment
const ctaShadow = (offset: number) =>
  `[-${offset}px ${offset}px 0 0 {colors.text}]`;

const ctaButton = defineRecipe({
  className: 'gmt-cta-button',
  jsx: ['CTAButton'],
  base: {
    ...base,
    fontFamily: 'accent',
    fontWeight: 'title',
    color: 'background',
    bg: 'primary',
    py: '12',
    px: '24',
    boxShadow: ctaShadow(4),
    '&::before': {
      ...base['&::before'],
      borderColor: 'primary',
      bottom: '[-9px]',
      left: '[-9px]',
    },
    _hover: { bg: 'primary-hover', boxShadow: ctaShadow(8) },
    _active: { bg: 'secondary', boxShadow: '[none]' },
    _disabled: {
      bg: 'background-disabled',
      color: 'text-disabled',
      boxShadow: '[none]',
    },
  },
  variants: { variant: { primary: {} } },
  defaultVariants: { variant: 'primary' },
} as RecipeConfig);

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
      // real Gamut's disabled styling also matches `[aria-disabled='true']`
      // (see ButtonSelectors.DISABLED) — override Panda's built-in condition
      // so `_disabled` blocks above apply to both states
      disabled: '&:is(:disabled, [disabled], [aria-disabled=true])',
    },
  },

  // force-emit all recipe variants + the admin theme (dynamic selection safe)
  staticCss: {
    recipes: {
      fillButton: ['*'],
      strokeButton: ['*'],
      textButton: ['*'],
      iconButton: ['*'],
      ctaButton: ['*'],
    },
    themes: ['admin'],
  },
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
      recipes: { fillButton, strokeButton, textButton, iconButton, ctaButton },
    },
  },
});
