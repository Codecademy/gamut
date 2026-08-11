# gamut-emitter-poc — can Gamut emit its own CSS without Panda?

Ticket: [`wayfinder/tickets/011-emitter-byte-diff-oracle.md`](../wayfinder/tickets/011-emitter-byte-diff-oracle.md).
Question: **emitter adoption** only — nothing here touches **Emotion deletion**
(see [`../CONTEXT.md`](../CONTEXT.md)). The runtime injector's fate is unaffected
either way.

**Commits under test:** gamut `cass-tsdown-poc` @ `8c2ce2b03`, spike branch
`cass-GMT-1715` @ `d969350dd` (read via `git show`, never checked out); base camp
@ `e98ec58` (local-only, no remote). `@codecademy/variance` 0.26.1,
`@pandacss/*` 0.53.7 (read only, from `panda-consumer-poc/node_modules`).

---

## Verdicts — the two tiers do NOT get the same answer

### Atomics tier — Panda earns nothing. The diff is empty.

**Tier 1.** A 96-line Gamut-owned generator with **zero `@pandacss/*` imports**
reproduces `gamut-atomics-poc/dist/atomics-base.css` and `dist/atomics.css`
**byte-for-byte** — literally, `Buffer.equals` and matching SHA-256, not
"equivalent after normalisation".

```
atomics-base.css   115,867 B  sha f3adb343a3ae243d   (both)
atomics.css        707,557 B  sha 2e7b89b130fdc54f   (both)
```

`diff` is empty on both. All five breakpoints, 7,650 rules, media-query wrapping
and ordering included. **There were no content differences and no ordering
differences to report** — the section the ticket asked for is empty because the
generator was written to reproduce Panda's ordering rule after that rule was read
out of Panda's source (§"What Panda actually does" below). Had it been written
naively it would have diverged on rule order for 7 of 47 props; that
counterfactual is stated as Tier 2, not sold as a result.

The generator needs **no `node_modules` at all** (`mv node_modules _off && node
emit.mjs` still passes), because its only inputs are the Gamut prop config and the
Core theme.

### Recipe tier — materially more machinery, but still small, and Panda's version is *less* faithful

**Tier 1, against a different oracle.** No Panda recipe artifact exists to diff
against (see *What this cannot answer*), so the oracle here is **the runtime**,
which is what actually decides what a user sees. A Gamut-owned recipe emitter —
**53 lines** on top of the precompute step Gamut needs either way — matches the
runtime deep merge on **85 matrix points** across 5 recipes / 94 emitted rules,
declaration for declaration, per selector context.

And it is *more* faithful than the Panda route, in two ways that are proven by
running code, not argued:

1. **`variant({ base })` + `defaultVariant` is mis-precomputed today.**
   `panda-styling-poc`'s `src/precompute/generate.ts` reads the base contribution
   as `fn({ theme })`, but `createVariant` defaults the selection
   (`packages/variance/src/core.ts:265`), so that call returns
   **base ∪ defaultVariant**, not base. Gamut's *shipping* `sizeVariants` has
   `base: { fontWeight: 'title' }` (`packages/gamut/src/Button/shared/variants.ts:119`)
   — the spike's copy of it dropped that key, so the spike never exercised the path.
2. **Panda's single `base` slot is order-lossy.** `createButtonComponent` composes
   five style layers (`fontSmoothPixel`, `modeColorProps`, `buttonStyles`, the
   variant/state args, `buttonProps`), several of which can carry their own `base`. `defineRecipe`
   has exactly one `base`, so every layer's base flattens into it and is emitted
   *before* earlier layers' variant classes — inverting who wins. `FOLD_VARIANT_BASE=1`
   reproduces this and **fails loudly on 4 matrix points** of a deliberately
   adversarial recipe (`gmt-fold-hazard`). It is masked on the real Buttons only
   because `fontWeight` is the sole property `sizeVariants.base` declares and no
   colour variant sets it. Luck, not a guarantee.

