# Gamut theming

## Documentation

Primary reference: [ColorMode / Background](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) on Storybook.

Source MDX in monorepo: `packages/styleguide/src/lib/Foundations/ColorMode/ColorMode.mdx`  
Implementation: `packages/gamut-styles/src/ColorMode.tsx` and Background APIs.

## ColorMode

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

<ColorMode mode="light">{children}</ColorMode>
<ColorMode mode="system">{children}</ColorMode>
```

`system` resolves to light or dark from `prefers-color-scheme`.

**Placement:** Prefer **`ColorMode` near the root of the app** (or top-level layout) so the whole tree shares one mode. Add nested `ColorMode` only when a subtree must diverge from the global preference.

## Background

```tsx
import { Background } from '@codecademy/gamut-styles';

<Background bg="hyper">{children}</Background>;
```

Use **`Background` for sections** that need a **specific branded or alternate surface**, that must expose **`background-current`** to children, or where you want the **surface to drive an accessible mode** instead of manually syncing light/dark—`Background` adjusts mode when contrast would fail and establishes context inside the section. Prefer it over guessing mode per block.

## Semantic aliases

Common keys include `text`, `background`, `primary`, `secondary` (set may expand). Components should use these aliases so they work inside any wrapped mode.

## Hooks

- `useColorMode()` → `[mode, modeColors, modes]`
- `useCurrentMode()` → active mode key
- `useTheme()` from `@emotion/react` for full Emotion theme when needed

## Platform / multi-theme

Platform-specific themes (e.g. Percipio, LX Studio) are documented under styleguide Foundations. App developers usually **consume** the provided theme; adding or changing modes belongs in the Gamut library with Storybook and migration notes.

## Troubleshooting

- **Wrong colors** — Check ancestor `ColorMode` / `Background` and semantic prop names.
- **Contrast** — Prefer `Background` for surfaces; avoid hardcoded pairs.
- **Fighting Emotion theme** — Use hooks and semantic tokens instead of copying internal variable names.

## Related

- [gamut-consumer.md](./gamut-consumer.md) — system props, layout, eslint, general consumption.
- [gamut-accessibility.md](./gamut-accessibility.md) — focus, ARIA, overlays (often interacts with themed surfaces).
