# Known breaking changes — Emotion → Panda (GMT-1715)

Consumer-facing breaking changes if Gamut swaps its styling engine from Emotion
to Panda (zero-runtime) for the 1.0 reboot. Every item is grounded in the spike
(`spikes/panda-styling-poc`) + the mono/platform usage survey. The swap is a
**breaking major**, but most items are mechanical/codemoddable — the design is to
ship codemods + this doc, not to make it invisible.

**Severity legend:** 🟥 high (touches many call sites / needs judgement) ·
🟨 medium (mechanical codemod) · 🟩 low (rare or config-only).

| #   | Change                                                          | Severity | Codemoddable?                           |
| --- | --------------------------------------------------------------- | -------- | --------------------------------------- |
| 1   | `styled` import moves to Gamut                                  | 🟨       | ✅ import rewrite                       |
| 2   | `styled.tag(css/variant/states(…))` → recipe config / props     | 🟥       | ⚠️ partial (static yes; dynamic manual) |
| 3   | Token values are strings; bare numbers need tokens or `[value]` | 🟨       | ✅ mostly                               |
| 4   | Emotion `css` prop unsupported                                  | 🟩       | ✅ (unused in mono/platform)            |
| 5   | Reading resolved color VALUES in JS (charts)                    | 🟥       | ⚠️ manual (`getColorValue`)             |
| 6   | Provider + static stylesheet setup                              | 🟨       | ⚠️ per-app, one-time                    |
| 7   | Theme customization (`createTheme` → Panda config)              | 🟩       | ⚠️ rare (1 per repo)                    |
| 8   | Test assertions (`@emotion/jest` matchers)                      | 🟨       | ⚠️ partial                              |

---

## 1. `styled` imports from Gamut, not Emotion 🟨

```tsx
// BEFORE
import styled from '@emotion/styled';

// AFTER — re-exported from the Gamut facade
import { styled } from '@codecademy/gamut-styles';
```

**Migration:** pure import rewrite (codemod). **Impact:** mono ~825 files,
platform ~177 files import `@emotion/styled`.

---

## 2. `styled.tag(css/variant/states(…))` → recipe config or props 🟥

Panda's static extractor needs literal style objects; the runtime
function-composition signature can't be evaluated at build time.

```tsx
// BEFORE — static styles
const Card = styled.div(css({ p: 4, bg: 'background' }));

// AFTER — recipe config…
const Card = styled('div', { base: { p: '4', bg: 'background' } });
// …or system props on Box (no styled at all)
<Box p="4" bg="background" />;
```

```tsx
// BEFORE — variant()/states() composed onto a styled component
const Toggle = styled.button(
  variant({ defaultVariant: 'off', variants: { on: {...}, off: {...} } }),
  states({ disabled: {...} })
);

// AFTER — one recipe holds variant + boolean state variants
const Toggle = styled('button', {
  variants: {
    tone: { on: {...}, off: {...} },
    disabled: { true: {...} },
  },
  defaultVariants: { tone: 'off' },
});
// call sites are UNCHANGED: <Toggle tone="on" disabled />
```

```tsx
// BEFORE — prop-conditional runtime interpolation (the hard case)
const Bar = styled(Box)<{ $active: boolean }>(({ theme, $active }) => ({
  color: $active ? theme.colors.primary : theme.colors['border-disabled'],
}));

// AFTER — option A: convert the condition to a variant (static, preferred)
const Bar = styled('div', {
  variants: {
    active: { true: { color: 'primary' }, false: { color: 'border-disabled' } },
  },
});

// AFTER — option B: the runtime escape hatch (keeps the fn shape; inline style)
const Bar = styledDynamic('div')(({ $active }: { $active: boolean }) => ({
  color: getColorValue($active ? 'primary' : 'border-disabled', mode),
}));
```

**Migration:** static/prop-keyed cases codemod to recipe config; **prop-conditional
runtime interpolations need manual conversion** to `variant()`/`states()` or
`styledDynamic`. **Impact:** the largest surface — mono ~825 files / ~1,419
interpolations / 634 `theme`-in-`${}`; platform ~16 (localized to `spark-studio`).
Call-site usage (`<Toggle tone="on" disabled />`) does **not** change.

---

## 3. Token values are strings; bare numbers aren't tokens 🟨

Under `strictTokens`, style values are string token keys; a bare number is not a
token, and some resolve to a DIFFERENT default token.

```tsx
// BEFORE (Emotion/variance accepted numbers on the spacing scale)
<Box padding={4} bg="primary" />

// AFTER
<Box padding="4" bg="primary" />
```

```tsx
// GOTCHA: a bare numeric string hits Panda's DEFAULT sizes scale, not px.
minWidth: '56'; // ❌ resolves to --sizes-56 = 14rem (224px!)
minWidth: '[56px]'; // ✅ raw value via the [value] escape hatch
height: '[40px]'; // ✅ control heights aren't tokens — escape hatch
```

**Migration:** number→string is codemoddable; the sizes gotcha needs review where
non-token pixel values are used (control heights/widths). Colors/spacing/fontSize
stay real tokens and keep autocomplete.

