import { defineConfig, defineRecipe } from '@pandacss/dev';

/* Minimal Panda setup for the Module Federation spike — one `button` recipe with
 * all variants force-emitted (staticCss), so the COMPLETE static sheet a host
 * imports covers any variant a federated remote uses. */
const mk = (c: string) => ({
  bg: c,
  color: 'background',
  _hover: { bg: `${c}-hover` },
});

const button = defineRecipe({
  className: 'gmt-button',
  jsx: ['Button'],
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 'md',
    px: '16',
    py: '8',
    fontFamily: 'base',
    cursor: 'pointer',
  },
  variants: {
    variant: {
      primary: mk('primary'),
      secondary: mk('secondary'),
      danger: mk('danger'),
      interface: mk('interface'),
    },
  },
  defaultVariants: { variant: 'primary' },
});

export default defineConfig({
  preflight: false,
  jsxFramework: 'react',
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  staticCss: { recipes: { button: ['*'] } },
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: '#1557FF' },
          'primary-hover': { value: '#1145CC' },
          secondary: { value: '#10162F' },
          'secondary-hover': { value: '#000000' },
          danger: { value: '#C60C0C' },
          'danger-hover': { value: '#9E0A0A' },
          interface: { value: '#374151' },
          'interface-hover': { value: '#111111' },
          background: { value: '#ffffff' },
        },
        radii: { md: { value: '4px' } },
        fonts: { base: { value: 'system-ui, sans-serif' } },
        spacing: { '8': { value: '8px' }, '16': { value: '16px' } },
        borderWidths: { '2': { value: '2px' } },
      },
      recipes: { button },
    },
  },
});