So the recipe verdict is: **the machinery is ~4× the atomics tier and it is where
the real risk lives, but it is 53 lines, not a build system** — and the two known
fidelity hazards are both *created* by fitting Gamut's multi-layer composition into
`defineRecipe`'s single-`base` shape, so a Gamut-owned emitter does not inherit
them.

**Where Panda still does something Gamut would have to build:** nothing in the
recipe tier that Gamut's components actually use. See the feature audit below.

### One-line answer to the ticket

Atomics: **replaceable, proven by empty diff.** Recipes: **replaceable, proven
against the runtime, and the replacement is more faithful than the current
Panda-shaped precompute.** The answer is *not* the same for both — the atomics
answer is a byte diff, the recipe answer is a fidelity check with a different
oracle — but both land on the same side.

---

## Reproduce

```sh
cd "~/code/base camp/reboot/gamut-emitter-poc"
ln -s ../gamut-atomics-poc/node_modules node_modules   # already present
./build-recipe-source.sh                               # bundles real variance (esbuild)

node emit.mjs      && node verify.mjs                  # atomics  — exit 0
node recipes.mjs   && node verify-recipes.mjs          # recipes  — exit 0

# the diff the ticket asked for, directly:
diff dist/atomics-base.css ../gamut-atomics-poc/dist/atomics-base.css   # empty
diff dist/atomics.css      ../gamut-atomics-poc/dist/atomics.css        # empty
cmp  dist/atomics.css      ../gamut-atomics-poc/dist/atomics.css        # silent

# negative controls — both MUST exit non-zero:
EMITTER_MODE=physical node emit.mjs   && node verify.mjs          ; echo $?   # 1
FOLD_VARIANT_BASE=1 node recipes.mjs  && FOLD_VARIANT_BASE=1 node verify-recipes.mjs ; echo $?   # 1
```

`gamut-atomics-poc/` was not modified. Its `node_modules` is symlinked, its
`dist/` is read-only input.

### The loud checks

`claim-ledger.md` found only 5–6 of 12 spikes fail loudly and that nothing runs
any of them in CI. Both checks here set `process.exitCode = 1`, and **both were
verified to actually fire** (the two negative controls above), which is the part
usually skipped.

| assertion | file | oracle | fails loudly |
| --- | --- | --- | --- |
| 1. bytes | `verify.mjs:33` | `gamut-atomics-poc/dist/*.css` | yes — prints first differing byte + line |
| 2. atomic fidelity | `verify.mjs:93` | real `css()` | yes |
| 3. priority table | `verify.mjs:134` | Panda's own `getPropertyPriority` | yes — **caught a real gap, see below** |
| 4. recipe fidelity | `verify-recipes.mjs:133` | runtime deep merge, 85 points | yes |
| 5. `states()` overlap (A22) | `verify-recipes.mjs:173` | runtime declaration order | yes |
| 6. U1 force-emission | `verify-recipes.mjs:198` | the enumerated matrix | yes |

Assertion 3 is the one that earned its keep. The first draft hand-derived the
longhand table from the 8 CSS shorthands Gamut's props can touch — 57 entries.
Output was still byte-identical, and assertion 2 still passed. Assertion 3 failed
on **21 of Gamut's 126 props** (`gridTemplateColumns`, `justifyContent`,
`flexDirection`, `listStyleType`, …): all currently *open* props, so they emit no
atomics today, but the day any of them gains a `scale` the sheet silently reorders.
That is a **silent failure caught by a loud check** — the risk class
`MAP.md:103` names as the one to prefer against.

---

## What Panda actually does, in the atomics tier

The ticket's framing — "Panda's residual contribution is iterate → transform →
substitute vars → wrap in media queries → serialize" — is right, with **one item
missing that is the whole difficulty of byte-identity**:

**Rule order.** Panda sorts atomic rules by
`getPropertyPriority(entry.prop)` — `0` for `all`, `2` if the key is in the
longhand set derived from its 59-shorthand table, else `1` — with a *stable* sort,
so config order survives inside each bucket
(`@pandacss/core/dist/index.mjs:518-551`, `@pandacss/shared/dist/index.mjs:661-780`).

