---
name: gamut-quickstart
description: Get started with Gamut design system in your application
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut-kit'
  audience: developers
  type: quickstart
---

## What I do

I help you get started with the Gamut design system by providing guidance on:

- Installing Gamut packages in your application
- Setting up the required providers and configuration
- Creating your first components with Gamut
- Understanding the package architecture
- Choosing the right packages for your needs

## When to use me

Use this skill when you need to:

- Set up Gamut in a new React application
- Understand the Gamut package ecosystem
- Get started with the basic setup and configuration
- Make decisions about which Gamut packages to use
- Troubleshoot initial setup issues

## Quick Start

### 1. Installation

**Option A: Use gamut-kit (Recommended)**

Install all core Gamut packages together:

```bash
yarn add @codecademy/gamut-kit
```

Then add peer dependencies to your `package.json`:

```json
{
  "peerDependencies": {
    "@codecademy/gamut": "*",
    "@codecademy/gamut-icons": "*",
    "@codecademy/gamut-patterns": "*",
    "@codecademy/gamut-illustrations": "*",
    "@codecademy/gamut-styles": "*",
    "@codecademy/variance": "*"
  }
}
```

**Option B: Install individual packages**

```bash
yarn add @codecademy/gamut @codecademy/gamut-styles @codecademy/gamut-icons
```

**Required peer dependencies:**

```bash
yarn add react react-dom @emotion/react @emotion/styled
```

### 2. Set up GamutProvider

Wrap your application with `GamutProvider` to enable theming and global styles:

```tsx
// src/App.tsx
import { GamutProvider, coreTheme } from '@codecademy/gamut-styles';

function App() {
  return (
    <GamutProvider theme={coreTheme}>
      <YourApp />
    </GamutProvider>
  );
}

export default App;
```

### 3. Use your first component

```tsx
// src/components/Welcome.tsx
import { Box, FlexBox, Text } from '@codecademy/gamut';
import { RocketIcon } from '@codecademy/gamut-icons';

export function Welcome() {
  return (
    <Box p={24} bg="background" borderRadius="lg">
      <FlexBox gap={16} alignItems="center">
        <RocketIcon size={32} color="primary" />
        <Box>
          <Text variant="title-lg">Welcome to Gamut!</Text>
          <Text variant="p-base" color="text-secondary">
            You're ready to build with the Codecademy design system.
          </Text>
        </Box>
      </FlexBox>
    </Box>
  );
}
```

## Package Overview

### Core Packages

**@codecademy/gamut**

- React component library
- Layout components (Box, FlexBox, GridBox)
- UI components (Tabs, Disclosure, Drawer, etc.)
- Form components (GridForm)
- Typography components (Text)

**@codecademy/gamut-styles**

- Theme system and design tokens
- GamutProvider for theming
- Emotion cache and styling utilities
- SCSS utilities and mixins
- Variance styling system

**@codecademy/gamut-icons**

- SVG icon components
- 300+ icons for common use cases
- Accessible icon components with proper ARIA support

### Supporting Packages

**@codecademy/gamut-patterns**

- Background pattern components
- 28 pattern variations (9 styles × 3 densities + Herringbone)
- Visual texture and decoration for interfaces

**@codecademy/gamut-illustrations**

- Illustration components for empty states and onboarding
- 70+ SVG illustrations organized by category
- Consistent brand artwork across products

**@codecademy/variance**

- TypeScript CSS-in-JS utility library
- Powers the styling system in Gamut

**@codecademy/gamut-kit**

- Meta-package that manages versions of all core packages
- Simplifies version management across packages

## Common Setup Tasks

### Adding TypeScript Support

Gamut is written in TypeScript and includes full type definitions:

```tsx
import { BoxProps, TextProps } from '@codecademy/gamut';
import { FC } from 'react';

interface CardProps extends BoxProps {
  title: string;
  description: string;
}

export const Card: FC<CardProps> = ({ title, description, ...boxProps }) => {
  return (
    <Box p={24} borderRadius="lg" border="1px solid" {...boxProps}>
      <Text variant="title-md">{title}</Text>
      <Text variant="p-base">{description}</Text>
    </Box>
  );
};
```

### Using with Next.js

For Next.js applications, create a custom `_app.tsx`:

```tsx
// pages/_app.tsx
import { GamutProvider, coreTheme } from '@codecademy/gamut-styles';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GamutProvider theme={coreTheme}>
      <Component {...pageProps} />
    </GamutProvider>
  );
}

export default MyApp;
```

For Next.js 13+ with app directory:

```tsx
// app/layout.tsx
import { GamutProvider, coreTheme } from '@codecademy/gamut-styles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GamutProvider theme={coreTheme}>{children}</GamutProvider>
      </body>
    </html>
  );
}
```

### Using with Create React App

