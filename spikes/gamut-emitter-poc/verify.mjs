/* Three assertions, all loud (`process.exitCode = 1`):
 *
 *   1. BYTES — the Gamut-owned emitter's output is byte-for-byte identical to
 *      `gamut-atomics-poc/dist/*.css`, the Panda-generated oracle. Not
 *      "equivalent after normalisation": `Buffer.equals`, plus a SHA-256 of both.
 *   2. FIDELITY — every emitted rule matches what the real `css()` produces
 *      today. Independent of assertion 1: if the oracle itself were wrong, 1
 *      would still pass and this would not. Declaration maps after kebab-casing
 *      and one `var()` deref — NOT a byte comparison, and it says so.
 *   3. PRIORITY TABLE — the emitter hardcodes the subset of Panda's
 *      shorthand→longhand table that Gamut's props can reach, because that table
 *      is what determines rule ORDER. This asserts the subset agrees with
 *      Panda's real `getPropertyPriority` on all 126 Gamut props, so a new Gamut
 *      prop that lands in the table cannot silently reorder the sheet.
 *      Skipped (loudly, but not fatally) if no Panda install is reachable —
 *      Panda is not a dependency of the emitter, only of this assertion.
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

import {
  GAMUT_PROPS,
  closedProps,
  coreTheme,
  gamutCss,
  scaleValues,
} from '../gamut-atomics-poc/dist/gamut-source.bundle.mjs';
import { LONGHAND_PROPS, propertyPriority } from './emit.mjs';

const sha = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 16);

/* ── 1. bytes ──────────────────────────────────────────────────────────────── */
console.log('\n1. BYTES — Gamut-owned emitter vs the Panda oracle');
let bytesOk = true;
for (const file of ['atomics-base.css', 'atomics.css']) {
  const mine = readFileSync(`dist/${file}`);
  const oracle = readFileSync(`../gamut-atomics-poc/dist/${file}`);
  const equal = mine.equals(oracle);
  if (!equal) bytesOk = false;
  console.log(
    `   ${equal ? '✓' : '✗'} ${file.padEnd(18)} mine ${String(mine.length).padStart(
      7
    )}B sha ${sha(mine)}  oracle ${String(oracle.length).padStart(7)}B sha ${sha(
      oracle
    )}`
  );
  if (!equal) {
    // first differing byte, so the failure names a location rather than a fact
    const n = Math.min(mine.length, oracle.length);
    let i = 0;
    while (i < n && mine[i] === oracle[i]) i += 1;
    const line = mine.subarray(0, i).toString().split('\n').length;
    console.log(
      `       first divergence at byte ${i} (line ${line}):\n` +
        `         mine:   ${JSON.stringify(mine.subarray(i, i + 60).toString())}\n` +
        `         oracle: ${JSON.stringify(oracle.subarray(i, i + 60).toString())}`
    );
  }
}
if (!bytesOk) process.exitCode = 1;

/* ── 2. fidelity against the real css() ────────────────────────────────────── */
const css = readFileSync('dist/atomics.css', 'utf8');

const tokenValues = new Map(
  [...css.matchAll(/(--[a-zA-Z]+-[A-Za-z0-9-]+):\s*([^;]+);/g)].map((m) => [
    m[1],
    m[2].trim(),
  ])
);
const deref = (value) => {
  const match = /^var\((--[^),]+)\)$/.exec(String(value).trim());
  if (!match) return String(value).trim();
  return (tokenValues.get(match[1]) ?? String(value).trim()).trim();
};

const ruleFor = new Map();
for (const match of css.matchAll(/\n\s*\.([A-Za-z][A-Za-z0-9]*_[^\s,{]+)\s*\{([^}]*)\}/g)) {
  const className = match[1].replace(/\\/g, '');
  if (ruleFor.has(className)) continue; // base layer wins
  const decls = {};
  for (const decl of match[2].split(';')) {
    const idx = decl.indexOf(':');
    if (idx !== -1) decls[decl.slice(0, idx).trim()] = decl.slice(idx + 1).trim();
  }
  ruleFor.set(className, decls);
}

const kebab = (prop) => prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

let checked = 0;
const mismatches = [];
for (const { prop, scale } of closedProps) {
  for (const value of Object.keys(scaleValues(scale))) {
    checked += 1;
    const expected = gamutCss({ [prop]: value })({ theme: coreTheme });
    const actual = ruleFor.get(`${prop}_${value}`);
    if (!actual) {
      mismatches.push(`${prop}=${value}: no rule for .${prop}_${value}`);
      continue;
    }
    const expectedDecls = Object.entries(expected).map(([p, v]) => [kebab(p), deref(v)]);
    const actualDecls = Object.fromEntries(
      Object.entries(actual).map(([p, v]) => [p, deref(v)])
    );
    if (expectedDecls.length !== Object.keys(actualDecls).length) {
      mismatches.push(
        `${prop}=${value}: property count ${expectedDecls.length} vs ${
          Object.keys(actualDecls).length
        }`
      );
      continue;
    }
    for (const [property, expectedValue] of expectedDecls)
      if (actualDecls[property] !== expectedValue)
        mismatches.push(
          `${prop}=${value}: ${property} '${expectedValue}' vs '${actualDecls[property]}'`
        );
  }
}

console.log(
  `\n2. FIDELITY — emitted rules vs the real css() (normalised: kebab-case + one var() deref, NOT bytes)`
);
if (mismatches.length === 0)
  console.log(`   ✓ all ${checked} prop×value pairs agree, declaration for declaration`);
else {
  console.log(`   ✗ ${mismatches.length} of ${checked} mismatch`);
  mismatches.slice(0, 10).forEach((m) => console.log(`     ${m}`));
  process.exitCode = 1;
}

/* ── 3. the priority table, cross-checked against Panda's own ──────────────── */
console.log(`\n3. PRIORITY TABLE — hardcoded longhand subset vs Panda's getPropertyPriority`);
let pandaPriority;
try {
  ({ getPropertyPriority: pandaPriority } = await import(
    '../panda-consumer-poc/node_modules/@pandacss/shared/dist/index.mjs'
  ));
} catch {
  pandaPriority = undefined;
}
if (!pandaPriority) {
  console.log(
    `   ⚠ SKIPPED — no @pandacss/shared reachable. The emitter does not need it;\n` +
      `     this assertion does. Rule ORDER is unverified against Panda in this run.`
  );
} else {
  const allProps = Object.keys(GAMUT_PROPS);
  const disagreements = allProps.filter(
    (prop) => propertyPriority(prop) !== pandaPriority(prop)
  );
  console.log(
    `   compared ${allProps.length} Gamut props (${closedProps.length} closed)` +
      `; local table has ${LONGHAND_PROPS.size} entries`
  );
  if (disagreements.length === 0)
    console.log(`   ✓ identical priority for every Gamut prop`);
  else {
    console.log(`   ✗ ${disagreements.length} disagree — rule order would diverge`);
    disagreements
      .slice(0, 20)
      .forEach((prop) =>
        console.log(
          `     ${prop}: local ${propertyPriority(prop)} vs panda ${pandaPriority(prop)}`
        )
      );
    process.exitCode = 1;
  }
}

console.log(
  `\n${process.exitCode ? '✗ FAIL' : '✓ PASS'} — exit ${process.exitCode ?? 0}\n`
);