Two things about that are worth writing down:

- **It sorts on the utility KEY, not the CSS property.** So Gamut's abbreviated
  props (`mx`, `bg`, `mt`) score 1 because they aren't CSS names, while the seven
  whose names happen to *be* CSS longhands — `fontFamily`, `fontWeight`,
  `fontSize`, `lineHeight` (longhands of `font`), `rowGap`, `columnGap` (of `gap`),
  `borderColor` (of `border`) — score 2 and are moved to the **end** of the
  utilities layer. `borderColorLeft` *is* a longhand in CSS, but not under that
  name, so it scores 1 and stays put. **The emitted order of Gamut's own atomics is
  therefore partly an accident of Gamut's naming conventions.**
- **Some such table is unavoidable, and it is CSS's, not Panda's.** A sheet that
  emits `border-color` before `border` lets the shorthand win. The table is
  vendored in [`longhands.mjs`](longhands.mjs) — **178 entries** — with provenance
  and the loud cross-check. That is the concrete size of "the table Gamut would own".
  Note it is only needed for *byte-identity with Panda*: correctness needs
  shorthand-before-longhand, which is a much weaker requirement a Gamut-owned
  emitter could satisfy with its own ordering rule.

The rest of the byte-identity work was mechanical but not guessable, and is the
honest answer to "what a hand-rolled generator wouldn't anticipate":

| what | detail |
| --- | --- |
| `@layer` preamble | `@layer reset, base, tokens, recipes, utilities;` then a `base` layer whose only content is `--made-with-panda: '🐼'` (a 4-byte emoji — `String.length` 115,865 vs 115,867 bytes on disk) |
| token layer selector | `:where(:root, :host)`, not `:root` |
| token names kebab-cased, class values NOT | `--line-heights-spaced-title` but `.lineHeight_spacedTitle` |
| Panda appends two token categories | `--breakpoints-*` and `--sizes-breakpoint-*`, same five values |
| breakpoint px → rem in queries | `480px` → `screen and (min-width: 30rem)` at a 16px root |
| PostCSS raws formatting | selector at depth×2 spaces, declarations one deeper, closing `}` at **column 0 regardless of depth**; a blank line before each child of the utilities layer but **not** before rules nested in a media query; **no trailing newline** |
| responsive selector escaping | class `xs:m_0`, selector `.xs\:m_0` |
| ordering across conditions | all unconditioned rules first, then at-rule rules grouped by breakpoint (`sortStyleRules` partitions into declarations / selectors-only / at-rules) |

Four of these are invisible in a normalised comparison and only show up in a byte
diff. **None of them is a reason to keep Panda** — they are reasons to keep *some*
serializer, and the serializer is 20 lines.

### The four silent traps the ticket asked about

`panda.config.mjs` cost the oracle four silent traps and a 720-class hole. A
Gamut-owned generator's exposure:

| trap | origin | does the Gamut generator inherit it? |
| --- | --- | --- |
| `presets: []` is not enough; only `eject: true` opts out of `preset-base`, so `bg` → `background` | Panda's preset merge | **No — cannot occur.** There is no preset layer to inherit from. |
| `PropertyConfig.property` is types-only; without a `transform` the utility KEY becomes the CSS property (`bg: …`) | Panda's utility API | **No — cannot occur.** The generator reads Gamut's `property`/`properties` directly; there is no second, types-only channel. |
| Gamut's third property shape (`property` as a mode-keyed object) → `[object Object]`, 720 missing classes | Gamut's own config, not Panda | **Yes — inherited in full.** Same three-shape handling, same hazard (`emit.mjs`, `cssPropertiesFor`). Guarded by assertion 2, which fires (the `EMITTER_MODE=physical` control produces 664 mismatches). |
| `['*']` auto-emits negative spacing variants Gamut has no keys for — 1,020 dead rules | Panda's `staticCss` expansion | **No — cannot occur.** Enumeration is `Object.keys(scaleValues(scale))`; there is no `'*'`. |
| logical-vs-physical default (`useLogicalProperties ?? true`) | Gamut's own config | **Yes — inherited.** Same `EMITTER_MODE` switch, same 31%-of-matrix cost for dual mode. |

