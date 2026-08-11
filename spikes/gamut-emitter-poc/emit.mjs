/* A Gamut-OWNED atomic CSS emitter. Zero `@pandacss/*` imports.
 *
 * Same inputs as `gamut-atomics-poc`: the real Gamut prop config and the real
 * Core theme, read through that spike's own bundled source module so the two
 * generators cannot drift on their inputs.
 *
 * Output target: byte-for-byte equality with `gamut-atomics-poc/dist/atomics-base.css`
 * and `.../atomics.css`. `verify.mjs` is the loud check.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

import {
  GAMUT_BASE_KEY,
  SCALE_TO_PANDA_CATEGORY,
  closedProps,
  scaleValues,
  viewportBreakpoints,
} from '../gamut-atomics-poc/dist/gamut-source.bundle.mjs';
import { LONGHAND_PROPS } from './longhands.mjs';

/* Gamut defaults to logical properties (`variance/src/core.ts:150` reads
 * `useLogicalProperties ?? true`), so this is the set that matches what `css()`
 * actually emits today. `EMITTER_MODE=physical` emits the other set. */
const MODE = process.env.EMITTER_MODE === 'physical' ? 'physical' : 'logical';
const RESPONSIVE = process.env.EMITTER_RESPONSIVE !== '0';

const kebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/* ── 1. token layer ────────────────────────────────────────────────────────────
 * One CSS variable per (Gamut scale → token category) × token name. Token names
 * are kebab-cased (`spacedTitle` → `--line-heights-spaced-title`) but the class
 * name keeps the raw key (`.lineHeight_spacedTitle`) — those two differ, which is
 * exactly the kind of asymmetry a hand-rolled generator gets wrong once. */
const varFor = (scale, name) =>
  `--${kebab(SCALE_TO_PANDA_CATEGORY[scale])}-${kebab(name)}`;

const usedScales = [];
for (const { scale } of closedProps)
  if (!usedScales.includes(scale)) usedScales.push(scale);

const tokenLines = [];
for (const scale of usedScales)
  for (const [name, value] of Object.entries(scaleValues(scale)))
    tokenLines.push(`${varFor(scale, name)}: ${String(value)};`);

/* Breakpoint-derived tokens. These are not Gamut's — they exist because a
 * generator that owns the breakpoint list may as well publish it, and because
 * the oracle publishes them. Two categories, same five values. */
for (const [key, width] of Object.entries(viewportBreakpoints))
  tokenLines.push(`--breakpoints-${key}: ${width};`);
for (const [key, width] of Object.entries(viewportBreakpoints))
  tokenLines.push(`--sizes-breakpoint-${key}: ${width};`);

/* ── 2. the atomic rules ──────────────────────────────────────────────────────
 * Gamut's prop config has THREE property shapes; shape 3 (`property` is an
 * object keyed by mode) is the one that cost the oracle 720 silent classes. */
const cssPropertiesFor = ({ property, properties }) => {
  if (properties?.[MODE]?.length) return properties[MODE];
  if (typeof property === 'object' && property !== null) return [property[MODE]];
  return [property];
};

/* Panda sorts atomic rules by `getPropertyPriority(entry.prop)` — the *utility
 * key*, i.e. Gamut's prop name, not the CSS property it maps to. Priority is 0
 * for `all`, 2 if the key is a longhand of some CSS shorthand, else 1; the sort
 * is stable, so config order survives inside each bucket.
 *
 * Consequence, and it is pure accident: Gamut's abbreviated props (`mx`, `bg`)
 * are not CSS names, so they score 1, while the seven props whose names happen
 * to BE CSS longhands — fontFamily/fontWeight/fontSize/lineHeight (longhands of
 * `font`), rowGap/columnGap (of `gap`), borderColor (of `border`) — score 2 and
 * are moved to the end of the layer. `borderColorLeft` is a longhand in CSS but
 * not under that name, so it scores 1 and stays put.
 *
 * The table lives in `longhands.mjs` — 178 entries, vendored with provenance. */

export { LONGHAND_PROPS };

export const propertyPriority = (prop) => {
  if (prop === 'all') return 0;
  return LONGHAND_PROPS.has(prop) ? 2 : 1;
};

/** [{ prop, value, decls: [[cssProp, cssValue]] }], in emission order. */
export const baseRules = closedProps
  .map((config, index) => ({ config, index }))
  .sort(
    (a, b) =>
      propertyPriority(a.config.prop) - propertyPriority(b.config.prop) ||
      a.index - b.index
  )
  .flatMap(({ config }) => {
    const cssProperties = cssPropertiesFor(config);
    return Object.keys(scaleValues(config.scale)).map((value) => ({
      prop: config.prop,
      value,
      decls: cssProperties.map((cssProp) => [
        kebab(cssProp),
        `var(${varFor(config.scale, value)})`,
      ]),
    }));
  });

/* ── 3. serialize ─────────────────────────────────────────────────────────────
 * The oracle's formatting is PostCSS's stringifier under Panda's raws: selector
 * at depth×2 spaces, declarations one level deeper, and the closing brace at
 * column 0 regardless of depth. Base-layer children carry a leading blank line;
 * rules nested inside a media query do not. No trailing newline at EOF. */
const rule = (selector, decls, indent) =>
  `${' '.repeat(indent)}${selector} {\n` +
  decls.map(([p, v]) => `${' '.repeat(indent + 2)}${p}: ${v};\n`).join('') +
  `}\n`;

/** px → rem at a 16px root, matching what a breakpoint list should publish. */
const toRem = (px) => `${parseFloat(px) / 16}rem`;

const escapeSelector = (className) => `.${className.replace(/:/g, '\\:')}`;

export const emit = ({ responsive = RESPONSIVE } = {}) => {
  let css = '@layer reset, base, tokens, recipes, utilities;\n';
  css += '\n@layer base{\n' + rule(':root', [['--made-with-panda', "'🐼'"]], 2) + '}\n';
  css +=
    '\n@layer tokens{\n' +
    '  :where(:root, :host) {\n' +
    tokenLines.map((line) => `    ${line}\n`).join('') +
    '}\n}\n';

  css += '\n@layer utilities{\n';
  for (const { prop, value, decls } of baseRules)
    css += '\n' + rule(escapeSelector(`${prop}_${value}`), decls, 2);

  if (responsive)
    for (const [key, width] of Object.entries(viewportBreakpoints)) {
      css += `\n  @media screen and (min-width: ${toRem(width)}) {\n`;
      for (const { prop, value, decls } of baseRules)
        css += rule(escapeSelector(`${key}:${prop}_${value}`), decls, 4);
      css += '}\n';
    }

  css += '}';
  return css;
};

export const BASE_KEY = GAMUT_BASE_KEY;

// pathToFileURL, not string concat: base camp's path contains a space
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  mkdirSync('dist', { recursive: true });
  const base = emit({ responsive: false });
  const full = emit({ responsive: true });
  writeFileSync('dist/atomics-base.css', base);
  writeFileSync('dist/atomics.css', full);
  const rules = (s) => (s.match(/\{/g) || []).length;
  console.log(
    `emitted dist/atomics-base.css  ${base.length} bytes, ${baseRules.length} atomic rules\n` +
      `emitted dist/atomics.css       ${full.length} bytes, ${
        baseRules.length * (1 + Object.keys(viewportBreakpoints).length)
      } atomic rules (${rules(full)} blocks)`
  );
}
