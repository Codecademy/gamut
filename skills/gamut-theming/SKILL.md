---
name: gamut-theming
description: Create and customize themes in Gamut design system
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut-styles'
  audience: developers
  type: theming
---

## What I do

I help you create and customize themes in Gamut by providing guidance on:

- Understanding the Gamut theme structure
- Choosing the right theme for your application
- Creating custom themes
- Extending existing themes
- Managing color modes (light/dark)
- Using theme values in components

## When to use me

Use this skill when you need to:

- Set up theming for a Gamut-based application
- Choose between available Gamut themes
- Create a custom theme for your product
- Extend or modify an existing theme
- Implement dark mode or other color modes
- Access theme values in styled components

## Key concepts

### Available Themes

Gamut provides several pre-built themes:

```tsx
import {
  coreTheme, // Default Codecademy theme
  platformTheme, // Learning platform theme
  adminTheme, // Admin interface theme
  lxStudioTheme, // LX Studio theme
  percipioTheme, // Percipio theme
} from '@codecademy/gamut-styles';
```

**Use cases:**

- `coreTheme`: General Codecademy applications, marketing sites
- `platformTheme`: Main learning platform, learner-facing features
- `adminTheme`: Internal tools, admin panels
- `lxStudioTheme`: Content creation tools (uses Hanken Grotesk font)
- `percipioTheme`: Percipio product integration

### Theme Structure

A Gamut theme is an object with this structure:

```typescript
interface Theme {
  // Color system
  colors: {
    // Swatches
    blue: { 0: string; 100: string; 300: string; ... };
    navy: { 100: string; 200: string; ... };
    green: { 0: string; 100: string; ... };
    yellow: { 0: string; 400: string; ... };
    red: { 0: string; 100: string; ... };
    // ... other swatches

    // Semantic tokens
    primary: string;
    secondary: string;
    background: string;
    'background-secondary': string;
    text: string;
    'text-secondary': string;
    border: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    // ... many more
  };

  // Spacing scale (in pixels)
  spacing: {
    4: number;
    8: number;
    12: number;
    16: number;
    24: number;
    32: number;
    40: number;
    48: number;
    64: number;
    96: number;
  };

  // Border radii
  borderRadii: {
    sm: string;  // 4px
    md: string;  // 8px
    lg: string;  // 12px
    xl: string;  // 16px
  };

  // Typography
  fontFamilies: {
    base: string;       // Apercu (core); Hanken Grotesk (lxStudio)
    monospace: string;  // Suisse Int'l Mono
    accent: string;     // Nunito Sans
  };

  fontSizes: {
    12: number;
    14: number;
    16: number;
    18: number;
    22: number;
    28: number;
    36: number;
    48: number;
  };

  fontWeights: {
    normal: number;   // 400
    medium: number;   // 500
    bold: number;     // 700
  };

  lineHeights: {
    base: number;     // 1.5
    title: number;    // 1.25
    normal: number;   // 1
  };

  // Timing
  timing: {
    fast: number;     // 150ms
    medium: number;   // 300ms
    slow: number;     // 500ms
  };

  // Breakpoints
  breakpoints: {
    xs: string;  // 480px
    sm: string;  // 768px
    md: string;  // 1024px
    lg: string;  // 1200px
    xl: string;  // 1440px
  };

  // Internal
  _variables: Record<string, any>;
  mode?: 'light' | 'dark';
}
```

### Using a Theme

Wrap your application with GamutProvider and pass the theme:

```tsx
import { GamutProvider, coreTheme } from '@codecademy/gamut-styles';

function App() {
  return <GamutProvider theme={coreTheme}>{/* Your app */}</GamutProvider>;
}
```