So: **two of the four traps are Panda-shaped and disappear with Panda; the two that
survive are Gamut's own config, and would survive any emitter choice.** This is the
opposite of the "keep a maintained tool because it knows the traps" argument — the
maintained tool *supplied* half of them. What Panda genuinely supplies is the
178-entry ordering table, now vendored and asserted.

---

## Sizing the recipe tier — measured, not estimated

`panda-rationale-sweep.md:147` (U2) holds up: `variant()`/`states()` map onto
`defineRecipe` 1:1. The question the ticket asks is what *replacing* it costs.
Answer, by section of [`recipes.mjs`](recipes.mjs) (non-comment lines):

| part | lines | is it a cost of dropping Panda? |
| --- | --- | --- |
| A. authoring, reproduced from `Button/shared/{styles,variants}.ts` | 110 | **No** — Gamut's existing source, unchanged. Kept verbatim so `templateVariants`, computed enum selector keys, `transitionConcat()` calls and the `textButton` ternary are all present; none is parsed, all are executed. |
| B. precompute + descriptors → `{ className, base, variants, defaultVariants }` | 131 | **No** — the Panda route needs exactly this (`generate.ts` on `cass-GMT-1715` is the same 100 lines). Shared. |
| C. **emit**: nested-selector flattening, kebab-case, one class per variant key, force-emission | **53** | **Yes — this is the whole replacement for `defineRecipe`'s CSS emission.** |
| of which: the runtime `recipeClasses()` (props → class list, applies `defaultVariants`) | 12 | Yes — replaces Panda's generated `recipe()` function. |

### `defineRecipe` feature audit — what Gamut would need vs. what it has

| `defineRecipe` feature | Gamut's use | needed by a Gamut-owned emitter? |
| --- | --- | --- |
| `base` | yes | yes — 1 flatten call |
| `variants` (matrix expansion) | yes, `variant({ prop, variants })` | yes — one class per key, `variants` already IS the matrix; `variance` supplies the keys |
| `defaultVariants` | yes, `variant({ defaultVariant })` | yes, but **runtime-only** (12 lines). Emits no CSS, so a byte-diff could never have caught a bug here — assertion 4's all-props-omitted arm does |
| `compoundVariants` | **no** — `variance` has no such concept | **no.** Would only be needed if the `states()`-overlap collapse in `verify-fidelity.ts`'s failure branch were ever required; it isn't (see A22 below) |
| slot recipes | **no** — no Gamut component uses slots | **no** |
| conditions (`_hover`, `_dark`, breakpoint keys) | **no** — `variance` emits literal `&:hover` selectors | **no.** Panda's condition system is bypassed entirely, exactly as its token layer is |
| token resolution | **no** — `variance` output is post-token (`var(--color-primary)`), hence the `[value]` escape | **no.** Removing Panda also removes the `[value]` escape and its documented leak (`panda-via-gamut-option-a.md:521-525`: `[transparent]` → `var(--colors-transparent)`) |
| `staticCss: { recipes }` force-emission | yes, required by U1 | **not as a feature** — force-emission is the *default* with no extractor. See U1 |
| generated TS types / `cva` runtime / jsx patterns | **no** — `panda-via-gamut-option-b.md:155-218` rejects them as an authoring surface | **no** |

**Nine of eleven features are unused.** The recipe tier is "materially more
machinery than the atomics tier" (`panda-rationale-sweep.md:271`) — 53 lines vs
20 — and that ratio holds, but the absolute number is small because Gamut's
authoring model bypasses most of `defineRecipe` before it starts.

### The one genuinely non-obvious piece

