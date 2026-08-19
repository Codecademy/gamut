---
sidebar_position: 1
---

# Installation

Gamut ships as a set of scoped npm packages. `@codecademy/gamut-kit` bundles
the component library together with its required peer packages, so most
apps only need to add that plus Emotion:

```bash
yarn add @codecademy/gamut-kit @emotion/react @emotion/styled
```

`gamut-kit` re-exports `@codecademy/gamut`, `@codecademy/gamut-styles`,
`@codecademy/gamut-icons`, `@codecademy/gamut-illustrations`,
`@codecademy/gamut-patterns`, `@codecademy/variance`, and
`@codecademy/gamut-tests` at compatible versions, so you don't have to pin
each one individually.

## Wrap your app in `GamutProvider`

Every Gamut component relies on theme context for color mode, spacing, and
typography. Wrap the root of your app once:

```tsx
import { GamutProvider } from '@codecademy/gamut-styles';

function Root() {
  return (
    <GamutProvider>
      <App />
    </GamutProvider>
  );
}
```

`GamutProvider` supplies the default theme and enables color-mode switching.
See [Theming your app](../guides/theming-your-app.md) if you need a
non-default theme (Admin, Platform, LX Studio, Percipio) or custom color
mode behavior.

## TypeScript

If you're using Emotion's `styled` with the theme, augment Emotion's
`Theme` type so `theme.color`, `theme.spacing`, etc. resolve correctly:

```ts
// theme.d.ts
import '@emotion/react';
import { CoreTheme } from '@codecademy/gamut-styles';

declare module '@emotion/react' {
  export interface Theme extends CoreTheme {}
}
```

## Content Security Policy

Gamut's Emotion styles are injected at runtime. If your app enforces a
strict CSP, pass a `nonce` through to `GamutProvider` matching the nonce
your server issues for `<style>` tags.

## Next steps

- [Build your first page](./build-your-first-page.md) — put a working page
  together with a handful of Gamut components.
- [Using this site](./using-this-site.md) — how the docs are organized and
  how to find what you need quickly.
