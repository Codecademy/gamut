# dtcg-tokens-poc

GMT-1715 spike. **Question: can Gamut's tokens live as engine-neutral W3C DTCG
JSON, with Style Dictionary emitting CSS variables and TS types at parity with
what Gamut emits today?**

This is **go/no-go criterion #3** from `reboot-recommendation.md` §5 — the one that
had never been spiked. It matters because §3 of that doc recommends tokens move to
an _engine-neutral_ pipeline, while every other spike so far has **Panda**
generating tokens directly. That coupling is the opposite of the stated goal, so
either this works or the recommendation needs amending.

```bash
yarn all        # tokens → build → verify
```

Reads the **real** Core theme, bundled from `packages/gamut-styles/src/themes/core.ts`.
Nothing is retyped, so it tracks the source of truth.

## Verdict: it works, and Panda becomes a consumer rather than the owner

```
1. CSS VARIABLE PARITY vs what Gamut emits today
   ✓ palette colours — 68 checked
   ✓ semantic aliases (light) — 32 checked
   ✓ semantic aliases (dark) — 32 checked
2. VALUE ROUND-TRIP through DTCG
   ✓ scale values — 37 checked (1 accepted deviation)
3. NAME PARITY (drives the generated union types)
   ✓ token names match keyof theme[scale] — 137 checked
4. ENGINE-NEUTRALITY — three consumers, one source
   ✓ token set identical across CSS / TS / Panda — 139 checked
```

**Three consumers from one DTCG source**, all verified to carry the same 139 tokens:

| output                         | consumer   | notes                                                           |
| ------------------------------ | ---------- | --------------------------------------------------------------- |
| `dist/tokens.{light,dark}.css` | any engine | `--color-navy-800: #1F4056`, aliases as `var(--color-navy-800)` |
| `dist/tokens.ts`               | TypeScript | `as const` object + `keyof`-derived union types                 |
| `dist/panda-preset.mjs`        | Panda      | `definePreset`-shaped, values as `var(--…)`                     |

That last row is the point: **Panda reads the tokens instead of owning them.**
Swapping the styling engine no longer touches the token pipeline.

Colour-mode behaviour is preserved too — semantic aliases emit
`var(--color-navy-800)` rather than inlined hex (`outputReferences: true`), so a
`data-color-mode` flip re-themes the page by **variable reassignment**. That is what
keeps the nested-`<Background>` contract correct (see
`panda-via-gamut-option-a.md` §5) and keeps colour mode a ×1 multiplier on any
prebuilt atomic matrix.

## The real finding: DTCG has no concept of modes