Nested-selector resolution. `variance` emits keys like
`"[disabled], &:disabled, &[aria-disabled='true']"` — a comma list that **mixes**
descendant and self-attaching forms. Under stylis/Emotion semantics the part
without `&` is a *descendant*, so the correct expansion is
`.cls [disabled], .cls:disabled, .cls[aria-disabled='true']`. Splitting per comma
part is mandatory; treating the key as one selector, or prefixing `&` wholesale,
silently changes which elements get styled. That is 8 of the 53 lines
(`resolveSelector`) and it is the place a hand-rolled recipe emitter is most likely
to be quietly wrong. Assertion 4 covers it — the disabled context appears in every
one of the 85 points.

### A22 re-checked, and its status changes

`panda-via-gamut-option-a.md:577-582` records the `states()`-overlap pass as "a
property of **Panda's** emission order, not a guarantee in the authoring model",
kept as a regression test. Under a Gamut-owned emitter that sentence stops being
true in the way that matters: the emitter walks `Object.keys` of the states config
itself, so declaration order and stylesheet order coincide **by construction in
code Gamut owns**, not by a vendor's incidental behaviour. Assertion 5 reproduces
the original probe (declaration order `warning→error`, alphabetical order
`error→warning`, so it still discriminates) and passes. This is a **reduction in
risk from dropping Panda**, and it is the risk `panda-rationale-sweep.md:274`
flagged as the recipe tier's real hazard.

---

## U1 — force-emission. Confirmed, and it favours a Gamut-owned generator.

`styling-engine-rfc.md:612-620` / `rspack-mf-spike.md:26-40`: across a Module
Federation boundary the host must style variants it never renders, so the sheet
must enumerate the matrix rather than follow usage.

**Both tiers satisfy this by construction, not by configuration.** Assertion 6
checks all 33 recipe classes exist while nothing in the process renders anything;
the atomics tier enumerates 1,275 × 6 from the theme. There is no extractor to
disable, no `include: [self]` trick, no `staticCss` block to keep in sync with the
prop list — the enumeration *is* the program. Contrast the oracle, which needs
three separate config-level defences (`eject: true`, `include: ['./panda.config.mjs']`,
an explicit `staticCss` matrix) precisely because Panda's default is
usage-driven, and where each of the three failing is silent.

This is the strongest surviving pro-Panda argument in `panda-rationale-sweep.md`
(S17, un-superseded, T1) — and it turns out to point the other way once the
alternative is an emitter with no extractor at all.

---

## vanilla-extract `sprinkles` — assessed from documented API, NOT run

**Tier 3.** No install: `@vanilla-extract/*` is not vendored anywhere in this tree
and the constraints forbid network installs. So this is reasoning about a published
API against the same 1,275-rule target, and is graded accordingly. It is *not*
"assessed against the oracle" — nothing was diffed.

Where it lands against the atomics tier:

- **`defineProperties({ properties, conditions, defaultCondition,
  responsiveArray })` is a direct analogue of what `emit.mjs` does** — a declared
  prop × value × condition matrix, exhaustively emitted, usage-independent. R1/R2/R4
  by design, so U1 is satisfied. `styling-engine-rfc.md:96-98` already named
  sprinkles beside Panda config as equals; that reads as prescient.
- **Two structural mismatches against Gamut's config**, both Tier 3:
  1. sprinkles' `properties` maps a **prop name → value record**, one CSS property
     per key. Gamut has **12 of 47** props (`mx`, `borderRadiusTop`, …) that expand
     to **two** CSS properties, and **16 more** where the single property is
     mode-keyed — 28 mode-dependent in total, which is the 31%-of-matrix figure
     `verify.mjs` reports.
     sprinkles has no `transform` hook equivalent — the shorthand mechanism
     (`shorthands: { mx: ['marginInlineStart','marginInlineEnd'] }`) covers the
     two-property case, but the physical/logical mode switch has to be resolved
     before the config is built, i.e. by generating two configs — the same cost
     this spike's `EMITTER_MODE` switch carries, not a new one.
  2. **Class names are hashed per file, not derived from the declaration.** Gamut's
     entire resolver design (`gamut-atomics-poc/resolve.mjs`, the zero-byte variant)
     depends on `${prop}_${value}` being *derivable* client-side without shipping a
     244kB manifest. sprinkles requires shipping its generated `Sprinkles`
     runtime/mapping. The sweep's R3 relaxation (`panda-rationale-sweep.md:226`)
     dissolves the *MF* objection because Gamut ships sheet and resolver from one
     build — but it does not restore derivability, so the zero-byte resolver result
     does not carry over.
