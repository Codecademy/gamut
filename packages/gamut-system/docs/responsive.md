# Responsive Properties

Being able to configure your styles for multiple screensizes is often very necessary. We make all style functions accept valid configurations of our responsive property spec.

Responsive configurations are two basic shape a map of breakpoint aliases / values or an array of values:

```tsx
export type MediaQueryArray<Value> = [
  Value?, // base
  Value?, // xs
  Value?, // sm
  Value?, // md
  Value?, // lg
  Value? // xl
];

export type MediaQueryMap<Value> = {
  base?: Value;
  xs?: Value;
  sm?: Value;
  md?: Value;
  lg?: Value;
  xl?: Value;
};

export type ResponsiveProp<Value> =
  | Value
  | MediaQueryArray<Value>
  | MediaQueryMap<Value>;
```

What this looks like in practice:

```tsx
const Box = styled.div`
  ${display}
`

// Array Syntax
<Box display={['none', ,'block']} />

// Alias Syntax
<Box display={{ base: 'none', sm: 'block' }} />
```

Output styles:

```scss
.#{emotionHash} {
  display: 'none';

  @media (min-width: 480px) {
    display: 'block';
  }
}
```

## Default Breakpoints

If you do not have a preference on the breakpoints that you use we default to this set:

| Alias | Mediaquery                   |
| ----- | ---------------------------- |
| xs    | `@media (min-width: 320px)`  |
| sm    | `@media (min-width: 480px)`  |
| md    | `@media (min-width: 768px)`  |
| lg    | `@media (min-width: 1024px)` |
| xl    | `@media (min-width: 1248px)` |

## Custom Breakpoints

If you would like to use your own, we allow you to specificy 5 different breakpoints through the theme shape:

```tsx
import React from 'react';
import { ThemeProvider } from 'emotion-theming';

const MyTheme = {
  // Other theme configurations
  breakpoints: {
    xs: '@media (max-width: 2px)';
    sm: '@media (max-width: 4px)';
    md: '@media (max-width: 8px)';
    lg: '@media (max-width: 16px)';
    xl: '@media (max-width: 32px)';
  }
}

export const { properties, propertyGroups } = system<{}, typeof MyTheme>();

export const Apps = ({ children }) => <ThemeProvider theme={MyTheme}>{chidlren}</ThemeProvider>
```