CRA works out of the box with Gamut. Just install and use:

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GamutProvider, coreTheme } from '@codecademy/gamut-styles';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GamutProvider theme={coreTheme}>
      <App />
    </GamutProvider>
  </React.StrictMode>
);
```

### Using with Vite

Vite also works seamlessly:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GamutProvider, coreTheme } from '@codecademy/gamut-styles';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GamutProvider theme={coreTheme}>
      <App />
    </GamutProvider>
  </React.StrictMode>
);
```

### Adding SCSS Support

If you want to use SCSS utilities:

```scss
// styles/global.scss
@use '@codecademy/gamut-styles/core';
@use '@codecademy/gamut-styles/utils';

.my-component {
  @include utils.responsive(md) {
    padding: 24px;
  }
}
```

Import in your application:

```tsx
// src/index.tsx
import './styles/global.scss';
```

### Configuring Font Loading

Gamut includes fonts that need to be loaded. The `GamutProvider` handles this automatically when `useGlobals={true}` (default):

```tsx
<GamutProvider theme={coreTheme} useGlobals={true}>
  {/* Fonts are automatically loaded */}
</GamutProvider>
```

If you want to disable global styles:

```tsx
<GamutProvider theme={coreTheme} useGlobals={false}>
  {/* You'll need to load fonts manually */}
</GamutProvider>
```

## Building Your First Page

Here's a complete example of a simple page using Gamut:

```tsx
import { Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import {
  RocketIcon,
  CheckIcon,
  BookLibraryIcon,
} from '@codecademy/gamut-icons';

export function LandingPage() {
  return (
    <Box>
      {/* Header */}
      <Box bg="primary" p={48}>
        <FlexBox maxWidth={1200} mx="auto" gap={32} alignItems="center">
          <RocketIcon size={64} color="white" />
          <Box>
            <Text variant="title-xl" color="white">
              Build Amazing Things
            </Text>
            <Text variant="p-lg" color="white">
              With the Codecademy design system
            </Text>
          </Box>
        </FlexBox>
      </Box>

      {/* Features */}
      <Box p={48} bg="background">
        <GridBox
          columns={{ base: '1fr', md: '1fr 1fr 1fr' }}
          gap={32}
          maxWidth={1200}
          mx="auto"
        >
          <FeatureCard
            icon={<CheckIcon size={32} color="success" />}
            title="Easy to Use"
            description="Get started quickly with our intuitive components"
          />
          <FeatureCard
            icon={<BookLibraryIcon size={32} color="primary" />}
            title="Well Documented"
            description="Comprehensive docs and examples for every component"
          />
          <FeatureCard
            icon={<RocketIcon size={32} color="warning" />}
            title="Production Ready"
            description="Battle-tested components used by millions"
          />
        </GridBox>
      </Box>
    </Box>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Box
      p={24}
      bg="background-secondary"
      borderRadius="lg"
      border="1px solid"
      borderColor="border"
    >
      <Box mb={16}>{icon}</Box>
      <Text variant="title-md" mb={8}>
        {title}
      </Text>
      <Text variant="p-base" color="text-secondary">
        {description}
      </Text>
    </Box>
  );
}
```

## Troubleshooting

### Focus-visible polyfill

Gamut uses the `:focus-visible` CSS selector. If you see focus styling issues:

1. Install the polyfill:

```bash
yarn add focus-visible
```

2. Import it in your app:

```tsx
import 'focus-visible';
```

### Emotion cache issues

If you see duplicate styles or CSP errors:

```tsx
import {
  GamutProvider,
  createEmotionCache,
  coreTheme,
} from '@codecademy/gamut-styles';

const cache = createEmotionCache({
  key: 'gamut',
  nonce: 'your-csp-nonce', // if using CSP
});

<GamutProvider theme={coreTheme} cache={cache}>
  {/* Your app */}
</GamutProvider>;
```

### TypeScript errors

Ensure you have the correct TypeScript configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@emotion/react",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Font loading issues

If fonts don't load:

1. Check that `useGlobals={true}` on GamutProvider
2. Verify the fonts are included in your build (webpack/vite config)
3. Check browser console for 404 errors

## Next Steps

After initial setup:

1. **Explore components** - Load the `gamut-components` skill to learn about available components
2. **Learn styling** - Load the `gamut-styling` skill for theming and design tokens
3. **Add icons** - Load the `gamut-icons` skill to browse available icons
4. **Build forms** - Load the `gamut-forms` skill for form components
5. **Customize theme** - Load the `gamut-theming` skill to create custom themes

## Resources

- [Gamut Storybook](https://gamut.codecademy.com/) - Interactive component documentation
- [GitHub Repository](https://github.com/Codecademy/gamut) - Source code and examples
- [NPM Packages](https://www.npmjs.com/search?q=%40codecademy) - Published packages

## Version Requirements

- React: ^17.0.2 || ^18.2.0
- React DOM: ^17.0.2 || ^18.2.0
- @emotion/react: ^11.4.0
- @emotion/styled: ^11.3.0
- Node.js: >= 14.0.0

## Browser Support

Gamut supports all modern browsers:

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)
