# Color Modes

Gamut uses **semantic color aliases** so components adapt to light/dark mode without configuration. See [color.md](color.md) for the full alias reference.

## `<ColorMode>`

Wraps a subtree in an explicit color mode. Nest to create scoped mode regions.

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

<ColorMode mode="light">{children}</ColorMode>   // force light
<ColorMode mode="dark">{children}</ColorMode>    // force dark
<ColorMode mode="system">{children}</ColorMode>  // follows OS preference
```

**Props**: `mode="light" | "dark" | "system"`

## `<Background>`

Use `<Background>` — not a raw `bg` prop — whenever setting a colored background on a section that contains text or interactive elements. It automatically switches the color mode inside to maintain accessible contrast.

```tsx
import { Background } from '@codecademy/gamut-styles';

<Background bg="hyper">{children}</Background>;
```

Nesting is supported — each `<Background>` creates its own accessible color context.

## Hooks

| Hook                   | Returns                                                 | Use                                               |
| ---------------------- | ------------------------------------------------------- | ------------------------------------------------- |
| `useCurrentMode()`     | `"light" \| "dark"`                                     | Active mode key only                              |
| `useColorModes()`      | `[modeKey, currentModeColors, allModes, getColorValue]` | Full mode data + resolver for semantic color keys |
| `usePrefersDarkMode()` | `boolean`                                               | OS `prefers-color-scheme: dark` only              |

Import from `@codecademy/gamut-styles`.

**Storybook:** [Foundations / ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) · [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page)

## Common mistakes

- Do not use raw color tokens (`navy-400`, `white`) for text/backgrounds that must be accessible across modes — use semantic aliases.
- Do not use a raw `bg` prop on colored sections containing content — use `<Background>` so contrast is guaranteed.
- Do not manually toggle modes from `usePrefersDarkMode()` — use `<ColorMode mode="system">` instead.
