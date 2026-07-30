import { defineConfig, defineRecipe } from '@pandacss/dev';

/* Gamut → Panda spike (GMT-1715): styled factory + GamutProvider + ColorMode +
 * Background, and the consumer-surface question. jsxFramework: 'react' so Panda
 * generates the `styled` factory + JSX style props. Tokens mirror the earlier
 * scratch POC (semantic light/dark colors = ColorMode). */

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

  // Pre-generate every theme's CSS statically so switching is a zero-runtime
  // attribute flip (mirrors gamut's Storybook theme switcher: core/admin/…).
  staticCss: { themes: ['admin'] },

  // === Multi-theme (Core/Admin/…) ===  the analog of gamut's `themeMap`.
  // Each theme is a pre-built semantic-token set; each ALSO carries its own
  // light/dark via `_dark`. Applied at runtime with `data-panda-theme="admin"`,
  // exactly like gamut swaps `theme={adminTheme}` today — but no re-render.
  themes: {
    admin: {
      semanticTokens: {
        colors: {
          primary: {
            value: { base: '{colors.teal}', _dark: '{colors.white}' },
          },
          'primary-hover': {
            value: { base: '{colors.teal-hover}', _dark: '{colors.gray-200}' },
          },
          secondary: {
            value: { base: '{colors.navy}', _dark: '{colors.gray-200}' },
          },
          'secondary-hover': {
            value: { base: '{colors.teal}', _dark: '{colors.white}' },
          },
          danger: { value: { base: '{colors.red}', _dark: '{colors.red}' } },
          'danger-hover': {
            value: { base: '{colors.red-hover}', _dark: '{colors.red-hover}' },
          },
          interface: {
            value: { base: '{colors.gray-700}', _dark: '{colors.gray-200}' },
          },
          'interface-hover': {
            value: { base: '{colors.gray}', _dark: '{colors.white}' },
          },
          background: {
            value: { base: '{colors.gray-200}', _dark: '{colors.navy}' },
          },
          'background-hover': {
            value: { base: '{colors.white}', _dark: '{colors.gray-700}' },
          },
          'background-disabled': {
            value: { base: '{colors.gray-200}', _dark: '{colors.gray-700}' },
          },
          text: { value: { base: '{colors.navy}', _dark: '{colors.white}' } },
          'text-disabled': {
            value: { base: '{colors.gray}', _dark: '{colors.gray}' },
          },
          'border-primary': {
            value: { base: '{colors.teal}', _dark: '{colors.white}' },
          },
        },
      },
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          navy: { value: '#0a1f43' },
          blue: { value: '#1f4287' },
          'blue-hover': { value: '#16336b' },
          red: { value: '#c8102e' },
          'red-hover': { value: '#a00d25' },
          gray: { value: '#6b7280' },
          'gray-200': { value: '#e5e7eb' },
          'gray-700': { value: '#374151' },
          white: { value: '#ffffff' },
          black: { value: '#111111' },
        },
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
      semanticTokens: {
        colors: {
          primary: {
            value: { base: '{colors.blue}', _dark: '{colors.white}' },
          },
          'primary-hover': {
            value: { base: '{colors.blue-hover}', _dark: '{colors.gray-200}' },
          },
          secondary: {
            value: { base: '{colors.navy}', _dark: '{colors.gray-200}' },
          },
          'secondary-hover': {
            value: { base: '{colors.blue}', _dark: '{colors.white}' },
          },
          danger: { value: { base: '{colors.red}', _dark: '{colors.red}' } },
          'danger-hover': {
            value: { base: '{colors.red-hover}', _dark: '{colors.red-hover}' },
          },
          interface: {
            value: { base: '{colors.gray-700}', _dark: '{colors.gray-200}' },
          },
          'interface-hover': {
            value: { base: '{colors.gray}', _dark: '{colors.white}' },
          },
          background: {
            value: { base: '{colors.white}', _dark: '{colors.navy}' },
          },
          'background-hover': {
            value: { base: '{colors.gray-200}', _dark: '{colors.gray-700}' },
          },
          'background-disabled': {
            value: { base: '{colors.gray-200}', _dark: '{colors.gray-700}' },
          },
          text: { value: { base: '{colors.black}', _dark: '{colors.white}' } },
          'text-disabled': {
            value: { base: '{colors.gray}', _dark: '{colors.gray}' },
          },
          'border-primary': {
            value: { base: '{colors.blue}', _dark: '{colors.white}' },
          },
        },
      },
      recipes: { button },
    },
  },
});
