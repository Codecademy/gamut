# Gamut Design System — Usage Conventions

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

Five themes are available — choose one based on the target product context:

| Theme export    | Product context                                  |
| --------------- | ------------------------------------------------ |
| `coreTheme`     | Default / Codecademy web (Apercu + Suisse fonts) |
| `platformTheme` | Platform / learner experience                    |
| `adminTheme`    | Admin and internal tooling                       |
| `lxStudioTheme` | LX Studio                                        |
| `percipioTheme` | Percipio integration                             |

Pass the theme object to `GamutProvider`'s `theme` prop: `<GamutProvider theme={platformTheme}>`. The `ColorMode` component controls light/dark: `mode="light"` or `mode="dark"`.

## Styling idiom

Gamut is **props-only** — no CSS utility classes. Layout, spacing, and color all go through system props on components like `Box`, `FlexBox`, and `GridBox`. Do not write `className` strings or inline `style` for design-system layout.

System props follow the `@codecademy/variance` convention:

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

## Where the truth lives

- **Component API**: each component folder (`components/<group>/<Name>/`) contains a `.d.ts` TypeScript declaration and a `.prompt.md` usage reference — read those for props and composition patterns before coding.
- **README**: `README.md` in the project root lists all available components grouped by category.
- **Bundle**: `_ds_bundle.js` — all components and themes are on `window.CodecademyGamut`. Import them destructured: `const { FillButton, GamutProvider, percipioTheme } = window.CodecademyGamut`.
- **Guidelines**: `guidelines/<name>.md` files contain category-level usage rules (button variant selection, theming setup, a11y patterns, code-style rules, etc.) — read the relevant one before building with that component family.

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