The [DTCG format spec (2025.10)](https://www.designtokens.org/tr/drafts/format/)
defines no notion of modes, themes, or multiple values per token — **a token has
exactly one `$value`.** Gamut has 5 themes × 2 colour modes over one palette.

So each mode is its own token **file** carrying the same token names with different
alias targets, and the build runs once per mode. That is the established workaround
and it produces correct output. But be clear about what it costs:

> **The mode dimension lives in your build configuration, not in your tokens.** A
> consumer handed the DTCG JSON alone cannot discover that modes exist.

For Gamut that is acceptable — Gamut owns the build. It is _not_ acceptable if the
goal is handing tokens to a third party (Figma, a partner design system) and
expecting modes to travel with them. Worth deciding which of those you're buying
before committing, because it's the difference between "tokens as data" and "tokens
as data plus a build contract".

There is no modes or resolver module in the spec as published.

## Four things found the hard way

**1. `spacing[0]` cannot round-trip.** DTCG requires `dimension` values to be an
object with a numeric `value` and a `unit` of `px` or `rem`. Gamut's `spacing[0]`
is the bare number `0`, which has no unit — it comes back as `"0px"`. Harmless in
CSS, but it changes the TS value type from the number `0` to the string `'0px'`.
`keyof` is unaffected, so **token type safety is intact**; only the value type
shifts. Recorded as an explicit accepted deviation in `verify.mjs`, so any _new_
deviation still fails the run.

**2. Style Dictionary's TypeScript formats can't express Gamut's token names.**
`typescript/es6-declarations` and `javascript/esm` emit `export const <name>`, and
`navy-800`, `0`, `400` are not valid JS identifiers — prettier (bundled inside
Style Dictionary) throws outright. The usual escape is the `name/camel` transform,
but `navy-800` → `navy800` **changes the token's name**, which is exactly what
parity forbids: `keyof theme.colors` has to keep yielding `'navy-800'`. A ~25-line
custom format emitting a quoted-key `as const` object solves it and preserves the
names. `json/flat` survives unchanged because JSON keys are quoted.

**3. `borders` is not expressible as DTCG, and it's instructive.**
`borders.1` is `'1px solid var(--color-border-primary)'` — a CSS shorthand
embedding a `var()` reference to a **semantic** colour whose resolution is
mode-dependent. DTCG has a `border` composite type (`{ width, style, color }`), but
its `color` member would need one value per mode, landing straight back on the modes
gap. Left out rather than misrepresented. Decomposing it into
width/style/color tokens is the real fix and is a small breaking change for
whoever uses `border={1}`.

**4. The `css` transform group would have silently changed values.** It bundles
opinionated conversions including px→rem. Since the entire claim here is value
parity, this spike hand-rolls three small transforms instead
(`gamut/dimension`, `gamut/scalar`, `gamut/name`) so the output is predictable. Any
future adoption should resist reaching for the convenience group.

## A note on the dependency

`style-dictionary` is pinned to **5.5.0**, not `^5.5.1`. The repo sets
`npmMinimalAgeGate: 7d` in `.yarnrc.yml` — a supply-chain control that refuses
packages published within the last seven days — and 5.5.1 was too recent, so yarn
reported "No candidates found". Pinning to an older release respects the gate
rather than bypassing it. Vetted before install: Apache-2.0, canonical repo
`github.com/style-dictionary/style-dictionary`, ~1.9M weekly downloads, no
install scripts (and `enableScripts: false` is set repo-wide anyway).

This branch also adds `spikes/*` to the root `workspaces` — `main` has neither a
`spikes/` directory nor that glob; the other spike branch added both.

## What this does NOT prove

- **Core theme only.** The other four themes (admin, platform, lxStudio, percipio)
  are not exported. They matter: `panda-via-gamut-option-a.md` §6 found Core's
  palette is **not** a superset — lxStudio and percipio add their own tokens, and
  emitting only Core's left 33 variables dangling and silently unstyled. The
  multi-theme dimension is a second axis on top of modes, and DTCG has no more to
  say about it.
- **Nothing consumes the output yet.** The Panda preset is generated and its token
  set verified, but no build has been run against it. Wiring it into
  `emotion-to-gamut-poc`'s `panda.config.ts` in place of that file's inline token
  derivation is the obvious next step and would close the loop properly.
- **No `$description`, no `$extensions`, no Figma round-trip.** Token _metadata_ is
  a large part of DTCG's value for design-tool interop (`output-formats-rfc.md`) and
  is untouched here.
- **`borders` deliberately unresolved**, per finding 3.
- **No DTCG validation.** The output is not checked against a schema validator;
  parity is checked against Gamut, which is the question that was asked, but it
  isn't the same as being spec-conformant.

## Sources

- [DTCG Format Module 2025.10](https://www.designtokens.org/tr/drafts/format/) —
  no modes/themes concept; `dimension` values "MUST be an object containing a
  numeric `value` … and `unit` of measurement (`'px'` or `'rem'`)"; aliases via
  `{group.token}` or `$ref`.
- Style Dictionary 5.5.0, Apache-2.0 —
  `github.com/style-dictionary/style-dictionary`. DTCG support via `usesDtcg`
  (`node_modules/style-dictionary/types/Config.d.ts:34`). Built-in format list
  read from `style-dictionary/enums`.
- Gamut's theme — `packages/gamut-styles/src/themes/core.ts` (palette in
  `_variables.root`, semantic aliases in `modes.{light,dark}`).
- The criterion this answers — `~/code/base camp/reboot/reboot-recommendation.md`
  §5 item 3, and the coupling problem it addresses is recorded in
  `state-of-research.md`.
- Repo supply-chain gate — `.yarnrc.yml` (`npmMinimalAgeGate: 7d`,
  `enableScripts: false`).
