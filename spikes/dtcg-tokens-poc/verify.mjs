/* Parity, which is the whole question. A token pipeline that emits *different*
 * values than Gamut emits today is not a migration, it's a redesign.
 *
 * Four checks:
 *   1. CSS variable parity   — same names, same values, per colour mode
 *   2. Value round-trip      — DTCG's dimension object → CSS string, losslessly
 *   3. Name/type parity      — the generated unions match `keyof theme[scale]`
 *   4. Engine-neutrality     — all three consumers agree on the token set
 */
import { readFileSync } from 'node:fs';

import { coreTheme } from './.tmp/core.mjs';

const read = (f) => readFileSync(f, 'utf8');

/** `--name: value;` pairs out of a generated stylesheet. */
const varsIn = (file) =>
  new Map(
    [...read(file).matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)].map((m) => [
      m[1],
      m[2].trim(),
    ])
  );

const light = varsIn('dist/tokens.light.css');
const dark = varsIn('dist/tokens.dark.css');
const generated = JSON.parse(read('dist/flat.json'));

/* Deviations that are understood, unavoidable, and accepted. Listing them
 * explicitly means a NEW deviation still fails the run, instead of hiding among
 * known ones. */
const EXPECTED_DEVIATIONS = new Map([
  [
    'spacing.0: gamut 0 vs generated "0px"',
    "DTCG requires `dimension` values to carry a unit, so a unitless zero can't survive the round-trip. Harmless in CSS (`0px` === `0`), but it does change the TS value type from the number 0 to the string '0px' — `keyof` is unaffected, so token type safety is intact.",
  ],
]);

let failures = 0;
const accepted = [];

const report = (label, problems, total) => {
  const unexpected = problems.filter((p) => {
    if (!EXPECTED_DEVIATIONS.has(p)) return true;
    accepted.push(p);
    return false;
  });

  if (unexpected.length === 0) {
    const note = problems.length
      ? ` (${problems.length} accepted deviation${
          problems.length > 1 ? 's' : ''
        })`
      : '';
    console.log(`   ✓ ${label} — ${total} checked${note}`);
    return;
  }
  failures += unexpected.length;
  console.log(`   ✗ ${label} — ${unexpected.length} of ${total} differ`);
  unexpected.slice(0, 6).forEach((p) => console.log(`       ${p}`));
  if (unexpected.length > 6)
    console.log(`       …and ${unexpected.length - 6} more`);
};

/* ── 1. CSS variable parity ──────────────────────────────────────────────────
 * Gamut's palette lives in `_variables.root` as `--color-x: #hex`. Those must
 * come out byte-identical, because consumers' CSS references them by name. */
console.log('\n1. CSS VARIABLE PARITY vs what Gamut emits today');

const gamutRoot = Object.entries(coreTheme._variables.root).filter(
  ([, v]) => typeof v === 'string' || typeof v === 'number'
);

const paletteProblems = [];
let paletteChecked = 0;
for (const [name, expected] of gamutRoot) {
  if (!name.startsWith('--color-')) continue;
  paletteChecked += 1;
  const actual = light.get(name);
  if (actual === undefined) paletteProblems.push(`${name} MISSING from output`);
  else if (actual !== String(expected))
    paletteProblems.push(
      `${name}: gamut '${expected}' vs generated '${actual}'`
    );
}
report('palette colours', paletteProblems, paletteChecked);

/* Semantic aliases: Gamut's `modes[mode][alias] = paletteTokenName`, and its
 * runtime emits `--color-<alias>: var(--color-<target>)`. Same shape expected. */
for (const [mode, vars] of [
  ['light', light],
  ['dark', dark],
]) {
  const problems = [];
  const entries = Object.entries(coreTheme.modes[mode]);
  for (const [alias, target] of entries) {
    const expected = `var(--color-${target})`;
    const actual = vars.get(`--color-${alias}`);
    if (actual === undefined)
      problems.push(`--color-${alias} MISSING from ${mode}`);
    else if (actual !== expected)
      problems.push(`--color-${alias}: expected '${expected}' got '${actual}'`);
  }
  report(`semantic aliases (${mode})`, problems, entries.length);
}

/* ── 2. value round-trip ─────────────────────────────────────────────────────
 * DTCG forces dimensions through `{ value, unit }`, so every dimension is
 * decomposed and reassembled. Anything that doesn't survive shows up here. */
