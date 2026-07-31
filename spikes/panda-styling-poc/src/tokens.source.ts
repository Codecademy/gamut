/* SINGLE SOURCE OF TRUTH for color tokens — framework-agnostic (no React, no
 * Panda). Consumed by BOTH `panda.config.ts` (to emit CSS variables) and the JS
 * escape hatch `getColorValue()` (to resolve raw hex for charts/canvas). Keeping
 * one source is what makes the JS resolver safe — it can't drift from the CSS. */

export const palette = {
  navy: '#0a1f43',
  blue: '#1f4287',
  'blue-hover': '#16336b',
  teal: '#0b7d78',
  'teal-hover': '#095f5b',
  red: '#c8102e',
  'red-hover': '#a00d25',
  gray: '#6b7280',
  'gray-200': '#e5e7eb',
  'gray-700': '#374151',
  white: '#ffffff',
  black: '#111111',
} as const;

export type PaletteKey = keyof typeof palette;
export type ColorMode = 'light' | 'dark';
export type ThemeName = 'core' | 'admin';
export type SemanticAlias =
  | 'primary'
  | 'primary-hover'
  | 'secondary'
  | 'secondary-hover'
  | 'danger'
  | 'danger-hover'
  | 'interface'
  | 'interface-hover'
  | 'background'
  | 'background-hover'
  | 'background-disabled'
  | 'text'
  | 'text-disabled'
  | 'border-primary';

type ModeMap = Record<SemanticAlias, PaletteKey>;

// semantic alias → raw palette key, per color mode, per theme
export const semanticColors: Record<ThemeName, Record<ColorMode, ModeMap>> = {
  core: {
    light: {
      primary: 'blue',
      'primary-hover': 'blue-hover',
      secondary: 'navy',
      'secondary-hover': 'blue',
      danger: 'red',
      'danger-hover': 'red-hover',
      interface: 'gray-700',
      'interface-hover': 'gray',
      background: 'white',
      'background-hover': 'gray-200',
      'background-disabled': 'gray-200',
      text: 'black',
      'text-disabled': 'gray',
      'border-primary': 'blue',
    },
    dark: {
      primary: 'white',
      'primary-hover': 'gray-200',
      secondary: 'gray-200',
      'secondary-hover': 'white',
      danger: 'red',
      'danger-hover': 'red-hover',
      interface: 'gray-200',
      'interface-hover': 'white',
      background: 'navy',
      'background-hover': 'gray-700',
      'background-disabled': 'gray-700',
      text: 'white',
      'text-disabled': 'gray',
      'border-primary': 'white',
    },
  },
  admin: {
    light: {
      primary: 'teal',
      'primary-hover': 'teal-hover',
      secondary: 'navy',
      'secondary-hover': 'teal',
      danger: 'red',
      'danger-hover': 'red-hover',
      interface: 'gray-700',
      'interface-hover': 'gray',
      background: 'gray-200',
      'background-hover': 'white',
      'background-disabled': 'gray-200',
      text: 'navy',
      'text-disabled': 'gray',
      'border-primary': 'teal',
    },
    dark: {
      primary: 'white',
      'primary-hover': 'gray-200',
      secondary: 'gray-200',
      'secondary-hover': 'white',
      danger: 'red',
      'danger-hover': 'red-hover',
      interface: 'gray-200',
      'interface-hover': 'white',
      background: 'navy',
      'background-hover': 'gray-700',
      'background-disabled': 'gray-700',
      text: 'white',
      'text-disabled': 'gray',
      'border-primary': 'white',
    },
  },
};
