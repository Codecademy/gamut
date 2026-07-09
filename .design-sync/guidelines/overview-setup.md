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

## Dependency protection

Never build a local shim, wrapper, or reimplementation of a Gamut component
or theme — always use the real export from `window.CodecademyGamut`. If a
component or theme export you need doesn't appear to exist on the bundle,
say so explicitly rather than fabricating a substitute.
