# Setup

This project's Gamut components are pre-compiled into `_ds_bundle.js` on
`window.CodecademyGamut` — there is no `package.json`, `npm install`, or
build step to manage. Import by destructuring off that global, not from
`@codecademy/*` package specifiers (those don't resolve here).

## Runtime: `GamutProvider` with `percipioTheme`

All Gamut components require the design token context at runtime. Wrap the
app root in `GamutProvider`, then `ColorMode` for light/dark.

```jsx
const { GamutProvider, ColorMode, FillButton } = window.CodecademyGamut;

function App() {
  return (
    <GamutProvider theme={window.CodecademyGamut.percipioTheme}>
      <ColorMode mode="light">
        <FillButton>Click Me</FillButton>
      </ColorMode>
    </GamutProvider>
  );
}
```

> **Color rule:** never hardcode hex. Semantic tokens only resolve inside
> `ColorMode` — see `design-tokens/colors.md`.

### Rules

1. **Default to `percipioTheme`.** Use it for every new build unless the
   user explicitly requests a different theme.
2. **Use semantic color tokens, not core-theme assumptions.** `percipioTheme`
   remaps semantic tokens (e.g., `background-primary`) to Skillsoft's
   palette. Never hardcode Core-theme values like `beige` — semantic tokens
   adapt across themes.
3. **If a different theme is requested**, swap the `theme` prop.

## Available themes

| Theme     | Used for                                                   | Export          |
| --------- | ---------------------------------------------------------- | --------------- |
| Core      | Codecademy default                                         | `coreTheme`     |
| Admin     | Codecademy admin tools                                     | `adminTheme`    |
| Platform  | Codecademy learning environment / shared platform surfaces | `platformTheme` |
| LX Studio | Learning Experience Studio                                 | `lxStudioTheme` |
| Percipio  | Skillsoft Percipio platform (**default here**)             | `percipioTheme` |

## Theme vs color mode vs style API

| Concern                                                 | Where to read                                          |
| ------------------------------------------------------- | ------------------------------------------------------ |
| Which `theme` object to pass to `GamutProvider`         | This file                                              |
| Light / dark semantic colors, `ColorMode`, `Background` | `overview-color-modes.md` + `components/color-mode.md` |
| Spacing, typography, border-radius token values         | `design-tokens/*.md`                                   |
| Composed system-prop shorthand                          | `overview-styling.md`                                  |

## Loading the bundle in this runtime (x-import)

This environment evaluates each module via `new Function("React", "module", "exports", "require", code)` and loads React asynchronously — the bundle's own React-injection expects that. Four confirmed gotchas:

1. **Never write `const React = window.React` at the top of an x-import `.jsx`.** `React` is already an injected function parameter, and the strict-mode TypeScript preset throws `SyntaxError: redeclaration of formal parameter React` if you redeclare it. Just use `React` directly (`React.useEffect`, or destructure `const { useState } = React`).
2. **The bundle needs `window.React` set before it executes.** `_ds_bundle.js` references `react/jsx-runtime`, and its shim reads `window.React` at load time. A static `<script src="…_ds_bundle.js">` in `<helmet>` often runs before this runtime finishes loading React, producing `TypeError: can't access property "jsx", W5.exports is undefined`. Load the bundle only once `window.React` (and `window.ReactDOM`) exist:

   ```html
   <script>
     (function w() {
       if (window.React && window.ReactDOM) {
         var s = document.createElement('script');
         s.src = '_ds/.../_ds_bundle.js';
         document.head.appendChild(s);
       } else setTimeout(w, 30);
     })();
   </script>
   ```

3. **Don't "fix" #2 by loading your own React UMD bundle.** That creates a second React instance — `ReactDOM` binds to one, your hooks to the other — producing `can't access property "useState", g.current is null`. Always use the runtime's own `window.React`.
4. **Because the bundle now loads after first render, guard the component that reads it.** Hold a `ready` state, poll `window.CodecademyGamut` in an effect, render a loading placeholder until it exists, and read Gamut components **at render time** (`const { FlexBox } = window.CodecademyGamut` inside the component), not by destructuring at module scope before the bundle has loaded.

**One `GamutProvider` + `ColorMode` for the whole app.** Mounting individual Gamut components as separate x-imports, each with its own provider, won't share theme context between them.

## Dependency protection

Never build a local shim, wrapper, or reimplementation of a Gamut component
or theme — always use the real export from `window.CodecademyGamut`. If a
component or theme export you need doesn't appear to exist on the bundle,
say so explicitly rather than fabricating a substitute.
