# Color Modes

Gamut uses semantic color aliases so components adapt to light/dark mode without configuration. See [color.md](color.md) for the full alias reference and decision guide.

Product tokens: Semantic mappings vary by theme. Confirm aliases and palette keys against root `DESIGN.md` and the active theme Storybook page — do not assume Codecademy Core values in Percipio, LX Studio, or other products.

Deep reference: [`skills/gamut-color-mode/SKILL.md`](../../skills/gamut-color-mode/SKILL.md) · Storybook [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page)

## When to use the color mode system

For any dark or light region — sidebars, footers, hero bands, callouts, panels, whole-app dark mode — use `ColorMode` or `Background` from `@codecademy/gamut-styles`. Do not handle these with custom CSS, hardcoded `rgba`, or manual color swaps.

| Component    | Use when                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `ColorMode`  | You know the mode (`light`, `dark`, or `system` for OS preference).                             |
| `Background` | Background color is a palette token and Gamut should pick the best contrast mode automatically. |

## Rules

1. Never override Gamut colors with custom CSS when a `ColorMode` or `Background` wrapper achieves the same result via tokens.
2. Prefer `ColorMode` over `Background` when the intended mode is known (e.g. sidebar always dark). Use `Background` when the surface color is fixed and mode should adapt.
3. `ColorMode` has no `as` prop — nest semantic elements inside (`<nav>`, `<aside>`, `<footer>`).
4. System props work on `ColorMode` — `p`, `m`, `width`, `position`, etc. without extra wrappers.
5. `mode="system"` follows OS `prefers-color-scheme`. For in-app theme toggles, pass `mode="light"` or `mode="dark"` from your own state.

## `<ColorMode>`

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

<ColorMode mode="light">{children}</ColorMode>
<ColorMode mode="dark">{children}</ColorMode>
<ColorMode mode="system">{children}</ColorMode>
```

Props: `mode="light" | "dark" | "system"`

## `<Background>`

Use `<Background>` — not a raw `bg` on layout — for colored sections with text or interactive children. Pass a palette token to `bg` (e.g. `hyper`, `navy`), not a semantic alias.

```tsx
import { Background } from '@codecademy/gamut-styles';

<Background bg="hyper">{children}</Background>;
```

Nesting is supported — each `<Background>` creates its own accessible color context.

## Hooks

| Hook                   | Returns                               | Use                                                        |
| ---------------------- | ------------------------------------- | ---------------------------------------------------------- |
| `useCurrentMode()`     | `"light" \| "dark"`                   | Active mode key only                                       |
| `useColorModes()`      | mode key, colors, all modes, resolver | Full mode data + `getColorValue`                           |
| `usePrefersDarkMode()` | `boolean`                             | OS dark preference (prefer `mode="system"` on `ColorMode`) |

Import from `@codecademy/gamut-styles`.

## Example (Core theme)

Core light/dark semantic mappings are documented in Storybook [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page). Other themes remap the same alias names to different palette values — verify in `DESIGN.md` and the product theme story before hardcoding palette fallbacks.
Storybook: [Foundations / ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) · [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page)

## Common mistakes

- Do not use raw palette tokens (`navy-400`, `white`) for text/backgrounds that must adapt across modes — use semantic aliases.
- Do not use a raw `bg` prop on colored sections with content — use `<Background>`.
- Do not wire `usePrefersDarkMode()` into `ColorMode` when `mode="system"` suffices.
