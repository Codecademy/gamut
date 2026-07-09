# Gamut Design System

This is Codecademy's Gamut design system — the same components, tokens, and
patterns used across Codecademy and Skillsoft's Percipio product. Every
component in this project is browsable below, grouped the way they're
organized in Gamut's own Storybook (Atoms, Molecules, Organisms, Layouts,
Typography). Build with these components rather than one-off equivalents —
they carry accessibility, theming, and interaction behavior that a hand-built
version would have to reimplement.

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

For color values, use semantic theme keys (defined in the active theme) rather than hex. `ColorMode` injects the light or dark palette — components read from it automatically.

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