---

## 4. Emotion `css` prop (JSX pragma) unsupported 🟩

```tsx
// BEFORE — Emotion css prop via /** @jsxImportSource @emotion/react */
<div css={{ color: 'primary' }} />

// AFTER — className from css(), system props, or the Panda css prop
<div className={css({ color: 'primary' })} />
<Box color="primary" />
```

**Impact:** **effectively zero — the Emotion `css` prop is unused in both mono and
platform** (0 pragmas). Listed for completeness.

---

## 5. Reading resolved color VALUES in JS breaks (charts/canvas) 🟥

Tokens resolve to `var(--colors-…)` at runtime, not a hex string. Anything feeding
a color to a non-CSS consumer (charts, canvas, third-party inline styles) must
resolve the value explicitly.

```tsx
// BEFORE — theme.colors.* is a usable value passed to @nivo
const theme = useTheme();
<ResponsiveBar colors={[theme.colors.hyper, theme.colors.green]} ... />

// AFTER — resolve to a real hex via the provided escape hatch
import { getColorValue } from '@codecademy/gamut-styles';
<ResponsiveBar
  colors={[getColorValue('primary', mode), getColorValue('feedback-success', mode)]}
  ...
/>
```

**Migration:** manual — swap `theme.colors.x` reads for `getColorValue(alias, mode)`
(re-resolve on mode change). **Impact:** mono is materially exposed (6 `@nivo` chart
files + Fides stylesheet injection + inline `style`/`fill`); platform is minor and
already hand-rolls raw hex in `spark-studio/_utils/contentTypeIcon.ts`.

---

## 6. Provider setup + one static stylesheet 🟨

```tsx
// BEFORE — Emotion provider wires cache + theme + injected globals
import { GamutProvider, coreTheme } from '@codecademy/gamut-styles';
<GamutProvider cache={cache} theme={coreTheme}>
  <App />
</GamutProvider>;

// AFTER — import the static sheet once; provider selects theme; one <ColorMode>
import '@codecademy/gamut-styles/styles.css'; // NEW, once at the root
import { GamutProvider, ColorMode } from '@codecademy/gamut-styles';
<GamutProvider theme="core">
  <ColorMode mode="system">
    <App />
  </ColorMode>
</GamutProvider>;
```

**What changes:** no Emotion cache / SSR critical-CSS extraction (ship the static
sheet instead); `ColorMode` is set once for ambient mode; `<Background bg="…">`
still handles individual themed surfaces (unchanged). **CSP note:** the static
sheet needs no nonce, but the runtime inline-CSS-var escape hatch (dynamic values)
still hits `style-src` — prefer variants for finite sets. **Migration:** per-app,
one-time.

---

## 7. Theme customization moves to Panda config 🟩

```tsx
// BEFORE — runtime theme object
const platformCustom = createTheme(platformTheme)
  .addColors({ brand: '#123456' })
  .addColorModes('light', { light: {...}, dark: {...} })
  .build();
<GamutProvider theme={platformCustom} />

// AFTER — a Panda theme / token override (build-time), applied via data-panda-theme
// panda.config: themes: { platformCustom: { semanticTokens: { colors: {...} } } }
<GamutProvider theme="platformCustom" />
```

**Impact:** rare — exactly **1 `createTheme` override per repo** (mono
`learning-environment-enterprise`, platform `compactLxStudioTheme`).

---

## 8. Test assertions on styles change 🟨

```tsx
// BEFORE — @emotion/jest style-rule matcher
expect(el).toHaveStyleRule('background-color', theme.colors.primary);

// AFTER — assert class application / computed style (no Emotion matcher)
expect(el).toHaveClass('gmt-fill-button--variant_primary');
// or getComputedStyle(el).backgroundColor against the resolved var
```

**Migration:** partial-codemod + manual. **Impact:** platform has heavy Jest
coupling (272 `jest.mock('@codecademy/…')`, 45 `requireActual`); mono uses
`setupRtl` in 332 files. `@emotion/jest` `toHaveStyleRule` usages need reworking.

---

## What does NOT break (the ~95%)

- **Component usage** — `<FillButton variant="primary" size="small" icon={Icon}>`,
  `<IconButton icon tip>`, `<Box>`, `<FlexBox>`, `<Text>` — all unchanged (proven
  in the spike's Button atoms).
- **System props** — `<Box padding="4" bg="primary" />` (number→string aside).
- **Semantic tokens as values** — `bg="primary"`, `color="text"` — unchanged.
- **`variant()`/`states()` call sites** — `<Toggle tone="on" disabled />` — unchanged.
- **`ColorMode` / `Background`** usage — unchanged; theme + mode switching still
  works via attribute flips.

---

## References

- Spike: `spikes/panda-styling-poc/` (README has the full findings log).
- Decision docs: `~/code/base camp/reboot/` (`styling-engine-rfc.md` §11,
  `reboot-recommendation.md`).
- Usage survey: mono + platform counts cited above.