- **`recipe()`** covers the variant tier and has `variants` /
  `defaultVariants` / `compoundVariants`, i.e. the same 1:1 mapping U2 found for
  `defineRecipe` — including, note, the **single `base`** shape whose order-loss is
  proven above. It would inherit that hazard.
- **Cost side unchanged:** `.css.ts` files, a consumer bundler plugin (moot per R7),
  and capacity-constrained maintainers — the sweep's only surviving objection.

**Recommendation for the option set:** sprinkles belongs in it as a **named
alternative emitter**, which is what the sweep asked. But on the evidence here it
is strictly worse than the Gamut-owned generator for *this* job: it costs a
dependency, loses the derivable-class-name property the resolver is built on, and
brings the single-`base` recipe shape. Its advantage over a Gamut-owned generator
is maintenance you don't do yourself — against 96 + 53 + 178 lines, of which the
178 are a vendored CSS fact.

---

## What this cannot answer

- **Nothing here validates in a browser.** No paint, no cascade against real DOM.
  Assertion 4 *simulates* the cascade assuming single-class specificity and
  file-order tie-breaking. That is correct for these selectors, but it is a model,
  not a rendering.
- **The recipe tier has no Panda artifact to diff.** `panda-styling-poc`'s
  `src/gamut-static.css` is gitignored and `@pandacss/*` is not installed in
  `cc/gamut`, so **"byte-identical to Panda's recipes" is untested and unclaimable**.
  The recipe verdict rests on agreement with the runtime, which is a different (and
  for user-visible behaviour, better) oracle — but it is not the same kind of
  evidence as the atomics verdict, and the two should not be quoted with the same
  confidence.
- **Five recipes, not 109.** Three real button families plus two probes. `variance`
  usage across `packages/gamut` (~109 `styled` sites) is not swept, so "every Gamut
  recipe survives this" is Tier 3. The `states()` count that matters (62 sites in
  mono) is unswept too — assertion 5 covers the *shape*, not the population.
- **`variantMeta`/`stateMeta` do not exist on shipping `variance`.** Both this
  emitter and the Panda route need the variant key list to be readable; the spike
  added the metadata on `cass-GMT-1715`, and here the descriptor carries it instead.
  Roughly 6 lines in `variance` either way, but it is unwritten work in both routes,
  so it discriminates between neither.
- **Container queries and non-Core themes are out.** The atomics run is the five
  viewport breakpoints on Core, matching the oracle. Six `c_*` container breakpoints
  and four other themes are matrix multipliers nobody has emitted.
- **No consumer build ran.** Same limitation `MAP.md:199` records for the tsdown
  work. Nothing here proves a `.css` artifact integrates into TI, front, platform
  or mono.
- **Maintenance cost is not measurable from a spike.** 96 + 53 + 178 lines is the
  *writing* cost. The `longhands.mjs` table tracks the CSS shorthand spec, and
  assertion 3 will only tell you it went stale if Gamut adds a prop that lands in
  it. Whether the team wants to own that is a staffing question, not a research one.

---

## Corrections

Pointers only; nothing above was edited in place.

### C1 — the oracle spike is no longer runnable, and its README does not say so

`gamut-atomics-poc/package.json:8` — `"generate": "panda cssgen --outfile
dist/atomics.css && node build-manifest.mjs"`.

