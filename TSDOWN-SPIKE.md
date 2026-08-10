# tsdown spike — GMT-1715 go/no-go criterion #4

**Question: can tsdown replace `tsc --emitDeclarationOnly` + `babel ./src --out-dir ./dist`, producing the reboot's decided output shape (bundled per entry + strict `exports` map)?**

The last unspiked criterion in `~/code/base camp/reboot/reboot-recommendation.md` §5.
`build-tooling-rfc.md` recommended tsdown _pending spike_; this is that spike.

```bash
# per package
cd packages/variance     && ../../node_modules/.bin/tsdown
cd packages/gamut-styles && ../../node_modules/.bin/tsdown
cd packages/gamut        && ../../node_modules/.bin/tsdown
```

## Verdict: yes, and it's 4–7x faster

| package        | scope                               | current (`tsc`+`babel`) | tsdown   | speedup |
| -------------- | ----------------------------------- | ----------------------- | -------- | ------- |
| `variance`     | pure TS                             | 17.8s                   | **4.4s** | ~4x     |
| `gamut-styles` | 16 `.tsx`, 20 Emotion imports       | 21.3s                   | **2.8s** | ~7x     |
| `gamut`        | **426 files**, 106 Emotion `styled` | ~17.3s                  | **2.3s** | ~7x     |

All three produce bundled ESM + CJS **and** `.d.mts` / `.d.cts` from one run.

## The headline, because it decides Phase ordering

**No Babel bridge is needed. tsdown does not depend on Emotion leaving first.**

`@emotion/babel-plugin` is the repo's one hard Babel dependency, and the concern was
that a Phase 1 tsdown migration would need a scoped `@rolldown/plugin-babel` bridge
that Phase 2 then deletes. It doesn't:

- The plugin is configured in 6 package babel configs for **`sourceMap` +
  `autoLabel` + `labelFormat` only** — DX, not correctness.
- **0 of the repo's 2 snapshot files** depend on Emotion-generated class names, and
  only 4 files use `@emotion/jest`.
- tsdown built `gamut-styles` (20 Emotion imports) and `gamut` (106 Emotion
  `styled` imports) **with no Babel step at all.**

What's lost by dropping it: class names lose their readable `-ComponentName`
suffix. Once `styled` moves into Gamut (Phase 1), Gamut's own wrapper can set
labels itself, so even that is recoverable without Babel.

**Consequence: the build migration is independent of the styling work and can land whenever.**

## Output shape validated

Both packages were given real `exports` maps pointing at the tsdown output, then
resolved through the package name from the repo root:

```
=== resolving through the real exports map ===
gamut-styles exports: 83   (css ✓ variant ✓ states ✓ coreTheme ✓ GamutProvider ✓ ColorMode ✓ Background ✓)

=== deep import preserved as a subpath ===
@codecademy/gamut-styles/AssetProvider → createFontLinks: function

=== old deep dist path ===
@codecademy/gamut-styles/dist/AssetProvider → ✓ blocked: ERR_PACKAGE_PATH_NOT_EXPORTED
```

So a deep import **can** be preserved as a real subpath, and the old path fails
loudly — which is what you want.

> ⚠️ **But this particular one didn't need a subpath at all.** I described
> `gamut-styles/dist/AssetProvider` (`createFontLinks`) as the _highest-priority
> break that must become a public export_. It already **is** one:
> `src/index.ts:3` has `export * from './AssetProvider'`, and both `createFontLinks`
> and `AssetProvider` resolve off the root — verified by importing them.
>
> So the fix is a rename to the **root** specifier, not a promotion to a subpath. The
> `./AssetProvider` entry above stands as a valid test of the _mechanism_, but it is
> not needed for this import, and shipping it would enshrine a subpath nobody
> requires. See `~/code/base camp/reboot/exports-map-design.md`, which dispositions
> all ~14 deep paths on the rule that **entries are a build-time device while the
> exports map is a public commitment.**

### ⚠️ CORRECTED — keep `tsc --emitDeclarationOnly`. Bundled declarations don't compose.

An earlier revision of this doc said tsdown's own `dts` _"may remove the need for
`tsc --emitDeclarationOnly`"_, on the basis that its bundled declarations came out
smaller than tsc's per-file output (396kB in 1 file vs 481kB across 47). **That
suggestion was wrong, and the RFC's original recommendation to keep `tsc` is
correct.**

The first measurement was taken while `gamut-styles` still resolved
`@codecademy/variance` to its **Babel** per-file `.d.ts`. Once variance ships
**bundled** declarations — which is what migrating variance to tsdown means — the
downstream build fails:

