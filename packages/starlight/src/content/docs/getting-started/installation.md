---
title: Installation
description: Add Gamut to a new application and wire up the provider, theme types, and test config.
sidebar:
  order: 1
---

## Add the packages

```bash
yarn add @codecademy/gamut-kit @emotion/react @emotion/styled
```

Add the rest of the Gamut scope as no-op peer dependencies so your editor's IntelliSense picks up their types:

```json title="package.json"
{
  "peerDependencies": {
    "@codecademy/gamut": "*",
    "@codecademy/gamut-icons": "*",
    "@codecademy/gamut-illustrations": "*",
    "@codecademy/gamut-patterns": "*",
    "@codecademy/gamut-styles": "*",
    "@codecademy/gamut-tests": "*",
    "@codecademy/variance": "*"
  }
}
```

## Wrap your app in `GamutProvider`

```tsx title="index.tsx"
import React from 'react';
import { render } from 'react-dom';
import { GamutProvider } from '@codecademy/gamut-styles';

import { App } from './App';

const rootElement = document.getElementById('root');

render(
  <GamutProvider>
    <App />
  </GamutProvider>,
  rootElement
);
```

`GamutProvider` does four things every Gamut app needs:

1. Wraps your app in the theme context.
2. Creates an Emotion cache with Gamut's plugins.
3. Injects global styles and CSS variables.
4. Sets the current color mode context and variables.

For Next.js, do this in `_app.tsx`. For Gatsby, do it in both `gatsby-ssr.js` and `gatsby-browser.js` via `wrapRootElement`.

If your app enforces a strict Content-Security-Policy (`style-src` without `'unsafe-inline'`), pass the same nonce your CSP header uses so Emotion's injected `<style>` tags are allowed:

```tsx
<GamutProvider nonce={yourCspNonce}>
  <App />
</GamutProvider>
```

## Add theme types

Gamut components read their allowed props from your Emotion theme shape, so declare it once:

```tsx title="theme.d.ts"
import '@emotion/react';

// Use whichever theme shape matches your app: `CoreTheme` or `PlatformTheme`.
import { CoreTheme } from '@codecademy/gamut-styles';

declare module '@emotion/react' {
  export interface Theme extends CoreTheme {}
}
```

See the [Emotion TypeScript docs](https://emotion.sh/docs/typescript#define-a-theme) for background on this pattern.

## Start building

```tsx
import { Background } from '@codecademy/gamut-styles';
import { Text } from '@codecademy/gamut';

export const App = () => (
  <Background bg="beige">
    <Text as="h1">Hello World!</Text>
  </Background>
);
```

Continue to [Build your first page](/getting-started/build-your-first-page/) to put a few more components together.

## Testing with Jest and Babel

Gamut ships modern JavaScript from `node_modules`, and Jest skips transpiling `node_modules` by default — so importing Gamut in tests can surface parse errors unless your transform opts those packages in.

```js title="jest.config.js"
transformIgnorePatterns: ['node_modules/(?!(@vidstack/react|@formatjs)/)'],
```

Add more scopes inside the non-capturing group if your dependency tree pulls in other untranspiled ESM packages. If tests only start failing after upgrading Gamut or a transitive dependency, compare your Jest/Babel config against Gamut's own and adjust `transformIgnorePatterns` and Babel plugins to match.
