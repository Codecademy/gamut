/* Does a prebuilt atomic produce the SAME CSS that Gamut's real `css()` produces
 * today? That's the only question that matters — a smaller stylesheet is worthless
 * if it styles things differently.
 *
 * Method: for every closed prop × every value in its scale, run the real
 * `css()` from `@codecademy/gamut-styles`, then parse the corresponding atomic
 * rule out of the generated CSS and compare declaration-for-declaration.
 *
 * Panda's token vars indirect to Gamut's own (`--colors-primary: var(--color-primary)`),
 * so values are compared after resolving one level of `var()` through the token
 * block Panda emitted.
 */
import { readFileSync } from 'node:fs';

import {
  GAMUT_PROPS,
  closedProps,
  coreTheme,
  gamutCss,
  scaleValues,
} from './dist/gamut-source.bundle.mjs';
import { createResolver, createThemeResolver } from './resolve.mjs';

const css = readFileSync('dist/atomics.css', 'utf8');
const { baseKey, breakpointKeys, manifest } = JSON.parse(
  readFileSync('dist/atomics-manifest.json', 'utf8')
);

/* ── token map, for resolving one level of var() indirection ───────────────── */
const tokenValues = new Map(
  [...css.matchAll(/(--[a-zA-Z]+-[A-Za-z0-9-]+):\s*([^;]+);/g)].map((m) => [
    m[1],
    m[2].trim(),
  ])
);

const deref = (value) => {
  const match = /^var\((--[^),]+)\)$/.exec(String(value).trim());
  if (!match) return String(value).trim();
  const resolved = tokenValues.get(match[1]);
  return resolved === undefined ? String(value).trim() : resolved.trim();
};

/* ── parse the atomic rules out of the base layer ──────────────────────────── */
const ruleFor = new Map();
for (const match of css.matchAll(
  /\n\s*\.([A-Za-z][A-Za-z0-9]*_[^\s,{]+)\s*\{([^}]*)\}/g
)) {
  const className = match[1].replace(/\\/g, '');
  if (ruleFor.has(className)) continue; // first (base-layer) wins
  const decls = {};
  for (const decl of match[2].split(';')) {
    const idx = decl.indexOf(':');
    if (idx === -1) continue;
    decls[decl.slice(0, idx).trim()] = decl.slice(idx + 1).trim();
  }
  ruleFor.set(className, decls);
}

const kebab = (prop) => prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/* ── 1. fidelity ───────────────────────────────────────────────────────────── */
let checked = 0;
const mismatches = [];

for (const { prop, scale } of closedProps) {
  for (const value of Object.keys(scaleValues(scale))) {
    const expected = gamutCss({ [prop]: value })({ theme: coreTheme });
    const className = manifest[prop]?.[value]?.[baseKey];
    const actual = ruleFor.get(className);
    checked += 1;

    if (!actual) {
      mismatches.push({ prop, value, why: `no rule for .${className}` });
      continue;
    }

    const expectedDecls = Object.entries(expected).map(([p, v]) => [
      kebab(p),
      deref(v),
    ]);
    const actualNormalised = Object.fromEntries(
      Object.entries(actual).map(([p, v]) => [p, deref(v)])
    );

    if (expectedDecls.length !== Object.keys(actualNormalised).length) {
      mismatches.push({
        prop,
        value,
        why: `property count: gamut ${expectedDecls.length} vs atomic ${
          Object.keys(actualNormalised).length
        } (${Object.keys(actualNormalised).join('+')})`,
      });
      continue;
    }

    for (const [property, expectedValue] of expectedDecls) {
      if (!(property in actualNormalised)) {
        mismatches.push({
          prop,
          value,
          why: `atomic missing '${property}' (has ${Object.keys(
            actualNormalised
          ).join('+')})`,
        });
      } else if (actualNormalised[property] !== expectedValue) {
        mismatches.push({
          prop,
          value,
          why: `${property}: gamut '${expectedValue}' vs atomic '${actualNormalised[property]}'`,
        });
      }
    }
  }
}