**`@pandacss/*` is not installed in `cc/gamut/node_modules`.** `panda cssgen`
cannot run; there is no `node_modules/.bin/panda`. Separately,
`gamut-atomics-poc/gamut-source.mjs:13-15` imports
`@codecademy/gamut-styles/dist/variance/config.js`, `.../variance/props.js` and
`.../themes/core.js` — all three are now **unreachable**: the package's `exports`
map no longer publishes those subpaths, and `gamut-styles/dist` contains **zero
`.js` files** in this tree (types only, post-tsdown). So `panda.config.mjs` cannot
resolve its inputs either.

Consequences worth carrying into the rewrite:

- The atomics result is **still verifiable** — `node verify.mjs` and
  `build-manifest.mjs` import the pre-bundled `dist/gamut-source.bundle.mjs`, not
  the live packages. Confirmed: it runs clean today (1,275 pairs, 2,561 resolver
  cases, exit 0). Also independently re-verified here by assertion 2.
- But it is **no longer regenerable**, so `dist/atomics.css` has become a
  checked-in artifact whose producer is gone. Anyone quoting "1,275 rules,
  byte-identical" should know the number can be *re-checked* but not *re-derived*.
- `dist/gamut-source.bundle.mjs` is now the only surviving executable copy of the
  Gamut prop config + Core theme in this tree, which is why this spike depends on it
  too. That is fragile provenance for the effort's single strongest Tier 1 result.

### C2 — "byte-identical" in the atomics docs still means normalised maps; here it means bytes

`claim-ledger.md` already corrected this (`gamut-atomics-poc/verify.mjs:106`
compares normalised declaration maps after kebab-casing and one `var()` deref) and
that correction stands. Recording the resolution rather than re-litigating it:

- **`gamut-atomics-poc/verify.mjs:120`** prints
  `✓ all 1275 produce byte-identical declarations`. The word is still wrong at that
  line — it is a normalised-map comparison. `claim-ledger.md`'s correction is right.
- **This spike's assertion 1 is literal**: `Buffer.equals` plus SHA-256 over whole
  files. **Assertion 2 is explicitly not** — its own output says
  `(normalised: kebab-case + one var() deref, NOT bytes)`.
- Net: the *result* the docs assert survives and is now **also** true in the literal
  sense, but only for the Panda-vs-Gamut-generator comparison. "Byte-identical to
  today's `css()`" remains an overstatement, because `css()` returns a JS object,
  not bytes. There is no byte comparison to be had on that side, ever.

### C3 — `panda-styling-poc`'s precompute has a real defect, unreported

`spikes/panda-styling-poc/src/precompute/generate.ts` (`cass-GMT-1715` @ `d969350dd`):

> `const withoutVariant = hasBase ? fn({ theme }) : {};`
> `// subtract the base contribution so it isn't duplicated per variant`

`fn({ theme })` does not return the base contribution. `createVariant` destructures
`{ [prop]: selected = defaultVariant } = props` (`packages/variance/src/core.ts:265`),
so with the prop omitted it returns **base merged with the default variant**.
Folding that into `base` moves the default variant's declarations into the shared
class and empties the default key.

The spike could not observe it: its `authoring.ts` copy of `sizeVariants` has no
`base` key, while the shipping one does
(`packages/gamut/src/Button/shared/variants.ts:119`, `base: { fontWeight: 'title' }`).
Reproduced here, and on the real config it produces a base class carrying `size`
normal's `padding`/`fontSize`/`minInlineSize`/`blockSize` — harmless only because
all three size keys set the identical property set.

Fix used here: select a key that cannot exist, so `variantFns[selected]` is
`undefined` and only `baseFn` contributes (`recipes.mjs`, `NO_SUCH_VARIANT`).

### C4 — a second, independent defect in the same fold: `defineRecipe`'s single `base` is order-lossy

Not a coding slip — a shape mismatch. `createButtonComponent`
(`packages/gamut/src/Button/shared/styles.ts:77-86`) composes five style layers in
order; several can carry a `base`. `defineRecipe` has one `base` slot, so folding is
forced, and a later layer's base ends up emitted before an earlier layer's variant
class — inverting the winner.

