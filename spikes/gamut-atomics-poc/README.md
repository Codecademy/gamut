# gamut-atomics-poc

GMT-1715 spike. **Question: can Gamut drive Panda to emit prebuilt atomic classes
for its *own* prop vocabulary, so the closed set becomes zero-runtime without
changing a single call site?**

Validates the "what to do instead" recommendation in
`panda-via-gamut-option-b.md` and the atomics half of
`panda-via-gamut-option-a.md` §3. It is the alternative to adopting Panda's JSX
factory, which that doc rules out because Panda's runtime derives class names
without emitting CSS — so any value its extractor never saw renders **silently
unstyled**, and because `bg`/`_` mean different things in the two systems.

```bash
npm run generate    # panda cssgen → dist/atomics.css, then build the manifest
npm run verify      # fidelity vs real css(), resolver behaviour, matrix maths
```

Reads Gamut's **real** prop config and **real** Core theme from the workspace
(`@codecademy/gamut-styles/dist/variance/config`), so if Gamut adds a prop or
changes a scale this picks it up on the next run. Local only: no network, nothing
written outside this folder, no new dependency — `@pandacss/dev` and `esbuild` are
already vetted in the gamut repo.

## Verdict: it works, with one caveat and four traps

**Fidelity is exact.** All **1,275** prop×value pairs in the closed set produce
**byte-identical CSS declarations** to what the real `css()` from
`@codecademy/gamut-styles` emits today — compared declaration-by-declaration after
resolving one level of `var()` indirection.

**Gamut's vocabulary survives intact.** `bg` → `background-color` (not Panda's
`background`), `p` → `padding`, `mx` → the logical pair, `_` as the responsive base
key. Consumers see no change.

**The lookup layer is free.** See below — the manifest doesn't need to ship.

The caveat is that this only ever covers the **closed** set: 47 of 126 props, and
only the values in their theme scales. Everything else still goes to the runtime
injector, which is the point — but it means this reduces the injector's *n*, it
does not remove the injector.

## Measured

Rule counts, and how they compare to the figures `panda-via-gamut-option-a.md` §3
*synthesised* rather than built:

| configuration | rules | raw | gzip | §3 estimate |
| --- | --- | --- | --- | --- |
| base atomics only *(recommended)* | **1,275** | 115.9kB | **11.6kB** | 1,275 rules / 9.2kB |
| all 5 viewport breakpoints | **7,650** | 707.6kB | **62.5kB** | 7,650 rules / 58.4kB |
| all breakpoints, `['*']` values | 8,730 | 800.1kB | 70.9kB | — |

**The rule counts match the estimates exactly.** The byte figures were 7–26%
optimistic — close enough that the "prebuild base atomics, inject the long tail"
recommendation stands unchanged.

### The lookup table is free, which the estimates missed

A naive manifest (`prop → value → breakpoint → className`) is **244kB raw /
26.2kB gzip** — more than double the base atomics it exists to serve. Shipping it
would have quietly wrecked the sizing.

It doesn't need to ship. A class name is just `${prop}_${value}` (or
`${breakpoint}:${prop}_${value}`), so the only thing the resolver needs is whether
a pair is *valid* — which is `value in theme[scaleOf(prop)]`. **Gamut already ships
the theme and the prop config to the client.** `resolve.mjs` implements both
resolvers and `verify.mjs` asserts they agree on **2,561** cases including every
valid pair and deliberately-open values. So the atomics layer costs the CSS plus
roughly nothing.

### Fallthrough behaviour

```
literal, closed                        classes=[p_24 bg_primary]
responsive with Gamut `_`              classes=[p_8 md:p_16]
open prop → injector                   classes=[]  → injector={"width":"37.5%"}
open VALUE on closed prop              classes=[]  → injector={"p":13}
mixed                                  classes=[p_24 bg_primary] → injector={"width":"calc(100% - 3px)"}
partial responsive → all to injector   classes=[]  → injector={"p":{"_":8,"md":13}}
```

Two deliberate design choices:

- **An unknown value degrades to "styled at runtime", never to "silently
  unstyled".** The resolver only returns a class it has confirmed valid. This is
  the specific failure mode that rules out Panda's own JSX factory.
- **Responsive props are all-or-nothing.** If one breakpoint's value is open, the
  whole prop goes to the injector. Mixing an atomic class with an injected rule
  would make the winner depend on stylesheet order rather than on the breakpoint —
  a specificity bug waiting to happen.

### Matrix multipliers

- **Mode-dependent props: 28 of 47, covering 392 of 1,275 base atomics (31%).**
  Gamut supports logical *and* physical properties, so supporting both modes costs
  **+392 base rules (+31%)**, or +2,352 across breakpoints. Emitting logical only
  (the default) avoids it.
- **Container queries: Gamut ships 6 (`c_base`…`c_xl`) alongside the 5 viewport
  breakpoints.** This spike generates the viewport set; covering both would take
  the full matrix from ×6 to ×12.

## Four things found the hard way