console.log(`\n1. FIDELITY — atomic CSS vs real css() output`);
console.log(`   compared ${checked} prop×value pairs across ${closedProps.length} props`);
if (mismatches.length === 0) {
  console.log(`   ✓ all ${checked} produce byte-identical declarations`);
} else {
  console.log(`   ✗ ${mismatches.length} mismatches`);
  const grouped = new Map();
  for (const m of mismatches) {
    const key = m.why.replace(/'[^']*'/g, "'…'").replace(/\d+/g, 'N');
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(`${m.prop}=${m.value}`);
  }
  for (const [why, cases] of [...grouped].sort((a, b) => b[1].length - a[1].length))
    console.log(`     ${String(cases.length).padStart(4)}× ${why}\n           e.g. ${cases.slice(0, 3).join(', ')}`);
  process.exitCode = 1;
}

/* ── 2. resolver: Gamut's own vocabulary, including the `_` base key ───────── */
const resolve = createResolver({ baseKey, manifest });

const cases = [
  ['literal, closed', { p: 24, bg: 'primary' }],
  ['responsive with Gamut `_`', { p: { _: 8, md: 16 } }],
  ['open prop → injector', { width: '37.5%' }],
  ['open VALUE on closed prop', { p: 13 }],
  ['mixed', { p: 24, width: 'calc(100% - 3px)', bg: 'primary' }],
  ['partial responsive → all to injector', { p: { _: 8, md: 13 } }],
];

console.log(`\n2. RESOLVER — props in, classes out (baseKey '${baseKey}')`);
for (const [label, props] of cases) {
  const { classNames, runtime } = resolve(props);
  console.log(
    `   ${label.padEnd(38)} classes=[${classNames.join(' ')}]${
      Object.keys(runtime).length ? ` → injector=${JSON.stringify(runtime)}` : ''
    }`
  );
}

/* ── 2b. the zero-byte resolver must agree, on every valid pair ─────────────── */
const themeResolve = createThemeResolver({
  baseKey,
  theme: coreTheme,
  props: GAMUT_PROPS,
  breakpointKeys,
});

let agreements = 0;
const disagreements = [];
const compare = (props) => {
  const a = resolve(props);
  const b = themeResolve(props);
  agreements += 1;
  if (
    a.classNames.join(',') !== b.classNames.join(',') ||
    JSON.stringify(a.runtime) !== JSON.stringify(b.runtime)
  )
    disagreements.push({ props, a, b });
};

for (const [, props] of cases) compare(props);
for (const { prop, scale } of closedProps) {
  for (const value of Object.keys(scaleValues(scale))) {
    compare({ [prop]: value });
    compare({ [prop]: { _: value, md: value } });
  }
}
// and some deliberately-open values
for (const value of [13, '37.5%', 'calc(100% - 3px)', undefined, null])
  compare({ p: value, width: value });

console.log(
  `\n2b. ZERO-BYTE RESOLVER — derived from theme + prop config, no manifest shipped`
);
if (disagreements.length === 0)
  console.log(`   ✓ agrees with the manifest resolver on all ${agreements} cases`);
else {
  console.log(`   ✗ ${disagreements.length} disagreements of ${agreements}`);
  disagreements.slice(0, 5).forEach((d) =>
    console.log(`     ${JSON.stringify(d.props)}\n       manifest=${JSON.stringify(d.a)}\n       derived  =${JSON.stringify(d.b)}`)
  );
  process.exitCode = 1;
}

/* ── 3. the numbers ────────────────────────────────────────────────────────── */
const modeDependent = closedProps.filter(
  ({ property, properties }) =>
    properties?.logical ||
    (typeof property === 'object' && property !== null && property.logical)
);
const modeDependentValues = modeDependent.reduce(
  (n, { scale }) => n + Object.keys(scaleValues(scale)).length,
  0
);
const totalValues = closedProps.reduce(
  (n, { scale }) => n + Object.keys(scaleValues(scale)).length,
  0
);

console.log(`\n3. MATRIX`);
console.log(`   closed props: ${closedProps.length}   base atomics: ${totalValues}`);
console.log(
  `   mode-dependent (logical/physical): ${modeDependent.length} props / ${modeDependentValues} atomics ` +
    `= ${((modeDependentValues / totalValues) * 100).toFixed(0)}% of the matrix`
);
console.log(
  `   → supporting BOTH modes costs +${modeDependentValues} base rules (+${(
    (modeDependentValues / totalValues) *
    100
  ).toFixed(0)}%)`
);
console.log(`   viewport breakpoints: ${breakpointKeys.length} (${breakpointKeys.join(',')})`);