| variance declarations | `gamut-styles` dts build |
| --------------------- | ------------------------ |
| per-file (`tsc`)      | ✅ **0 errors**, 1.6s    |
| bundled (tsdown)      | ❌ **50 × TS4023**       |

```
TS4023: Exported variable 'providerProps' has or is using name '…' from
        external module '…/variance/dist-tsdown/index' but cannot be named
```

The downstream package can't name types the upstream's bundled `.d.ts` doesn't
re-export. **Causation verified by flipping variance's `types` field back and forth**
— 0 errors vs 50, nothing else changed. So this is a property of bundled
declarations, not a one-off.

Two related notes:

- **`dts: true` alone isn't enough on these packages.** It fails with _"You have
  `references` in your tsconfig"_ because the root `tsconfig.json` is a
  references-only shell. `dts: { tsconfig: 'tsconfig.lib.json' }` gets past it.
- **This branch now uses the finding-driven hybrid**: JS from `dist-tsdown/`,
  declarations from `dist/` via the existing `tsc` step. That is exactly
  `build-tooling-rfc.md`'s recommendation, now with evidence behind it rather than
  assumption.

Credit: the RSC session hit this independently on the same package and traced it to
variance's bundled `.d.ts`; this table is the confirmation.

## Four things found the hard way

**1. Today's Babel output is not valid Node ESM.** It emits ESM syntax with
**extensionless** specifiers — `export { variance } from './core'` — 10 of them in
`variance` alone. Node refuses it outright (`ERR_MODULE_NOT_FOUND`). It only works
today because every consumer bundles. tsdown's output loads natively in **both**
ESM and CJS, verified. This is independent corroboration of the bundled-output
decision.

**2. Latent type-only re-export debt, hidden by Babel.** Babel transpiles
file-by-file and erases types, so `export { SomeInterface } from './x'` (no `type`
modifier) is invisible to it. A bundler tracks the module graph and rejects it with
`MISSING_EXPORT`. Found and fixed 6 names across 2 files:

- `src/Form/SelectDropdown/types/index.ts` — 5 names (and 3 more blocks in the same
  file that would have failed next)
- `src/Form/types.ts` — `CheckboxPaddingProps`

Neither `isolatedModules` nor `verbatimModuleSyntax` is enabled anywhere in the
repo, which is why this accumulated silently. **Enabling one of them would surface
the remainder at typecheck time instead of at bundle time** — worth doing before
the migration rather than discovering them one build at a time (rolldown reports
these in batches, so it's iterative).

**3. `.css` imports need handling.** tsdown refuses `vidstack-styles.css` unless
`@tsdown/css` is installed. Externalizing it matches current behaviour exactly —
the existing build already `cpy`s CSS into `dist` and lets the consumer's bundler
handle the side-effect import — so no extra dependency is required.

**4. Packages must migrate together.** `gamut-styles` built fine but couldn't be
_loaded_, because it imports `@codecademy/variance` and variance's Babel output is
the unresolvable ESM from finding 1. The chain only worked once both were
tsdown-built. So this is not a package-by-package rollout; it's a coordinated one,
at least within a dependency chain.

## Deliberate state of this branch

`packages/variance/package.json` and `packages/gamut-styles/package.json` point
`main`/`module`/`types`/`exports` at **`dist-tsdown/`**. That means a whole-repo
`yarn build` will not work here until every package migrates — which is finding 4,
made concrete. Don't treat it as breakage; it's the demonstration.

## What this does NOT prove

- **No consumer build tested.** Nothing has run through mono's Next build,
  platform's Rspack, or front's Webpack. That's the same gap the rest of the reboot
  spikes have, and it's where the exports-map migration actually bites.
- **SVGR untested.** `gamut-illustrations` / `gamut-icons` generate components from
  SVG via `@svgr/cli`. That's a separate pipeline step and likely orthogonal to
  tsdown, but it's a named RFC concern and it isn't verified here.
- **`styleguide` and Storybook untested.**
- **16 `IMPORT_IS_UNDEFINED` warnings** on `gamut` — all `MotionValue` from
  `motion-dom`'s bundled `.d.ts`. Warnings, not errors, and third-party. Unchased.
- **No runtime test of the `gamut` bundle** — it's a React component library, so
  export names were compared statically (317 named exports in the bundled `.d.mts`)
  rather than by importing it in node. `variance` and `gamut-styles` _were_ verified
  by loading them.
- **Watch mode / dev loop untested**, and nx target wiring is not done — these were
  run as direct CLI invocations.

## Dependency note

`tsdown@0.22.14` — MIT, `github.com/rolldown/tsdown`, ~3.5M weekly downloads, no
install scripts, and published 2026-07-23 so it clears the repo's
`npmMinimalAgeGate: 7d`. Pulls in `rolldown` and `rolldown-plugin-dts`.
