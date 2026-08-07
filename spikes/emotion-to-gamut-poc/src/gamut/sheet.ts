import type { CSSObject } from '@codecademy/variance';

/* The ONLY piece that replaces Emotion: turn a resolved style object into a class
 * name and get the rule into the page. Everything else in the pipeline —
 * `css()`, `variant()`, `states()`, system props — is the real `variance` code,
 * reused untouched. That is why call sites don't have to change. */

// FNV-1a. Stable across server and client, so class names can't mismatch.
const hash = (input: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
};

const kebab = (prop: string) =>
  prop.startsWith('--')
    ? prop
    : prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// properties that take a bare number; everything else gets `px`, as Emotion does
const UNITLESS = new Set([
  'animationIterationCount',
  'aspectRatio',
  'columnCount',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'gridColumn',
  'gridRow',
  'lineHeight',
  'opacity',
  'order',
  'zIndex',
  'zoom',
]);

const value = (prop: string, raw: string | number) =>
  typeof raw === 'number' && raw !== 0 && !UNITLESS.has(prop)
    ? `${raw}px`
    : String(raw);

type Block = { at: string[]; selector: string; decls: string[] };

// `&:hover` keeps its anchor; a bare `> li` nests as a descendant, as stylis does
const nest = (key: string, parent: string) =>
  key.includes('&') ? key.replace(/&/g, parent) : `${parent} ${key}`;

/* Flattens a nested CSSObject into ordered blocks. Nested objects are either
 * at-rules (`@media`) or selectors — the only two shapes `variance` emits. */
const serialize = (
  styles: CSSObject,
  selector = '&',
  at: string[] = [],
  out: Block[] = []
): Block[] => {
  const decls: string[] = [];

  Object.entries(styles).forEach(([key, raw]) => {
    if (raw === undefined || raw === null || raw === '') return;

    if (typeof raw === 'object') {
      if (Array.isArray(raw)) return;
      if (key.startsWith('@'))
        serialize(raw as CSSObject, selector, [...at, key], out);
      else serialize(raw as CSSObject, nest(key, selector), at, out);
      return;
    }

    decls.push(`${kebab(key)}:${value(key, raw as string | number)}`);
  });

  if (decls.length) out.push({ at, selector, decls });
  return out;
};

const cssText = (blocks: Block[], className: string) =>
  blocks
    .map(({ at, selector, decls }) => {
      const body = `${selector.replace(/&/g, `.${className}`)}{${decls.join(
        ';'
      )}}`;
      return at.reduceRight((inner, rule) => `${rule}{${inner}}`, body);
    })
    .join('');

const rules = new Map<string, string>();
const inSheet = new Set<string>();
let sheetEl: HTMLStyleElement | undefined;

const element = () => {
  if (sheetEl) return sheetEl;
  sheetEl = document.createElement('style');
  sheetEl.setAttribute('data-gamut', '');
  document.head.appendChild(sheetEl);
  return sheetEl;
};

/** Resolved styles in, class name out. Each unique rule is inserted exactly once. */
export const inject = (styles: CSSObject): string => {
  const blocks = serialize(styles);
  if (!blocks.length) return '';

  // hash the declarations, so structurally identical styles share one class
  const canonical = blocks
    .map(
      ({ at, selector, decls }) =>
        `${at.join('')}${selector}{${decls.join(';')}}`
    )
    .join('');
  const className = `gmt-${hash(canonical)}`;

  if (!rules.has(className)) rules.set(className, cssText(blocks, className));
  if (!inSheet.has(className)) {
    inSheet.add(className);
    element().appendChild(document.createTextNode(rules.get(className)!));
  }

  return className;
};

/** Everything emitted so far — used by the page to show the generated CSS. */
export const allRules = () => [...rules.entries()];

/* ── Replacing Emotion's last two APIs ───────────────────────────────────────
 * `<Global>` and `keyframes()` are the only Emotion features Gamut uses that the
 * rest of this PoC doesn't already cover. Both fall out of the same serializer —
 * they just skip the class-scoping step. */

const insertOnce = (key: string, text: string) => {
  if (rules.has(key)) return;
  rules.set(key, text);
  inSheet.add(key);
  element().appendChild(document.createTextNode(text));
};

/**
 * Replaces Emotion's `<Global styles={…} />` (10 references in packages/*).
 *
 * Top-level keys are REAL selectors rather than being scoped to a generated
 * class — that's the only difference from `inject`.
 */
export const injectGlobal = (styles: CSSObject) => {
  const blocks: Block[] = [];

  Object.entries(styles).forEach(([selector, declarations]) => {
    if (declarations && typeof declarations === 'object') {
      serialize(declarations as CSSObject, selector, [], blocks);
    }
  });

  if (!blocks.length) return;
  // no `&` in a global selector, so the className argument is never substituted
  const text = cssText(blocks, 'global');
  insertOnce(`global-${hash(text)}`, text);
};

/**
 * Replaces Emotion's `keyframes` (5 references in packages/*).
 *
 * Returns the generated animation NAME, so it drops into either shape Emotion
 * supports: `animationName: spin` or `` animation: `${spin} 1s linear` ``.
 */
export const keyframes = (frames: CSSObject): string => {
  const body = Object.entries(frames)
    .map(([step, declarations]) => {
      const blocks = serialize(declarations as CSSObject, step, []);
      return cssText(blocks, 'kf');
    })
    .join('');

  const name = `gmt-kf-${hash(body)}`;
  insertOnce(name, `@keyframes ${name}{${body}}`);
  return name;
};
