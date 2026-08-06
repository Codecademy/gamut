import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import { breakpoints } from '@codecademy/gamut-styles/dist/variables/responsive';
import { all } from '@codecademy/gamut-styles/dist/variance/config';
import { gzipSync } from 'node:zlib';

import { css, inject } from '../gamut/engine';

/* Measures the two candidate resolution strategies for system props against the
 * REAL Gamut prop config + Core theme, so the numbers reflect Gamut's actual
 * surface rather than an estimate.
 *
 *   A. Prebuilt atomics — exhaustively emit every legal prop x token pair once.
 *      Fixed cost, independent of how large the consuming app is.
 *   B. Runtime injector — emit one class per unique style OBJECT encountered.
 *      ~Zero fixed cost, grows with the number of distinct combinations used.
 *
 * Run: yarn nx run panda-styling-poc:measure */

type PropConfig = { scale?: string | readonly unknown[] };
const config = all as unknown as Record<string, PropConfig>;
const theme = coreTheme as unknown as Record<string, Record<string, unknown>>;

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)}kB`;
const sizes = (text: string) => {
  const raw = Buffer.byteLength(text);
  const gz = gzipSync(text, { level: 9 }).length;
  return { raw, gz, label: `${kb(raw)} raw / ${kb(gz)} gzip` };
};

// CSS-safe fragment for a class name (`100%` -> `100pct`, `1fr` -> `1fr`)
const slug = (value: string) =>
  value
    .replace(/%/g, 'pct')
    .replace(/\./g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '-');

const declarations = (prop: string, value: unknown): string => {
  try {
    const resolved = css({ [prop]: value } as never)({ theme } as never);
    return Object.entries(resolved)
      .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
      .map(
        ([k, v]) =>
          `${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${
            typeof v === 'number' && v !== 0 ? `${v}px` : String(v)
          }`
      )
      .join(';');
  } catch {
    return '';
  }
};

/* Which values a prop can legally take. A named scale means the value space is
 * closed (this is what `strictTokens` buys us and what makes exhaustive emission
 * possible at all); no scale means unbounded -> injector territory. */
const valuesFor = (prop: string): string[] => {
  const { scale } = config[prop] ?? {};
  if (Array.isArray(scale)) return scale.map(String);
  if (typeof scale === 'string') return Object.keys(theme[scale] ?? {});
  return [];
};

const scaled = Object.keys(config).filter((prop) => valuesFor(prop).length > 0);
const unscaled = Object.keys(config).filter(
  (prop) => valuesFor(prop).length === 0
);

// --- A. prebuilt atomics ----------------------------------------------------
const baseRules: string[] = [];
scaled.forEach((prop) => {
  valuesFor(prop).forEach((value) => {
    const decls = declarations(prop, value);
    if (decls) baseRules.push(`.${prop}_${slug(value)}{${decls}}`);
  });
});

const mediaKeys = Object.keys(breakpoints as Record<string, string>);
const responsiveRules = mediaKeys.flatMap((size) =>
  baseRules.map(
    (rule) =>
      `@media only screen and (min-width:${
        (breakpoints as Record<string, string>)[size]
      }){${rule.replace(/^\./, `.${size}\\:`)}}`
  )
);

const atomicBase = sizes(baseRules.join(''));
const atomicFull = sizes([...baseRules, ...responsiveRules].join(''));

// --- B. runtime injector ----------------------------------------------------
/* Cost per unique style object, measured from the parity render: 14 real
 * components produced 2,356 bytes of CSS. Rather than hardcode that, derive the
 * per-class average from a representative sample of real system-prop combos. */
const sampleCombos: Record<string, unknown>[] = [
  { p: 16, bg: 'primary' },
  { px: 32, m: 0 },
  { display: 'flex', alignItems: 'center', columnGap: 12 },
  { m: 0, p: 0, listStyle: 'none', width: '100%' },
  { my: 48 },
  { ml: 4, display: 'inline' },
  { px: 24, py: 4, mb: 8, mr: 8, bg: 'white' },
  { borderRadius: 'md', border: 2, borderColor: 'primary' },
];
const ruleFor = (combo: Record<string, unknown>, name: string) => {
  const resolved = css(combo as never)({ theme } as never);
  const decls = Object.entries(resolved)
    .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${String(v)}`
    )
    .join(';');
  return `.${name}{${decls}}`;
};

const sampleText = sampleCombos
  .map((combo, index) => ruleFor(combo, `gmt-${index.toString(36)}abcde`))
  .join('');
const perClass = Buffer.byteLength(sampleText) / sampleCombos.length;

