import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { renderToStaticMarkup } from 'react-dom/server';

import {
  extractStyles,
  ThemeProvider as EngineThemeProvider,
} from '../../panda-styling-poc/src/gamut/engine';
import { EmotionPage } from './tree-emotion';
import { EnginePage } from './tree-engine';

/* ============================================================================
 * THIS IS AN APPROXIMATION. Read the caveats before quoting any number.
 *
 * What IS real:
 *   - Arm A is genuinely today's stack: real @emotion/styled 11.14.1 + the real
 *     @codecademy/gamut-styles css/variant/states + real styledOptions.
 *   - Both arms share the SAME style functions with the SAME arguments, so the
 *     delta isolates the injection layer rather than confounding it with
 *     differences in style resolution.
 *
 * What is APPROXIMATED, and why the number is not a production forecast:
 *   1. Arm B is ~400 lines of spike code; Emotion is a decade-hardened library.
 *      An unoptimised challenger beating a mature incumbent should be read as
 *      "the approach is not disqualified", never as "it is 1.Nx faster".
 *   2. Arm B has NO prebuilt-atomics fast path (tier 3 is unimplemented). This
 *      measures the injector-only WORST case for the proposed design.
 *   3. Node + renderToStaticMarkup only. No browser CSSOM insertRule, no style
 *      recalculation, no layout, no paint, no hydration — and those are where a
 *      runtime styling engine actually hurts users.
 *   4. Single process, no GC isolation, JIT warmth varies by arm ordering.
 *   5. The real production engine would differ from Arm B (atomics, possibly a
 *      build step), so its performance is NOT what is measured here.
 *
 * Run: yarn nx run styling-perf-poc:bench
 * ========================================================================== */

const CARDS = Number(process.env.CARDS ?? 200);
const ITERATIONS = Number(process.env.ITERATIONS ?? 30);
const WARMUP = 5;

type Sample = { mean: number; median: number; min: number; p95: number };

const stats = (samples: number[]): Sample => {
  const sorted = [...samples].sort((a, b) => a - b);
  const at = (q: number) =>
    sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))];
  return {
    mean: samples.reduce((sum, value) => sum + value, 0) / samples.length,
    median: at(0.5),
    min: sorted[0],
    p95: at(0.95),
  };
};

const time = (fn: () => void) => {
  const start = process.hrtime.bigint();
  fn();
  return Number(process.hrtime.bigint() - start) / 1e6;
};

// --- Arm A: Emotion ---------------------------------------------------------
const renderEmotion = (
  cache: ReturnType<typeof createCache>,
  unique: boolean
) =>
  renderToStaticMarkup(
    <CacheProvider value={cache}>
      <ThemeProvider theme={coreTheme as never}>
        <EmotionPage count={CARDS} unique={unique} />
      </ThemeProvider>
    </CacheProvider>
  );

/* Emotion in SSR does NOT put CSS in `cache.inserted` (values there are just
 * `true`) and `cache.registered` stays empty for the `styled` path. It renders
 * its rules INLINE as `<style data-emotion>` tags inside the markup, and
 * `@emotion/server` is not installed here. So extract from the markup — which is
 * also the honest apples-to-apples measure, since that's the CSS the client
 * actually receives. */
const STYLE_TAG = /<style[^>]*data-emotion[^>]*>([\s\S]*?)<\/style>/g;

const emotionCssFromMarkup = (markup: string) =>
  [...markup.matchAll(STYLE_TAG)].map((match) => match[1]).join('');

const stripStyleTags = (markup: string) => markup.replace(STYLE_TAG, '');

// --- Arm B: the engine ------------------------------------------------------
const renderEngine = (unique: boolean) =>
  renderToStaticMarkup(
    <EngineThemeProvider theme={coreTheme as never}>
      <EnginePage count={CARDS} unique={unique} />
    </EngineThemeProvider>
  );

// --- measurement -----------------------------------------------------------
type Result = {
  label: string;
  cold: Sample;
  warm: Sample;
  cssBytes: number;
  classes: number;
  markupBytes: number;
};

const measureEmotion = (unique: boolean): Result => {
  const coldSamples: number[] = [];
  const warmSamples: number[] = [];

  for (let i = 0; i < WARMUP; i += 1) {
    renderEmotion(createCache({ key: 'w' }), unique);
  }

  // cold: a fresh cache each iteration (first render of a given style set)
  for (let i = 0; i < ITERATIONS; i += 1) {
    const cache = createCache({ key: `c${i}` });
    coldSamples.push(time(() => renderEmotion(cache, unique)));
  }

  // warm: one cache reused, i.e. steady-state SSR in a long-lived process
  const shared = createCache({ key: 'warm' });
  renderEmotion(shared, unique);
  for (let i = 0; i < ITERATIONS; i += 1) {
    warmSamples.push(time(() => renderEmotion(shared, unique)));
  }

  const final = createCache({ key: 'final' });
  const markup = renderEmotion(final, unique);
  const css = emotionCssFromMarkup(markup);

  return {
    label: 'A — Emotion (today)',
    cold: stats(coldSamples),
    warm: stats(warmSamples),
    cssBytes: Buffer.byteLength(css),
    classes: Object.keys(final.inserted).length,
    markupBytes: Buffer.byteLength(stripStyleTags(markup)),
  };
};

