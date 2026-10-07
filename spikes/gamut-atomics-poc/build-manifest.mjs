/* Builds the lookup table Gamut's `Box` would ship, then ASSERTS every entry
 * against the CSS Panda actually emitted.
 *
 * The manifest is derived independently — from Gamut's prop config and the real
 * theme scales — rather than by parsing Panda's output. That's deliberate: if the
 * two ever disagree, the assertion fails loudly instead of the app silently
 * rendering a class with no rule behind it. That silent-unstyled failure is the
 * whole risk of a class-name-based system (see panda-via-gamut-option-b.md).
 */
import { readFileSync, writeFileSync } from 'node:fs';

import {
  GAMUT_BASE_KEY,
  closedProps,
  scaleValues,
  viewportBreakpoints,
} from './dist/gamut-source.bundle.mjs';

const css = readFileSync('dist/atomics.css', 'utf8');

/* Panda escapes the `:` in responsive class names, so the selector in the
 * stylesheet is `.md\:p_24` for the class `md:p_24`. */
const present = new Set(
  [...css.matchAll(/\.((?:[a-zA-Z]+\\:)?[a-zA-Z][a-zA-Z0-9]*_[^\s,{:]+)\s*\{/g)].map(
    (match) => match[1].replace(/\\/g, '')
  )
);

const breakpointKeys = Object.keys(viewportBreakpoints);

const manifest = {};
const missing = [];
let entries = 0;

for (const { prop, scale } of closedProps) {
  const values = scaleValues(scale);
  manifest[prop] = {};

  for (const value of Object.keys(values)) {
    const base = `${prop}_${value}`;
    const byBreakpoint = { [GAMUT_BASE_KEY]: base };
    for (const bp of breakpointKeys) byBreakpoint[bp] = `${bp}:${base}`;

    for (const className of Object.values(byBreakpoint)) {
      entries += 1;
      if (!present.has(className)) missing.push(className);
    }
    manifest[prop][value] = byBreakpoint;
  }
}

writeFileSync(
  'dist/atomics-manifest.json',
  JSON.stringify({ baseKey: GAMUT_BASE_KEY, breakpointKeys, manifest })
);

const manifestBytes = readFileSync('dist/atomics-manifest.json').length;

console.log(`\nmanifest: ${closedProps.length} props, ${entries} class entries`);
console.log(`selectors found in emitted CSS: ${present.size}`);
console.log(`manifest size: ${(manifestBytes / 1024).toFixed(1)}kB raw`);

if (missing.length) {
  console.log(`\n✗ ${missing.length} manifest entries have NO rule in the CSS`);
  console.log(`  first 10: ${missing.slice(0, 10).join(', ')}`);
  process.exitCode = 1;
} else {
  console.log(`\n✓ every one of the ${entries} manifest entries has a real rule`);
}