Proven, not argued: `FOLD_VARIANT_BASE=1 node recipes.mjs && FOLD_VARIANT_BASE=1
node verify-recipes.mjs` exits 1 with 4 divergences on `gmt-fold-hazard`
(`font-weight: runtime '400' vs emitted '700'`). Masked on the real Buttons because
`fontWeight` is the only property `sizeVariants.base` declares and no colour variant
sets it.

This belongs beside A22 in the rewrite as a **second** silent-regression risk in the
recipe tier — bringing the count `MAP.md:103` tracks ("four instances found so far")
to six with C3.

### C5 — S19's determinism claim is even weaker than the sweep says

`panda-rationale-sweep.md:85` already notes the determinism "comes from
`${prop}_${value}` naming that **Gamut supplies**". Strengthening it with this
spike's evidence: the class names, the token variable names, the rule order, the
`@layer` structure and the media-query wrapping are **all** reproducible without
Panda, byte for byte. So on the atomics tier Panda contributes *no* naming or
determinism property that Gamut does not already supply or cannot trivially supply.
The one property that is genuinely Panda's is the **178-entry longhand ordering
table**, and that is a vendorable CSS fact rather than a tool capability.

---

## Revised framing — 2026-08-11, after review

The verdicts above stand as measurements. **The framing around them was too strong**, and
this section is the honest version. Added rather than rewritten so the original reasoning
stays auditable.

### "Panda earns nothing" overstates it

Byte-identity proves we **can** replicate the output. It does not prove replacing is
**worth it** — you only gain from replacing a generator if the generator is a problem, and
in `gamut-atomics-poc` Panda is already ejected, `presets: []`, extractor off, transforms
hand-written, theme replaced. It is barely Panda. But *barely used* also means *cheap to
keep*.

**The more useful reading of byte-identity is that it makes the decision reversible.** Same
707,557 bytes either way, so picking wrong costs a generator swap, not a migration.

### Three arguments against this spike's own conclusion

1. **The 178-entry longhand table was extracted from Panda** — see `longhands.mjs`'s
   provenance header (`@pandacss/shared` 0.53.7). So "zero `@pandacss/*` dependency" is
   true of the build graph and **false of the data**. We vendor their table frozen in
   time; if CSS gains shorthands, ours goes stale **silently** while theirs is updated
   upstream.
2. **The recipe order-loss may have an untested Panda-side workaround.**
   `FOLD_VARIANT_BASE=1` proves that *folding five layers into one `base` slot* inverts the
   winner. It does **not** prove `defineRecipe` cannot express Gamut's composition another
   way — and 9 of its 11 features are unused here, **including compound variants**. Nobody
   tried the alternatives. A proven defect in one mapping was presented as a property of
   the tool.
3. **"Panda's contribution was rule order derived from an accident of Gamut's naming"** is
   a good line and a weak argument. If that order is what Gamut ships today, dropping Panda
   means **owning the accident explicitly** in a hand-maintained table. Panda encoding it
   for us is arguably a service.

### What survives, and it is modest

- **No codegen step** in the consumer or library build.
- **Force-emission by construction** — no extractor to disable, versus Panda's three
  config-level defences that each fail silently. This one matters, because silent failure
  is this migration's whole risk class.
- The recipe tier remains **weaker evidence than the atomics tier**: no Panda recipe
  artifact exists to diff against, so it rests on runtime agreement rather than bytes.

### The accurate verdict

**A coin-flip weighted slightly toward a Gamut-owned emitter, on a decision that is cheap
to reverse.** The real question is not technical: *who maintains ~214 lines forever, and is
that their day job?* A permanently under-funded internal generator is a worse bet than a
small externally-maintained one — and Panda being a three-project team is a risk that
applies to both sides of that comparison.

**This should not consume much decision-making energy.** Phase 3 (deleting Emotion) is
where the stakes are.