**1. `presets: []` does not opt out of Panda's defaults — `eject: true` does.**
With `presets: []` alone, Panda still merged `preset-base` + `preset-panda`, and
the spike emitted `.bg_primary { background: … }` and `.mx_16 { margin-inline: … }`
— Panda's semantics under Gamut's prop names. Exactly the collision that produced
`.bg_primary { background: primary }` in PR #3405 §6, and it fails **silently**.

**2. `PropertyConfig.property` is types-only.** It is documented as "the css
property this utility maps to", but is consumed only when generating TypeScript
types. Without a `transform`, Panda uses the utility *key* as the CSS property, so
`bg` emitted `bg: …` and `p` emitted `p: …` — invalid declarations the browser
silently drops. Every utility needs an explicit `transform`. Panda's own utilities
documentation never mentions `property`, which corroborates this.

**3. Gamut's prop config has three shapes, not two.** Missing the third cost 720
classes before it was caught:

```js
{ property: 'margin' }                                          // 1. plain
{ property: 'margin', properties: { physical: [...], logical: [...] } }  // 2. multi
{ property: { physical: 'marginTop', logical: 'marginBlockStart' } }     // 3. dual single
```

Shape 3 covers `mt/mb/mr/ml`, `pt/pb/pr/pl`, `borderTop/Right/Bottom/Left` and the
four `borderRadius*Corner` props — 16 of the 47. Treating its `property` as a
string yields `[object Object]` as the CSS property, which Panda drops without
error.

**4. Gamut defaults to LOGICAL properties.** `variance/src/core.ts:150` reads
`useLogicalProperties ?? true`, so `mt` is `margin-block-start`, not `margin-top`.
Emitting physical produced atomics that silently did not match `css()`. The
fidelity check is what caught it.

Plus one waste finding: **`['*']` in `staticCss` also emits negative spacing
variants** (`.m_-4 { margin: calc(var(--spacing-4) * -1) }`) — 1,020 rules,
8.4kB gzip, ~13% of the matrix. Gamut's spacing scale has no negative keys, so
`variance` would reject `m={-4}` and every one is dead. Listing the scale's real
keys instead of `'*'` removes them, and is what brings the rule count to exactly
the predicted 7,650.

## Colour mode still works

Panda's token variables indirect to Gamut's own:
`--colors-primary: var(--color-primary)`. So an atomic resolves through Gamut's
variable, and colour mode keeps working by **variable reassignment** from the
nearest ancestor — preserving the nested-`<Background>` contract that Panda's
`_dark` descendant conditions would break (`panda-via-gamut-option-a.md` §5).
One extra level of indirection, no behavioural change.

This also means colour mode is a **×1** multiplier on the atomic matrix, not ×2.

## What this does NOT prove

- **No React component.** `resolve.mjs` is the class-resolution layer, which is
  the part in question; wiring it into a real `Box` and rendering is not done.
- **No integration with the injector.** The fallthrough contract is verified as a
  pure function; it has not been wired to `emotion-to-gamut-poc`'s `sheet.ts`.
- **Browser cost unmeasured here.** Atomics should be strictly cheaper than
  injection (no CSSOM writes at all), but that is an argument, not a measurement.
  See `injector-browser-poc` for the injector's numbers.
- **Core theme only.** Five themes × 2 modes would multiply the *token* block, not
  the atomics — the atomics reference variables — but that is unverified.
- **`variant()` / `states()` not covered.** Only system props.
- **The 79 open props are untouched** by design.

## Sources

Primary sources, all verifiable locally at the line numbers given:

- `eject` semantics — `@pandacss/types/dist/config.d.ts:456`, and
  [Panda config reference](https://panda-css.com/docs/references/config)
  ("Whether to opt-out of the defaults config presets:
  `[@pandacss/preset-base, @pandacss/preset-panda]`").
- `PropertyConfig` shape — `@pandacss/types/dist/utility.d.ts`;
  `property` consumed only for type generation at
  `@pandacss/core/dist/index.js:3429` (`this.types.set(...)`).
  [Panda utilities docs](https://panda-css.com/docs/customization/utilities)
  document `className`, `values` and `transform` — and not `property`.
- `staticCss` shape — `@pandacss/types/dist/static-css.d.ts`
  (`CssRule.properties`, `ConditionOptions.responsive`).
- Panda's runtime class-name derivation (why its JSX factory can't cover open
  values) — the generated
  `spikes/emotion-to-gamut-poc/styled-system/css/css.mjs`, `utility.transform`.
- Gamut's prop config — `packages/gamut-styles/src/variance/config.ts`
  (`bg` → `backgroundColor` at line 6).
- Gamut's logical-property default — `packages/variance/src/core.ts:150`
  (`useLogicalProperties ?? true`) and
  `packages/variance/src/getPropertyMode/getPropertyMode.ts`.
- Gamut's breakpoints and scales — `packages/gamut-styles/src/themes/core.ts`,
  `packages/gamut-styles/src/variables/spacing.ts`.
- Call-site distribution this is sized against — `runtime-vs-convenience.md`
  (94.5% of 21,093 system-prop attributes are literals; 1.09% genuinely runtime).