/* Synthesises N DISTINCT combinations from the real prop/value space. Replicating
 * one sample N times would compress unrealistically well and flatter the
 * injector, so vary both the props chosen and their values. */
const syntheticInjected = (count: number) => {
  const pool = scaled.filter((prop) => valuesFor(prop).length > 1);
  const rules: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const combo: Record<string, unknown> = {};
    const width = 2 + (i % 4);
    for (let j = 0; j < width; j += 1) {
      const prop = pool[(i * 7 + j * 13) % pool.length];
      const values = valuesFor(prop);
      combo[prop] = values[(i * 5 + j * 3) % values.length];
    }
    rules.push(ruleFor(combo, `gmt-${i.toString(36)}`));
  }
  return rules.join('');
};

/* mono has ~17,800 system-prop JSX attributes. The injector emits one class per
 * unique COMBINATION, so the count that matters is distinct combinations, not
 * attributes. Bracketed because the true number needs a real build to know. */
const projections = [1_000, 3_000, 6_000, 10_000];

/* eslint-disable no-console */
console.log(
  '\n=== System-prop resolution: prebuilt atomics vs runtime injector ===\n'
);

console.log(`Gamut prop surface: ${Object.keys(config).length} props`);
console.log(`  token-scaled (closed value space): ${scaled.length}`);
console.log(`  unscaled (open value space):       ${unscaled.length}`);
console.log(`Breakpoints: ${mediaKeys.length} (${mediaKeys.join(', ')})\n`);

console.log('A. PREBUILT ATOMICS — fixed cost, independent of app size');
console.log(
  `  base rules only:      ${baseRules.length.toLocaleString()} rules   ${
    atomicBase.label
  }`
);
console.log(
  `  + all breakpoints:    ${(
    baseRules.length + responsiveRules.length
  ).toLocaleString()} rules   ${atomicFull.label}\n`
);

console.log('B. RUNTIME INJECTOR — grows with distinct style combinations');
console.log(
  `  measured cost per unique class: ${perClass.toFixed(0)} bytes raw`
);
const injected = projections.map((n) => {
  const measured = sizes(syntheticInjected(n));
  console.log(
    `  ${n.toLocaleString().padStart(6)} unique combos:  ${measured.label}`
  );
  return { n, ...measured };
});

/* --------------------------------------------------------------------------
 * C. Dynamic values: the unbounded-class footgun, and the fix.
 *
 * The injector hashes the resolved CSSObject, so a genuinely continuous value
 * (`width: 37.5%`) produces a NEW CLASS PER VALUE. A progress bar animating
 * 0->100% emits ~100 rules that are never reused. This is the one way a consumer
 * can make the runtime path grow without bound.
 *
 * The fix keeps the class static and puts only the VALUE inline, as a CSS custom
 * property — one class forever, regardless of how many values occur.
 * ------------------------------------------------------------------------ */
const percentages = Array.from({ length: 100 }, (_, i) => `${i}%`);

// naive: width baked into the style object -> one class per distinct value
const naive = new Set(
  percentages.map((value) => inject({ width: value } as never))
);

// custom property: class is constant, value rides an inline `style` attribute
const viaVariable = new Set(
  percentages.map(() => inject({ width: 'var(--bar-width)' } as never))
);

console.log('\nC. DYNAMIC VALUES — 100 distinct widths');
console.log(`  baked into the style object: ${naive.size} classes`);
console.log(`  via a CSS custom property:   ${viaVariable.size} class`);
console.log(
  `  => ${naive.size}x fewer rules, and the count no longer grows with the data`
);

console.log('\nHYBRID — base atomics prebuilt, everything else injected');
console.log(`  prebuilt base atomics:                 ${atomicBase.label}`);
console.log(
  `  ...covers ${scaled.length}/${
    Object.keys(config).length
  } props at the base breakpoint`
);
console.log('  injector then handles: the 79 unscaled props, every responsive');
console.log('  variant, and all arbitrary css() values.\n');

console.log('Crossover');
const crossover = injected.find((entry) => entry.gz > atomicFull.gz);
console.log(
  `  Full atomics (all breakpoints) = ${kb(atomicFull.gz)} gzip, a fixed cost.`
);
console.log(
  crossover
    ? `  The injector only exceeds that past ~${crossover.n.toLocaleString()} unique combinations.`
    : `  The injector stays under that even at ${projections[
        projections.length - 1
      ].toLocaleString()} unique combinations.`
);
console.log(
  '  Atomics are O(1) in app size; the injector is O(distinct combinations).\n'
);
/* eslint-enable no-console */