console.log('\n2. VALUE ROUND-TRIP through DTCG');

const SCALES = [
  ['spacing', 'spacing'],
  ['borderRadii', 'radii'],
  ['fontSize', 'fontSize'],
  ['lineHeight', 'lineHeight'],
  ['fontWeight', 'fontWeight'],
  ['fontFamily', 'fontFamily'],
];

const roundTrip = [];
let roundTripChecked = 0;
for (const [gamutScale, category] of SCALES) {
  for (const [key, expected] of Object.entries(coreTheme[gamutScale])) {
    roundTripChecked += 1;
    const actual = generated[`${category}-${key}`];
    if (actual === undefined) {
      roundTrip.push(`${category}.${key} MISSING`);
      continue;
    }
    if (String(actual) !== String(expected))
      roundTrip.push(
        `${category}.${key}: gamut ${JSON.stringify(
          expected
        )} vs generated ${JSON.stringify(actual)}`
      );
  }
}
report('scale values', roundTrip, roundTripChecked);

/* ── 3. name / type parity ───────────────────────────────────────────────────
 * The load-bearing one for type safety: `keyof theme.colors` must keep yielding
 * `'navy-800'`, not `'navy800'`. */
console.log('\n3. NAME PARITY (drives the generated union types)');

const namesFor = (category) =>
  new Set(
    Object.keys(generated)
      .filter((k) => k.startsWith(`${category}-`))
      .map((k) => k.slice(category.length + 1))
  );

const nameProblems = [];
let nameChecked = 0;
for (const [gamutScale, category] of [['colors', 'color'], ...SCALES]) {
  const expected = new Set(Object.keys(coreTheme[gamutScale]));
  const actual = namesFor(category);
  nameChecked += expected.size;

  for (const name of expected)
    if (!actual.has(name))
      nameProblems.push(
        `${category}: missing '${name}' (in theme, not generated)`
      );
  for (const name of actual)
    if (!expected.has(name))
      nameProblems.push(
        `${category}: extra '${name}' (generated, not in theme)`
      );
}
report('token names match keyof theme[scale]', nameProblems, nameChecked);

/* ── 4. engine-neutrality ────────────────────────────────────────────────────
 * If the Panda preset, the CSS and the TS all carry the same token set, then
 * Panda is a CONSUMER of the tokens rather than the place they live — which is
 * the only thing that makes swapping the engine cheap. */
console.log('\n4. ENGINE-NEUTRALITY — three consumers, one source');

const { gamutPreset } = await import('./dist/panda-preset.mjs');
const pandaNames = new Set(
  Object.entries(gamutPreset.theme.tokens).flatMap(([category, entries]) =>
    Object.keys(entries).map((k) => `${category}-${k}`)
  )
);
const tsNames = new Set(Object.keys(generated));
const cssNames = new Set([...light.keys()].map((v) => v.replace(/^--/, '')));

const neutrality = [];
for (const name of tsNames) {
  if (!pandaNames.has(name))
    neutrality.push(`${name}: in TS, missing from Panda preset`);
  if (!cssNames.has(name)) neutrality.push(`${name}: in TS, missing from CSS`);
}
for (const name of pandaNames)
  if (!tsNames.has(name))
    neutrality.push(`${name}: in Panda preset, missing from TS`);
report('token set identical across CSS / TS / Panda', neutrality, tsNames.size);

/* ── what DTCG could not express ─────────────────────────────────────────────── */
const unexpressible = JSON.parse(read('tokens/.unexpressible.json'));
console.log(`\n5. NOT EXPRESSIBLE AS DTCG — ${unexpressible.length} value(s)`);
for (const { path, value } of unexpressible)
  console.log(`   • ${path} = ${JSON.stringify(value)}`);

if (accepted.length) {
  console.log('\n6. ACCEPTED DEVIATIONS (understood and unavoidable)');
  for (const problem of accepted)
    console.log(`   • ${problem}\n     → ${EXPECTED_DEVIATIONS.get(problem)}`);
}

console.log(
  failures === 0
    ? '\nAll parity checks passed.\n'
    : `\n${failures} unexpected parity problem(s) — see above.\n`
);
process.exitCode = failures === 0 ? 0 : 1;
