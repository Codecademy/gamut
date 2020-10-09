# Customizing your System

By default calling system will return the base `CSSType` definitions for each rule and some extra transforms for quality of life. However,
there are many cases where we want more strict typings for our style functions or to have custom transformations. This can be configured
by creating a prop config: an immutable definition that defines the way the style functions should be constructed.

## Config Specifcation

- `propName`: Any defined prop in the system.
- `dependentProps`: An array of alternative props that you would like to group with the same style function.
- `type`: Declare the template type `standard` by default or `directional` for properties that have a shorthand for directional values.
- `computedValue`: There may be cases where you would like to transform or compute a property value into something more CSS
  friendly some examples may be adding units or looking up configurations. You may provide a `computeValue` function on your config to do this.
- `scale`: Either a typed array/object literal or a key of your theme that has those values.

```tsx
type AbstractPropertyConfig = {
  propName: PropAlias;
  dependentProps?: Readonly<string[]>;
  type?: 'standard' | 'directional';
  scale?: AbstractScales;
  computeValue?: TransformValue;
};
```

## Usage

To use this you must pass a subset of the base config and its property definitions (propGroups and handlers):

```tsx
export const { properties } = system({
  typography: {
    fontSize: {
      propName: 'fontSize',
      scale: {
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
      },
    },
  },
});
```

The resulting types for your `fontSize` property and ALL consumers (`typography` and `variants`) will now be only the values specified as keys on your scale:

```tsx
// Compiles
<Text fontSize="xs" />

// Type Error
<Text fontSize="1rem" />
```

### Using with a theme

Using a theme can make this even more flexible.

```tsx

type ThemeShape = {
  fontSizes: { xs: string, sm: string, md: string, lg: string };
}


export const { properties }  = (system as ThemedSystem<ThemeShape>)({
  typography: {
    fontSize: {
      propName: 'fontSize',
      scale: 'fontSizes'
  },
});
```

In your react code:

```tsx
import React from 'react';
import { ThemeProvider } from 'emotion-theming';

const theme = {
  fontSizes: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '3rem',
  },
};

const App = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
```

Your components will automatically look these values up from your theme. This also means the values of your keys can change depending on the context.
Making aliasing color combinations etc far easier.
