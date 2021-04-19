# Theme Construction

In order to use variance with your custom theme you must redeclare the emotion global `Theme`.

```tsx
import { theme } from './theme';

export type ThemeShape = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeShape {}
}
```

To help you create this strongly typed theme we've provided a few helpers to make it easier to progressively create a strongly typed and dynamic theme that will adhere to the correct types.

## `createTheme()`

This method is a set of chainable methods that will progressively add tokens, relationships, and core features to a theme object.

While many frameworks restrict theme scales to very specific sets we leave many of the particulars up to the user to define. There are only 3 required keys for variance specific utilities to behave correctly.

- `breakpoints` - Used for responsive properties.
- `colors` + `colorModes` - Color tokens for ColorMode computations

### Usage

```tsx
import * as tokens from './tokens';

export const { theme, variables, getColorValue } = createTheme({
  breakpoints: tokens.mediaQueries,
  spacing: tokens.spacing,
})
  .addColors('colors', tokens.colors)
  .createColorModes('light', {
    light: {
      primary: 'hyper',
      secondary: 'navy',
      text: 'navy',
      background: 'white',
    },
    dark: {
      primary: 'yellow',
      secondary: 'white',
      text: 'white',
      background: 'navy',
    },
  })
  .addVariables('spacing')
  .build();
```

### Return Values

- `theme` - A variance compatible theme with strong typings.
  - Values on theme may include references to more complex CSS variables without using the variables through a provider.
- `variables` - Serialized CSS variables that correspond with theme references. These are scoped to 2 main areas currently:
  - `root` - Top level variables to available for all HTML
  - `colorMode` - This is still placed on the root but is kept separate from the general variables as they are context dependent.
- `getColorValue` - Method that returns the static value for a named color without having to check the computed value or importing tokens and possible nested references.

### Methods

A theme creator method that progressively build and decorate a type safe theme object. This allows us to create a build separate themes that will be compatible with variance props. The raw theme must have a valid breakpoint scale to ensure breakpoint variable serialization.

**Standard Methods** - These are the core methods to add scales and variables to the theme object

- `addScale(scaleKey, updateFunction)` - Adds a set of tokens to the theme on the provided scale key. The current theme can be used as reference for this new scale for shared value reference.
- `updateScale(scaleKey, updateFunction)` - Updates an existing scale with new or computed value without them being explicitly declared. This can also be used to update or extend a theme for a different context (restrictions or expansions).
- `createScaleVariables(scaleKey)` - Takes a top level key of the current theme and serialized them as CSS variables. The theme will include references to CSS Variables and adds the actual token values to the root scope of our variable object.

**Special Methods** - these have specific behavior that is non standard, these are both required for all features to work

- `addColors(tokens)` - Adds color tokens to the theme and creates root color variables by default. Since this key is required by `getColorValue` and `addColorModes` it is differentiated.
- `addColorModes(initialMode, colorModes)` - This method takes a configuration of color aliases that have semantic meaning between contexts such as `light` and `dark` modes. This will take a map of modes and an initial mode.
  - Colors must exist on the theme for this to work, call this method after `addColors` to ensure this works correctly.
  - This creates CSS variables for the initial color mode and adds them to the specific bucket at the root scope and ensures that nested color variable references behave correctly (if variables change these will too).

**Finalization**

- `build()` - Called when all mutations are finished and we get the finalized and fully typed design system objects.

## `serializeTokens()`

This method predictably maps token literal values to CSS variables. We use this to store relational or contextual information in a single reference.

### Usage \*\*\*\*

```tsx
const { tokens, variables } = serializeTokens({
  black: '#000000',
  white: '#FFFFFF'
}, 'color', {});

// tokens
{ black: 'var(--color-black)', white: 'var(--color-white)' }

// variables
{ '--color-black': '#000000', '--color-white': '#FFFFFF' };
```

This will also work with possible nested selectors like breakpoints:

```tsx
const { tokens, variables } = serializeTokens({
  height: { _: '4rem', lg: '5rem' },
}, 'header', theme);

// tokens
{ height: 'var(--header-height)' }

// variables
{
  '--header-height': '4rem',
  '@media screen and (min-width: 1024px)': {
    '--header-height': '5rem',
  }
}
```

### Arguments

- `tokens` any set of tokens.
- `prefix` a string to prefix any tokens
- `theme` to reference existing tokens specifically for breakpoints.

### Return Values

- `tokens` \*\*\*\*- An object of the same keys as the first argument but with values that point to variable references
- `variables` - Valid CSS variables that are prefixed with the same keys.
