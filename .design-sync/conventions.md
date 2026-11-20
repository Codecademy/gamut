# Gamut Design System

> **STOP — required reading before generating any code.** Read these in order before writing a single line; this is a gate, not a suggestion:
>
> 1. `guidelines/Guidelines.md`
> 2. `guidelines/overview-components.md` (the pattern → component discovery table)
> 3. `guidelines/overview-styling.md` (the styling do/don't list)
> 4. `guidelines/design-tokens/colors.md` + `guidelines/components/color-mode.md`
> 5. The per-component `.prompt.md` for every component you will use.

This is Codecademy's Gamut design system — the same components, tokens, and
patterns used across Codecademy and Skillsoft's Percipio product. Every
component in this project is browsable below, grouped the way they're
organized in Gamut's own Storybook (Atoms, Molecules, Organisms, Layouts,
Typography). Build with these components rather than one-off equivalents —
they carry accessibility, theming, and interaction behavior that a hand-built
version would have to reimplement.

## Non-negotiables

1. **Props-only — no inline `style`, no inline `css` prop, no `className` for layout, spacing, or color.** Every system-prop-expressible style goes through a Gamut prop, `css()`, `variant()`, or `states()` — not Emotion's `css={...}` JSX prop written inline on an element. Any inline `style`/`css` or hex value is a **departure** and must be called out explicitly (see #5) — it is never a silent default.
2. **Every color is a semantic token — never hex.** `text`, `background`, `primary`, `feedback-error`, etc. See `guidelines/design-tokens/colors.md`.
3. **Wrap the tree in `ColorMode`.** Semantic tokens only resolve inside it.
4. **Prefer purpose-built components over `Box`/`FlexBox` rebuilds.** `List`/`DataList`/`DataTable`/`Tabs`/`Badge`/`Tag` carry accessibility and theming a hand-built version doesn't.
5. **Call out departures — never ship them silently.** If a build genuinely needs a hex value or a `className`, say so explicitly. This applies just as much to the _request itself_: if the designer/user asks for something outside system props, tokens, or semantic tokens (an exact hex, an arbitrary pixel value off the spacing scale, a one-off font size), tell them it deviates from the system before implementing it — don't silently comply, and don't silently substitute the nearest token without saying so.

## Wrapping and setup

Every Gamut component must be rendered inside `GamutProvider`. Without it, the theme tokens (spacing, typography, colors) are undefined and components render unstyled or throw.

```jsx
import { GamutProvider, ColorMode, FillButton } from './CodecademyGamut';

function App() {
  return (
    <GamutProvider theme={percipioTheme}>
      <ColorMode mode="light">
        {/* components here */}
        <FillButton>Click Me</FillButton>
      </ColorMode>
    </GamutProvider>
  );
}
```

Five themes are available — choose one based on the target product context. **`percipioTheme` is the default for this project.**

| Theme export    | Product context                        |
| --------------- | -------------------------------------- |
| `percipioTheme` | Percipio integration (**default**)     |
| `coreTheme`     | Codecademy web (Apercu + Suisse fonts) |
| `platformTheme` | Platform / learner experience          |
| `adminTheme`    | Admin and internal tooling             |
| `lxStudioTheme` | LX Studio                              |

Pass the theme object to `GamutProvider`'s `theme` prop: `<GamutProvider theme={platformTheme}>`. The `ColorMode` component controls light/dark: `mode="light"` or `mode="dark"`.

## Styling idiom

Gamut is **props-only** — no CSS utility classes. Layout, spacing, and color all go through system props on components like `Box`, `FlexBox`, and `GridBox`. Do not write `className` strings or inline `style` for design-system layout.

```jsx
<Box padding="16px" backgroundColor="background" border={1} borderRadius="sm">
  content
</Box>

<FlexBox alignItems="center" gap="8px" flexDirection="row">
  <FillButton>Primary</FillButton>
  <StrokeButton>Secondary</StrokeButton>
</FlexBox>
```

For color values, use semantic theme keys (defined in the active theme) rather than hex. `ColorMode` injects the light or dark palette — components read from it automatically, as CSS custom properties (`--color-*`) it sets at runtime. (The stats near the bottom of this README may say "0 CSS custom properties" — that's a static-bundle scan, not a statement about runtime; `ColorMode`'s injected properties are real and readable via `var(--color-border-secondary)` etc. if you ever need to. Full mapping table in `guidelines/components/color-mode.md`.)

