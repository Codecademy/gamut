/* Gamut's real Core theme → W3C DTCG token files.
 *
 * This is the half of the question that Style Dictionary can't answer for us:
 * are Gamut's tokens even *expressible* in DTCG? Everything downstream (CSS
 * variables, TS types, a Panda preset) is only interesting if this step is
 * lossless.
 *
 * Reads the REAL theme, bundled from source by `yarn theme`. Nothing is retyped.
 */
import { mkdirSync, writeFileSync } from 'node:fs';

import { coreTheme } from './.tmp/core.mjs';

const OUT = 'tokens';
mkdirSync(OUT, { recursive: true });

/** Things DTCG could not represent without changing their meaning. */
const unexpressible = [];

/* ── colours ─────────────────────────────────────────────────────────────────
 * `_variables.root` holds the palette as raw hex; `modes.{light,dark}` map
 * semantic aliases onto palette token NAMES. So the palette is DTCG values and
 * the semantic layer is DTCG aliases — which is exactly the split DTCG is good
 * at. */
const rootVars = Object.entries(coreTheme._variables.root).filter(
  ([, value]) => typeof value === 'string' || typeof value === 'number'
);

const palette = {};
for (const [name, value] of rootVars) {
  if (!name.startsWith('--color-')) continue;
  palette[name.replace('--color-', '')] = { $type: 'color', $value: value };
}

/* ── dimensions ──────────────────────────────────────────────────────────────
 * DTCG 2025.10 requires dimension values to be an OBJECT — `{ value, unit }`
 * with unit `px` or `rem` — not the CSS string Gamut stores. So every value has
 * to be parsed apart and reassembled downstream, and that round-trip is the
 * thing `verify.mjs` checks. */
const DIMENSION = /^(-?[\d.]+)(px|rem)$/;

const dimension = (raw, path) => {
  // `spacing[0]` is the NUMBER 0, not a string — unitless zero has no unit
  if (typeof raw === 'number')
    return { $type: 'dimension', $value: { value: raw, unit: 'px' } };

  const match = DIMENSION.exec(String(raw));
  if (!match) {
    unexpressible.push({ path, value: raw, why: 'not a px/rem dimension' });
    return undefined;
  }
  return {
    $type: 'dimension',
    $value: { value: Number(match[1]), unit: match[2] },
  };
};

const group = (scale, build) => {
  const out = {};
  for (const [key, raw] of Object.entries(scale)) {
    const token = build(raw, key);
    if (token) out[key] = token;
  }
  return out;
};

const spacing = group(coreTheme.spacing, (raw, key) =>
  dimension(raw, `spacing.${key}`)
);
const radii = group(coreTheme.borderRadii, (raw, key) =>
  dimension(raw, `radii.${key}`)
);
const fontSize = group(coreTheme.fontSize, (raw, key) =>
  dimension(raw, `fontSize.${key}`)
);

/* `lineHeight` is unitless (1.5) → DTCG `number`. `fontWeight` accepts a number
 * or a keyword. Both map cleanly. */
const lineHeight = group(coreTheme.lineHeight, (raw) => ({
  $type: 'number',
  $value: raw,
}));
const fontWeight = group(coreTheme.fontWeight, (raw) => ({
  $type: 'fontWeight',
  $value: raw,
}));

/* DTCG `fontFamily` takes a string or an array of family names. Gamut stores a
 * pre-joined CSS stack containing newlines, so it goes in as a single string —
 * legal, but it means the value is opaque to any tool that wants the families
 * individually. Splitting on comma would drop the exact original string, which
 * the parity check would then fail on. */
const fontFamily = group(coreTheme.fontFamily, (raw) => ({
  $type: 'fontFamily',
  $value: raw,
}));

/* ── the two things that do NOT fit ──────────────────────────────────────────
 * `borders`: `'1px solid var(--color-border-primary)'`. DTCG has a `border`
 * composite type — `{ width, style, color }` — but Gamut's value embeds a
 * `var()` reference to a SEMANTIC colour, whose resolution is mode-dependent.
 * As a DTCG composite it would need one value per mode, which lands straight
 * back on the modes gap below. Left out rather than misrepresented.
 *
 * `elements`: `{ headerHeight: 'var(--elements-headerHeight)' }` — the theme
 * object holds a reference to a variable it also defines. That indirection is a
 * runtime mechanism, not a token value. The raw dimension IS exported (from
 * `_variables.root`); the self-reference is not. */
for (const [key, value] of Object.entries(coreTheme.borders))
  unexpressible.push({
    path: `borders.${key}`,
    value,
    why: 'CSS shorthand embedding a var() ref to a mode-dependent semantic colour; DTCG `border` is a composite and would need one value per mode',
  });

const elements = {};
for (const [name, value] of rootVars) {
  if (!name.startsWith('--elements-')) continue;
  const key = name.replace('--elements-', '');
  const token = dimension(value, `elements.${key}`);
  if (token) elements[key] = token;
}

/* ── modes ───────────────────────────────────────────────────────────────────
 * THE GAP. DTCG 2025.10 has no concept of modes, themes, or multiple values per
 * token — a token has exactly one `$value`. Gamut has 5 themes × 2 colour modes
 * over one palette.
 *
 * So each mode becomes its own token FILE holding the same token names with
 * different alias targets, and the build runs once per mode. That is the
 * established workaround (it is how Style Dictionary's own multi-brand examples
 * work), but note what it costs: the mode dimension lives in your build
 * configuration rather than in the tokens, so it does not travel with the token
 * file. Any consumer reading the DTCG JSON alone cannot know modes exist. */
const semanticFor = (mode) =>
  Object.fromEntries(
    Object.entries(coreTheme.modes[mode]).map(([alias, target]) => [
      alias,
      { $type: 'color', $value: `{color.${target}}` },
    ])
  );

const write = (file, data) => {
  writeFileSync(`${OUT}/${file}`, `${JSON.stringify(data, null, 2)}\n`);
  return file;
};

const written = [
  write('palette.json', { color: palette }),
  write('dimension.json', {
    spacing,
    radii,
    fontSize,
    lineHeight,
    fontWeight,
    fontFamily,
    elements,
  }),
  write('semantic.light.json', { color: semanticFor('light') }),
  write('semantic.dark.json', { color: semanticFor('dark') }),
];

const count = (o) => Object.keys(o).length;

console.log('\nDTCG export from the real Core theme');
written.forEach((f) => console.log(`  tokens/${f}`));
console.log(
  `\n  palette colours     ${count(palette)}` +
    `\n  semantic aliases    ${count(
      semanticFor('light')
    )} per mode × 2 modes` +
    `\n  spacing             ${count(spacing)}` +
    `\n  radii               ${count(radii)}` +
    `\n  fontSize            ${count(fontSize)}` +
    `\n  lineHeight          ${count(lineHeight)}` +
    `\n  fontWeight          ${count(fontWeight)}` +
    `\n  fontFamily          ${count(fontFamily)}` +
    `\n  elements            ${count(elements)}`
);

if (unexpressible.length) {
  console.log(`\n  ⚠ ${unexpressible.length} values NOT expressed as DTCG:`);
  for (const { path, value, why } of unexpressible)
    console.log(`     ${path} = ${JSON.stringify(value)}\n       → ${why}`);
}
// trailing newline, so re-running doesn't dirty the working tree
writeFileSync(
  'tokens/.unexpressible.json',
  `${JSON.stringify(unexpressible, null, 2)}\n`
);