**[View all themes in Storybook →](https://gamut.codecademy.com/?path=/docs/foundations-theme--colors)**

### Creating a Custom Theme

Create a custom theme by extending an existing one:

```tsx
import { coreTheme } from '@codecademy/gamut-styles';

const myCustomTheme = {
  ...coreTheme,
  colors: {
    ...coreTheme.colors,
    // Override specific colors
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    // Add custom colors
    'custom-accent': '#95E1D3',
  },
};

// Use your custom theme
<GamutProvider theme={myCustomTheme}>{/* Your app */}</GamutProvider>;
```

### Accessing Theme in Styled Components

Access theme values via the `theme` prop in styled components:

```tsx
import styled from '@emotion/styled';

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[16]}px;
  border-radius: ${({ theme }) => theme.borderRadii.md};
  font-family: ${({ theme }) => theme.fontFamilies.base};
  transition: all ${({ theme }) => theme.timing.fast}ms;

  &:hover {
    background: ${({ theme }) => theme.colors['primary-dark']};
  }
`;
```

### Using the useTheme Hook

Access theme values in components:

```tsx
import { useTheme } from '@emotion/react';

function MyComponent() {
  const theme = useTheme();

  return (
    <div
      style={{
        color: theme.colors.primary,
        padding: theme.spacing[16],
      }}
    >
      Content
    </div>
  );
}
```

### Color Modes

Gamut supports light and dark color modes:

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

// In a styled component
const Card = styled.div`
  background: ${({ theme }) =>
    theme.mode === ColorMode.DARK
      ? theme.colors.navy[800]
      : theme.colors.white};
`;
```

**Better approach:** Use semantic color tokens that adapt automatically:

```tsx
const Card = styled.div`
  background: ${({ theme }) => theme.colors['background']};
  color: ${({ theme }) => theme.colors['text']};
  border: 1px solid ${({ theme }) => theme.colors['border']};
`;
```

### Theme Color Swatches

Gamut organizes colors into swatches with numeric scales:

```tsx
// Blues (0, 100, 300, 400, 500, 800)
theme.colors.blue[0]; // #F5FCFF (lightest)
theme.colors.blue[100]; // #D3F2FF
theme.colors.blue[500]; // #1557FF (primary blue)
theme.colors.blue[800]; // #1D2340 (darkest)

// Navy (100-900)
theme.colors.navy[100]; // Very light
theme.colors.navy[800]; // #10162F (darkest)

// Green (0, 100, 400, 700, 900)
theme.colors.green[0]; // #F5FFE3
theme.colors.green[400]; // #AEE938
theme.colors.green[700]; // #008A27

// Red (0, 100, 400, 500, 900)
theme.colors.red[0]; // #FFF2F2
theme.colors.red[500]; // #FF1F1F
theme.colors.red[900]; // #1C0606

// Yellow (0, 400, 500, 900)
theme.colors.yellow[0]; // #FFFAE5
theme.colors.yellow[500]; // #FFD300
theme.colors.yellow[900]; // #211B00
```

### Semantic Color Tokens

Use semantic tokens instead of direct color values:

```tsx
// Status colors
theme.colors.success;
theme.colors.warning;
theme.colors.danger;
theme.colors.info;

// Text colors
theme.colors.text; // Primary text
theme.colors['text-secondary']; // Secondary text
theme.colors['text-disabled']; // Disabled text

// Background colors
theme.colors.background;
theme.colors['background-secondary'];
theme.colors['background-current'];

// Border colors
theme.colors.border;
theme.colors['border-secondary'];

// Brand colors
theme.colors.primary;
theme.colors.secondary;
theme.colors['primary-inverse'];
```

## Common patterns

### Creating a theme variant

```tsx
const darkTheme = {
  ...coreTheme,
  mode: 'dark' as const,
  colors: {
    ...coreTheme.colors,
    background: coreTheme.colors.navy[800],
    'background-secondary': coreTheme.colors.navy[700],
    text: coreTheme.colors.white,
    'text-secondary': coreTheme.colors.navy[300],
    border: coreTheme.colors.navy[600],
  },
};
```

### Theme switching

```tsx
import { useState } from 'react';
import { coreTheme, darkTheme } from './themes';

function App() {
  const [theme, setTheme] = useState(coreTheme);

  const toggleTheme = () => {
    setTheme((current) => (current === coreTheme ? darkTheme : coreTheme));
  };

  return (
    <GamutProvider theme={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* App content */}
    </GamutProvider>
  );
}
```

### Responsive theme values

```tsx
import { responsive } from '@codecademy/gamut-styles';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing[16]}px;

  ${responsive.md} {
    padding: ${({ theme }) => theme.spacing[24]}px;
  }

  ${responsive.lg} {
    padding: ${({ theme }) => theme.spacing[32]}px;
  }
`;
```

### Theme-aware utility

```tsx
import { themed } from '@codecademy/gamut-styles';

const Card = styled.div`
  ${themed('color', (colors) => ({
    background: colors.background,
    border: `1px solid ${colors.border}`,
    color: colors.text,
  }))}

  ${themed('spacing', (spacing) => ({
    padding: spacing[24],
  }))}
`;
```

### Extending theme with custom tokens

```tsx
const myTheme = {
  ...coreTheme,
  colors: {
    ...coreTheme.colors,
    'brand-purple': '#9D4EDD',
    'brand-teal': '#06FFA5',
  },
  // Add custom spacing
  spacing: {
    ...coreTheme.spacing,
    128: 128,
    256: 256,
  },
};

// TypeScript: Extend theme types
declare module '@emotion/react' {
  export interface Theme {
    colors: typeof myTheme.colors;
    spacing: typeof myTheme.spacing;
  }
}
```

## Best practices

1. **Always use semantic tokens** instead of direct color values when possible
2. **Extend existing themes** rather than creating from scratch
3. **Use theme values** for all spacing, colors, and typography
4. **Leverage TypeScript** for type-safe theme access
5. **Prefer variance system props** over direct theme access in components
6. **Test in both light and dark modes** if supporting color modes
7. **Keep custom themes consistent** with Gamut's design principles

## Dependencies

Theming is part of `@codecademy/gamut-styles`:

```bash
yarn add @codecademy/gamut-styles
```

Requires:

- `@emotion/react` ^11.4.0
- `@emotion/styled` ^11.3.0
- `react` ^17.0.2 || ^18.2.0