Most-used semantic tokens (Core theme, light/dark — see the theme-specific `guidelines/design-tokens/theme-*.md` for other themes' actual values):

| Token                | Light       | Dark         | Use for                           |
| -------------------- | ----------- | ------------ | --------------------------------- |
| `text`               | `navy-800`  | `white`      | Default body/UI text              |
| `background`         | `white`     | `navy-800`   | Default page/component background |
| `background-primary` | `beige`     | `navy-900`   | Slightly elevated surfaces        |
| `primary`            | `hyper-500` | `yellow-500` | Primary CTA, links, focus rings   |
| `secondary`          | `navy-800`  | `white`      | Secondary CTA, ghost buttons      |
| `border-primary`     | `navy-800`  | `white`      | Strong borders, dividers          |
| `feedback-error`     | `red-600`   | `red-300`    | Error messages                    |
| `feedback-success`   | `green-700` | `green-400`  | Success messages                  |

**Before composing a UI pattern from boxes**, check whether a purpose-built component already covers it — `List`/`DataList`/`DataTable` for rows of data, `Toggle` for on/off controls, `Menu` for navigation/actions, `Disclosure` for a single show/hide section (use `List`'s expandable-row pattern instead for two or more). Recreating one of these from `Box`/`FlexBox` and manual state loses built-in accessibility, keyboard handling, and theming the real component already has. See `guidelines/overview-components.md`'s Component Discovery section for the full pattern-to-component table.

## Idiomatic build example

A page section using Gamut components — provider at the root, system props for layout:

```jsx
const {
  GamutProvider,
  ColorMode,
  FlexBox,
  Box,
  Text,
  FillButton,
  StrokeButton,
  percipioTheme,
} = window.CodecademyGamut;

export default function HeroSection() {
  return (
    <GamutProvider theme={percipioTheme}>
      <ColorMode mode="light">
        <Box padding="48px" maxWidth="800px">
          <Text as="h1" fontSize={34} fontWeight="title">
            Learn to code
          </Text>
          <Text as="p" fontSize={16} mb="24px">
            Join millions of learners on Codecademy.
          </Text>
          <FlexBox gap="12px">
            <FillButton>Get started</FillButton>
            <StrokeButton>Sign in</StrokeButton>
          </FlexBox>
        </Box>
      </ColorMode>
    </GamutProvider>
  );
}
```

## Agent Information

The following is build/technical detail — useful for whoever (or whatever)
is generating code against this system, less so for a human just browsing
components.

**Runtime loading — confirmed gotchas in this environment:** never write `const React = window.React` in an x-import `.jsx` (it's already an injected function parameter — redeclaring it throws `SyntaxError: redeclaration of formal parameter React`); load `_ds_bundle.js` only after `window.React`/`window.ReactDOM` exist (a static `<script>` tag in `<helmet>` often runs first and gets `W5.exports is undefined`); never load a second React UMD bundle to "fix" that (creates a second React instance — hooks break with `g.current is null`); and read `window.CodecademyGamut` at render time behind a ready-state guard, not by destructuring at module scope. Full pattern and code in `guidelines/overview-setup.md`.

**Read `guidelines/Guidelines.md` before building anything.** It defines the
required reading order (overview files → design tokens → per-component
guides) for this system's usage rules — button variant selection, theming
setup, accessibility patterns, code style, and more. Read the relevant
per-component guide before writing code that uses that component.

**Where the rest of the truth lives:**

- **Component API**: each component folder (`components/<group>/<Name>/`) contains a `.d.ts` TypeScript declaration and a `.prompt.md` usage reference — read those for props and composition patterns before coding.
- **README**: this file's body (below, auto-generated) lists all available components grouped by category.
- **Bundle**: `_ds_bundle.js` — all components and themes are on `window.CodecademyGamut`. Import them destructured: `const { FillButton, GamutProvider, percipioTheme } = window.CodecademyGamut`.
- **Guidelines**: `guidelines/` (start at `Guidelines.md`) — category-level usage rules and design tokens.
