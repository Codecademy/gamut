---
title: Creating a custom theme
description: Build a custom theme with gamut-styles' createTheme builder.
---

## When to reach for this

Most apps should [choose an existing theme](/guides/theming-your-app/) rather than build a new one — reach for a custom theme only for a genuinely new product surface that doesn't fit Core, Admin, LX Studio, Percipio, or Platform.

## The `createTheme` builder

Themes are built with `createTheme` from `@codecademy/variance`, giving you type-safe autocomplete, automatic CSS variable generation, built-in light/dark color mode support, and full compatibility with existing Gamut components:

```tsx
import { createTheme } from '@codecademy/variance';

const myTheme = createTheme({
  ...baseTheme,
  fontFamily: customFontFamily,
})
  .addColors(colorPalette)
  .addColorModes('light', colorModeConfig)
  .addScale('customProperty', scaleFunction) // only for new scales
  .addName('my-theme')
  .build();
```

## 1. Start from `coreTheme`

Extend `coreTheme` unless you're certain you have a full replacement for every token — see [Themes](/reference/themes/) for what Core already provides:

```tsx
import { createTheme } from '@codecademy/variance';
import { coreTheme } from '@codecademy/gamut-styles';

const myCustomTheme = createTheme({
  ...coreTheme,
  // your overrides here
});
```

## 2. Define a color palette

Build an object of your brand's raw colors — usually a `brand` object, plus a numbered `50`–`900` scale per hue:

```tsx
const myColorPalette = {
  brand: {
    primary: '#004C54',
    secondary: '#000000',
    black: '#000000',
    white: '#FFFFFF',
  },
  kelly: {
    50: '#E6FFF7',
    500: '#00B388',
    900: '#004D3D',
    // ...the rest of the scale
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#DC2626',
};

const myTheme = createTheme({ ...coreTheme }).addColors(myColorPalette);
```

## 3. Map colors to semantic tokens per color mode

`.addColorModes` maps your palette onto the same semantic aliases Gamut components already read from — `text`, `background`, `primary`, `secondary`, `border`, and the rest — once per color mode. See [Color modes](/concepts/color-modes/) for what each alias means:

```tsx
const myTheme = createTheme({ ...coreTheme })
  .addColors(myColorPalette)
  .addColorModes('light', {
    light: {
      text: { _: 'brand-black', secondary: 'silver-700' },
      background: { _: 'brand-white', primary: 'kelly-50' },
      primary: { _: 'brand-primary', hover: 'kelly-700' },
      border: { primary: 'kelly-500', secondary: 'kelly-200' },
      // ...
    },
    dark: {
      text: { _: 'brand-white', secondary: 'silver-400' },
      background: { _: 'brand-black', primary: 'midnight-800' },
      primary: { _: 'brand-accent', hover: 'silver-400' },
      border: { primary: 'midnight-600', secondary: 'midnight-700' },
      // ...
    },
  });
```

## 4. Override or add scales

Override an existing scale — `spacing`, `fontFamily`, `fontWeight`, and the rest — directly in the initial `createTheme()` object. Reach for `.addScale()` only for a genuinely new scale that doesn't already exist on `coreTheme`:

```tsx
const myTheme = createTheme({
  ...coreTheme,
  fontFamily: { ...coreTheme.fontFamily, base: '"Roboto", sans-serif' },
  spacing: { ...coreTheme.spacing, xs: 4, sm: 8, md: 16 },
})
  .addColors(myColorPalette)
  .addColorModes('light', colorModeConfig)
  .addScale('shadows', ({ colors }) => ({
    sm: `0 1px 2px ${colors['shadow-primary']}`,
    md: `0 4px 6px ${colors['shadow-secondary']}`,
  }));
```

## 5. Convert scales to CSS variables

`.createScaleVariables` turns a scale into real CSS custom properties, for better runtime performance:

```tsx
const myTheme = createTheme({ ...coreTheme })
  .addColors(myColorPalette)
  .addColorModes('light', colorModeConfig)
  .addScale('shadows', shadowConfig)
  .createScaleVariables('shadows') // creates --shadow-sm, --shadow-md, ...
  .addName('my-custom-theme')
  .build();
```

## Using your theme

Follow [Installation](/getting-started/installation/) to wire up `GamutProvider` with your new theme, the same way you would with any existing one.

To preview it against real components in Storybook before shipping, register it in the theme switcher:

```tsx
// packages/styleguide/.storybook/theming/GamutThemeProvider.tsx
const themeMap = {
  core: coreTheme,
  admin: adminTheme,
  lxStudio: lxStudioTheme,
  percipio: percipioTheme,
  'your-theme-here': yourCustomTheme,
} as const;
```

```tsx
// .storybook/preview.ts
theme: {
  name: 'Theme',
  defaultValue: 'percipio',
  toolbar: {
    icon: 'paintbrush',
    items: [
      { value: 'core', title: 'Core' },
      { value: 'your-theme-here', title: 'Custom Theme' },
    ],
  },
},
```

## Best practices

- Replace every token, or extend from `coreTheme` — a partial theme breaks compatibility with existing components.
- Override an existing scale in `createTheme()`'s initial object; reach for `.addScale()` only for scales that don't already exist.
- Map your palette to semantic color names (`primary`, `secondary`, and the rest), not just raw brand colors.
- Provide both light and dark color modes.
- Convert frequently-used scales to CSS variables for performance.
- Test the theme against real Gamut components before shipping it.
