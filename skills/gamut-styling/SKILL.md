---
name: gamut-styling
description: Style applications with Gamut design tokens and themes
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut-styles'
  audience: developers
---

## Overview

Gamut's styling system provides design tokens, theming, and responsive utilities. This skill covers:

- GamutProvider setup and theming
- Design tokens (colors, spacing, typography)
- Variance system for styled components
- Responsive styles and breakpoints
- Color modes (light/dark)
- Global styles and SCSS utilities

## Storybook Documentation

Explore the Gamut styling system in Storybook:

- **[Color System](https://gamut.codecademy.com/?path=/docs/foundations-theme--colors)** - All theme colors and swatches
- **[Spacing Scale](https://gamut.codecademy.com/?path=/docs/foundations-system-props--docs#space)** - Spacing values and usage
- **[Typography](https://gamut.codecademy.com/?path=/docs/foundations-theme--typography)** - Font sizes, weights, and families
- **[Responsive Properties](https://gamut.codecademy.com/?path=/docs/foundations-system-responsive-properties--page)** - Breakpoints and responsive styling

## Key concepts

## Storybook Documentation

Explore the Gamut styling system in Storybook:

- **[Color System](https://gamut.codecademy.com/?path=/docs/foundations-theme--colors)** - All theme colors and swatches
- **[Spacing Scale](https://gamut.codecademy.com/?path=/docs/foundations-system-props--docs#space)** - Spacing values and usage
- **[Typography](https://gamut.codecademy.com/?path=/docs/foundations-theme--typography)** - Font sizes, weights, and families
- **[Responsive Properties](https://gamut.codecademy.com/?path=/docs/foundations-system-responsive-properties--page)** - Breakpoints and responsive styling

### GamutProvider Setup

Wrap your application with GamutProvider to enable theming and global styles:

```tsx
import { GamutProvider } from '@codecademy/gamut-styles';
import { coreTheme } from '@codecademy/gamut-styles';

function App() {
  return (
    <GamutProvider theme={coreTheme}>{/* Your app content */}</GamutProvider>
  );
}
```

**GamutProvider props:**

- `theme`: Theme object (required) - Use `coreTheme`, `platformTheme`, `adminTheme`, `lxStudioTheme`, or `percipioTheme`
- `useGlobals`: Boolean (default: true) - Include Reboot and Typography global styles
- `useCache`: Boolean (default: true) - Create Emotion cache automatically
- `cache`: EmotionCache (optional) - Custom Emotion cache
- `nonce`: String (optional) - CSP nonce for inline styles
- `variables`: Record (optional) - Additional CSS custom properties

### Available Themes

```tsx
import {
  coreTheme, // Default Codecademy theme
  platformTheme, // Learning platform theme
  adminTheme, // Admin interface theme
  lxStudioTheme, // LX Studio theme
  percipioTheme, // Percipio theme
} from '@codecademy/gamut-styles';
```

### Design Tokens

Access design tokens through the theme object in styled components:

```tsx
import styled from '@emotion/styled';
import { system } from '@codecademy/gamut-styles';

const StyledBox = styled.div(system.space, system.color, system.layout);

// Usage
<StyledBox
  p={16} // padding: 16px
  bg="primary" // background: theme.colors.primary
  width={1} // width: 100%
/>;
```

### Important Constraint

**Inline `style` prop is disabled** on Gamut components. Always use variance system props instead:

```tsx
// ❌ Don't do this
<Box style={{ padding: '16px', background: 'blue' }}>...</Box>

// ✅ Do this instead
<Box p={16} bg="primary">...</Box>
```

This ensures consistent styling and better TypeScript support.

### Color System

Gamut provides semantic color tokens organized by swatch:

```tsx
import { colors } from '@codecademy/gamut-styles';

// Access colors from swatches
colors.blue[500]; // #1557FF
colors.navy[800]; // #10162F
colors.green[400]; // #AEE938
colors.yellow[500]; // #FFD300
colors.red[500]; // #FF1F1F
```

**Semantic color tokens:**

- `primary`: Primary brand color
- `primary-inverse`: Inverse of primary
- `background`: Default background
- `background-secondary`: Secondary background
- `background-current`: Current color mode background
- `text`: Default text color
- `text-secondary`: Secondary text color
- `border`: Default border color
- `success`, `warning`, `danger`, `info`: Status colors

### Spacing Scale

Use the spacing scale for consistent padding and margins:

```tsx
// Spacing values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96
<Box p={16} m={24} />  // padding: 16px, margin: 24px
<Box px={32} py={16} /> // horizontal: 32px, vertical: 16px
```

**Spacing props:**

- `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`: Padding
- `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`: Margin

### Typography Scale

Typography variants provide consistent text styles:

```tsx
import { Text } from '@codecademy/gamut';

<Text variant="title-xl">   // 48px, bold
<Text variant="title-lg">   // 36px, bold
<Text variant="title-md">   // 28px, bold
<Text variant="title-sm">   // 22px, bold
<Text variant="title-xs">   // 18px, bold
<Text variant="p-lg">       // 18px, regular
<Text variant="p-base">     // 16px, regular
<Text variant="p-sm">       // 14px, regular
```

**Font families:**

- `base`: Apercu (primary body font)
- `monospace`: Suisse Int'l Mono (code font)
- `accent`: Nunito Sans (accent font)

### Border Radius

Use consistent border radius values:

```tsx
<Box borderRadius="sm">  // 4px
<Box borderRadius="md">  // 8px
<Box borderRadius="lg">  // 12px
<Box borderRadius="xl">  // 16px
```

### Responsive Styles

Use the responsive utility for media query breakpoints:

```tsx
import { responsive } from '@codecademy/gamut-styles';

const StyledBox = styled.div`
  padding: 16px;

  ${responsive.md} {
    padding: 24px;
  }

  ${responsive.lg} {
    padding: 32px;
  }
`;
```

**Breakpoints:**

- `xs`: 480px
- `sm`: 768px
- `md`: 1024px
- `lg`: 1200px
- `xl`: 1440px

### Color Mode

Access the current color mode in styled components:

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

const StyledBox = styled.div`
  background: ${({ theme }) =>
    theme.mode === ColorMode.DARK
      ? theme.colors.navy[900]
      : theme.colors.white};
`;
```

Or use theme color tokens that automatically adapt:

```tsx
<Box bg="background" color="text">
  // Automatically uses correct colors for current mode
</Box>
```

### Variance System

Use the variance system to create styled components with variant props:

```tsx
import { variance, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const buttonVariants = variance.create({
  variant: {
    property: 'all',
    scale: {
      primary: {
        bg: 'primary',
        color: 'white',
      },
      secondary: {
        bg: 'secondary',
        color: 'text',
      },
    },
  },
});

const Button = styled.button(buttonVariants, system.space);

// Usage
<Button variant="primary" p={16}>
  Click me
</Button>;
```

### SCSS Utilities

For SCSS-based styling, import utilities:

```scss
@use '@codecademy/gamut-styles/utils';

.my-element {
  // Use responsive mixins
  @include utils.responsive(md) {
    padding: 24px;
  }

  // Use screen reader only mixin
  @include utils.sr-only;
}
```

Import core styles once in your application:

```scss
@use '@codecademy/gamut-styles/core';
```

This includes:

- Font face declarations
- CSS Reboot (normalize/reset)
- Base typography styles

## Common patterns

### Creating a themed component

```tsx
import styled from '@emotion/styled';
import { system } from '@codecademy/gamut-styles';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.spacing[24]}px;

  ${system.space}
  ${system.layout}
`;
```

### Using themed utility function

```tsx
import { themed } from '@codecademy/gamut-styles';

const Card = styled.div`
  ${themed('color', (colors) => ({
    background: colors.background,
    border: `1px solid ${colors.border}`,
  }))}
`;
```

### Box shadows

```tsx
import { boxShadow } from '@codecademy/gamut-styles';

const Card = styled.div`
  ${boxShadow({ level: 1 })} // Subtle shadow
  ${boxShadow({ level: 2 })}  // Medium shadow
  ${boxShadow({ level: 3 })} // Strong shadow
`;
```

### Focus visible styles

Gamut uses `:focus-visible` for keyboard-only focus indicators. The Emotion cache automatically adds the polyfill:

```tsx
const Button = styled.button`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
```

## Dependencies

The package requires:

- `@emotion/react` ^11.4.0
- `@emotion/styled` ^11.3.0
- `@emotion/cache` ^11.4.0
- `react` ^17.0.2 || ^18.2.0
- `stylis` ^4.0.7 (for CSS-in-JS processing)

Install with:

```bash
yarn add @codecademy/gamut-styles
```

## CSS Custom Properties

GamutProvider injects CSS custom properties for theme values:

```tsx
<GamutProvider
  theme={coreTheme}
  variables={{
    'custom-color': { color: '#ff0000' },
  }}
>
  {/* Variables injected as CSS custom properties */}
</GamutProvider>
```

Access in CSS:

```css
.my-element {
  color: var(--custom-color);
}
```