const measureEngine = (unique: boolean): Result => {
  const coldSamples: number[] = [];
  const warmSamples: number[] = [];

  for (let i = 0; i < WARMUP; i += 1) {
    renderEngine(unique);
    extractStyles();
  }

  // cold: clear the registry each iteration so every rule is hashed + emitted
  for (let i = 0; i < ITERATIONS; i += 1) {
    extractStyles();
    coldSamples.push(time(() => renderEngine(unique)));
  }

  // warm: registry retained, so inject() short-circuits on the dedupe check
  extractStyles();
  renderEngine(unique);
  for (let i = 0; i < ITERATIONS; i += 1) {
    warmSamples.push(time(() => renderEngine(unique)));
  }

  extractStyles();
  const markup = renderEngine(unique);
  const css = extractStyles();

  return {
    label: 'B — engine (proposed, approximated)',
    cold: stats(coldSamples),
    warm: stats(warmSamples),
    cssBytes: Buffer.byteLength(css),
    classes: new Set(css.match(/\.gmt-[a-z0-9]+/g) ?? []).size,
    markupBytes: Buffer.byteLength(markup),
  };
};

/* Order matters for JIT fairness, so run each arm twice in opposite order and
 * keep the better (lower) median — crude, but it stops "whichever ran second"
 * from being the headline. */
const best = (a: Result, b: Result): Result =>
  a.warm.median <= b.warm.median ? a : b;

const scenario = (unique: boolean) => {
  const emotionA = measureEmotion(unique);
  const engineA = measureEngine(unique);
  const emotionB = measureEmotion(unique);
  const engineB = measureEngine(unique);
  return {
    emotion: best(emotionA, emotionB),
    engine: best(engineA, engineB),
  };
};

const ms = (value: number) => `${value.toFixed(1)}ms`;
const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)}kB`;
const ratio = (a: number, b: number) =>
  b === 0 ? 'n/a' : `${(a / b).toFixed(2)}x`;

/* eslint-disable no-console */
console.log('\n=== Styling engine performance: today vs proposed ===');
console.log('*** APPROXIMATION — see the caveat block in src/bench.tsx ***\n');
console.log(
  `Tree: ${CARDS} cards x (heading + body + 3 buttons + 2 boxes) ≈ ${
    CARDS * 7
  } styled nodes`
);
console.log(
  `Iterations: ${ITERATIONS} per phase, ${WARMUP} warmup, 2 passes per arm\n`
);

const header = [
  'arm',
  'cold median',
  'warm median',
  'warm p95',
  'CSS',
  'classes',
]
  .map((h, i) => (i === 0 ? h.padEnd(38) : h.padStart(13)))
  .join('');

const row = (r: Result) =>
  [
    r.label.padEnd(38),
    ms(r.cold.median).padStart(13),
    ms(r.warm.median).padStart(13),
    ms(r.warm.p95).padStart(13),
    kb(r.cssBytes).padStart(13),
    String(r.classes).padStart(13),
  ].join('');

const report = (
  title: string,
  note: string,
  { emotion, engine }: ReturnType<typeof scenario>
) => {
  console.log(`\n--- ${title} ---`);
  console.log(`${note}\n`);
  console.log(header);
  console.log(row(emotion));
  console.log(row(engine));
  console.log('\n  relative (engine vs Emotion, >1 = engine slower/larger)');
  console.log(
    `    cold ${ratio(engine.cold.median, emotion.cold.median)}   ` +
      `warm ${ratio(engine.warm.median, emotion.warm.median)}   ` +
      `CSS ${ratio(engine.cssBytes, emotion.cssBytes)}`
  );
  console.log(
    `    markup (style tags stripped): Emotion ${kb(
      emotion.markupBytes
    )} vs engine ${kb(engine.markupBytes)}`
  );
};

const low = scenario(false);
const high = scenario(true);

report(
  'LOW CARDINALITY — realistic component reuse',
  'Many instances, few distinct styles. Both engines dedupe almost everything,\n' +
    'so this measures the hot path with caches doing their job.',
  low
);

report(
  'HIGH CARDINALITY — adversarial for a hashing injector',
  'Nearly every node resolves to a distinct style object, so the injector must\n' +
    'hash AND insert per node. This is the case a low-cardinality tree hides.',
  high
);

console.log('\n=== What this does and does not tell you ===');
console.log(
  '  DOES: style resolution is shared between arms, so any timing delta is'
);
console.log('        attributable to the injection layer and nothing else.');
console.log(
  '  DOES: bound the SSR cost of the injector-only path against a mature'
);
console.log(
  '        incumbent, in both the friendly and the adversarial case.'
);
console.log(
  '  DOES NOT: predict browser cost. No CSSOM insertRule, style recalc,'
);
console.log(
  '        layout or paint is measured — and that is where runtime CSS'
);
console.log('        actually hurts users.');
console.log(
  '  DOES NOT: represent the real proposed engine, which adds a prebuilt-'
);
console.log('        atomics fast path this spike has not implemented.');
console.log(
  '  DOES NOT: license a "faster than Emotion" claim. Arm B is ~400 lines'
);
console.log(
  "        of spike code with none of Emotion's hardening; read parity as"
);
console.log('        "not disqualified", not as a win.\n');
/* eslint-enable no-console */
