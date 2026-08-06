# Styling engine performance spike (GMT-1715)

Branch: `cass-GMT-1715`. Answers the open item left by
`~/code/base camp/reboot/panda-via-gamut-option-a.md`: **"Injector performance
unmeasured. Correctness is proven; per-render cost vs. Emotion is not."**

## ⚠️ This is an APPROXIMATION

Say this out loud before quoting any number from it.

**What is real:**

- Arm A is genuinely today's stack — real `@emotion/styled` 11.14.1, the real
  `@codecademy/gamut-styles` `css`/`variant`/`states`, real `styledOptions`.
- Both arms call the **same style functions with the same arguments**
  (`src/styles.ts`), so any timing delta is attributable to the injection layer
  and nothing else. That isolation is the whole point of the design.

**What is approximated — and why this is not a production forecast:**

1. Arm B is ~400 lines of spike code. Emotion is a decade-hardened library. An
   unoptimised challenger landing at parity means "**not disqualified**", never
   "faster than Emotion".
2. Arm B has **no prebuilt-atomics fast path** — tier 3 of the proposed design is
   unimplemented. This measures the **injector-only worst case**.
3. **Node + `renderToStaticMarkup` only.** No CSSOM `insertRule`, no style
   recalculation, no layout, no paint, no hydration — and those are precisely
   where a runtime styling engine costs users something.
4. Single process, no GC isolation. Mitigated by running each arm twice in
   alternating order and keeping the better median, but not eliminated.
5. The real production engine would differ from Arm B, so its performance is
   **not** what is measured here.

## Run it

```
# once the workspace is installed
yarn nx run styling-perf-poc:bench
yarn nx run styling-perf-poc:typecheck

# without a workspace install (resolves from the repo root)
../../node_modules/.bin/esbuild src/bench.tsx --bundle --platform=node \
  --format=cjs --jsx=automatic --outfile=.bench/bench.cjs && node .bench/bench.cjs

CARDS=500 ITERATIONS=50 yarn bench     # knobs
```

## Design

| file                   | role                                                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `src/shared.ts`        | re-exports the REAL Gamut helpers from the deep `dist/variance` path (avoids dragging `GamutProvider`/framer-motion into a node bench) |
| `src/styles.ts`        | the style definitions **both** arms consume, plus `StyleProps`-derived prop types                                                      |
| `src/tree-emotion.tsx` | Arm A — `@emotion/styled` + `styledOptions`                                                                                            |
| `src/tree-engine.tsx`  | Arm B — the engine from `../panda-styling-poc/src/gamut/engine`                                                                        |
| `src/bench.tsx`        | harness: cold/warm × low/high cardinality                                                                                              |

Arm B imports the engine **across spikes rather than copying it** — a duplicate
would drift and quietly invalidate the comparison.

### Two scenarios, because one of them lies

- **Low cardinality** — many instances, few distinct styles (realistic component
  reuse). Both engines dedupe nearly everything, so the injector hashes 1,400
  times but inserts 11 rules.
- **High cardinality** — nearly every node resolves to a **distinct** style
  object, so the injector must hash _and_ insert per node. This is the adversarial
  case, and the one a low-cardinality tree hides.

A subtlety worth recording: the first attempt at the high-cardinality tree used
strides (`SPACINGS[index * 3 % 11]`), which made every value a function of
`index % 11` — so all three props moved together and produced only **11** distinct
combinations instead of ~200. It looked like a high-cardinality test and wasn't.
`spacingDigit` uses independent base-11 digits instead.

### Two fairness fixes worth knowing about

1. **`propNames` wrapper** (`src/shared.ts`). The engine filters props off the DOM
   by reading `propNames` from its style functions, but the real gamut-styles
   `variant`/`states` don't expose them. Without the wrapper the engine arm did
   strictly _less_ work than Arm A (which filters via `styledOptions`) **and**
   leaked `fullWidth`/`compact` onto the DOM.
2. **Emotion's CSS is inlined in the markup.** `cache.inserted` values are just
   `true` in SSR and `cache.registered` stays empty for the `styled` path;
   Emotion renders `<style data-emotion>` tags into the tree itself. The harness
   extracts from the markup and strips those tags before comparing tree sizes —
   otherwise Emotion looks like it emits a bigger DOM when it's actually carrying
   its stylesheet inline.

## Results (M-series Mac, node 24, 200 cards ≈ 1,400 styled nodes)

| scenario         | metric      | Emotion | engine | ratio     |
| ---------------- | ----------- | ------- | ------ | --------- |
| low cardinality  | cold median | 12.1ms  | 12.6ms | 1.04x     |
|                  | warm median | 12.4ms  | 12.3ms | 0.99x     |
|                  | CSS         | 4.4kB   | 3.1kB  | **0.71x** |
| high cardinality | cold median | 12.8ms  | 13.2ms | 1.03x     |
|                  | warm median | 12.7ms  | 12.9ms | 1.02x     |
|                  | CSS         | 37.4kB  | 30.2kB | **0.81x** |

Both arms emit the same number of classes (11 low / 209 high), confirming they're
doing equivalent work.

### Reading

- **SSR render cost is at parity** — within ~1–4% across both scenarios, in both
  cold and warm phases. The injector is not a bottleneck at SSR, even in the
  adversarial case and even without the atomics fast path.
- **The engine emits 19–29% less CSS.** Not an optimisation — a structural
  consequence: it flattens composed style functions into **one class per
  component**, whereas Emotion emits a class per serialized style and composes
  them. Same reason override precedence stops depending on insertion order.
- **Cold vs warm barely differs** in either arm, because `variance`'s `css()`
  memoises per call site and that cache is shared by both arms. The injection
  layer is not where SSR time goes; `variance` + React are.

### What is still unmeasured

- **Browser cost** — `insertRule` against a live CSSOM, style recalculation,
  layout, paint, and hydration. This is the real risk and it needs a headless
  Chrome harness, not node.
- **Memory** — the injector keeps a `Set` of every class it has emitted for the
  process lifetime; Emotion's cache does something similar, but neither was
  profiled.
- **The atomics fast path**, which should make tier-3 system props strictly
  cheaper than either arm here (a map lookup instead of hash + serialize).
- **Real app workloads.** 200 synthetic cards is not portal-app.
