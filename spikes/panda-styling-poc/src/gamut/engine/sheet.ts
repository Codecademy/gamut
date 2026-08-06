import type { CSSObject } from '@codecademy/variance';

/* The injection layer — the ONLY piece that replaces Emotion. Everything else in
 * the pipeline (variance's css/variant/states and the system-prop parsers) is
 * reused unchanged, which is why consumer call sites don't have to move.
 * Panda still owns tokens + Gamut's own component CSS; this handles the residue
 * that a static extractor provably cannot see (consumer-authored values). */

// FNV-1a. Must be stable across server and client or SSR markup won't hydrate.
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

/* Properties that take a bare number. Everything else gets `px` when handed a
 * number — matching Emotion exactly, so migrated call sites that lean on
 * `padding: 4` meaning `4px` keep rendering identically. */
const UNITLESS = new Set([
  'animationIterationCount',
  'aspectRatio',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'columns',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridArea',
  'gridRow',
  'gridRowEnd',
  'gridRowStart',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnStart',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'scale',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity',
  'floodOpacity',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
]);

const declValue = (prop: string, raw: string | number) =>
  typeof raw === 'number' && raw !== 0 && !UNITLESS.has(prop)
    ? `${raw}px`
    : String(raw);

type Block = { at: string[]; selector: string; decls: string[] };

// `&:hover` keeps its anchor; a bare `> li` nests as a descendant, as stylis does
const nest = (key: string, parent: string) =>
  key.includes('&') ? key.replace(/&/g, parent) : `${parent} ${key}`;

/* Flattens a (possibly deeply nested) CSSObject into ordered blocks. Nested
 * objects are either at-rules (`@media`, `@supports`, `@container`) or selectors
 * — the same two cases variance's `css()` already emits, so anything authorable
 * today survives the round trip. */
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
      if (key.startsWith('@')) {
        serialize(raw as CSSObject, selector, [...at, key], out);
      } else {
        serialize(raw as CSSObject, nest(key, selector), at, out);
      }
      return;
    }

    decls.push(`${kebab(key)}:${declValue(key, raw as string | number)}`);
  });

  if (decls.length) out.push({ at, selector, decls });
  return out;
};

/* Mirrors gamut's `focusVisible` stylis plugin
 * (packages/gamut-styles/src/cache/stylisPlugins/focusVisible.ts): pair every
 * `:focus-visible` rule with a `[data-focus-visible-added]` copy so the existing
 * JS polyfill keeps working after Emotion is gone. */
const withFocusVisible = (selector: string) =>
  selector.includes(':focus-visible')
    ? `${selector}, ${selector.replace(
        /:focus-visible/g,
        '[data-focus-visible-added]'
      )}`
    : selector;

const cssText = (blocks: Block[], className: string) =>
  blocks
    .map(({ at, selector, decls }) => {
      const body = `${withFocusVisible(
        selector.replace(/&/g, `.${className}`)
      )}{${decls.join(';')}}`;
      return at.reduceRight((inner, rule) => `${rule}{${inner}}`, body);
    })
    .join('');

/* Cascade: Gamut's own Panda-generated CSS lives in earlier layers, so consumer
 * overrides in this layer win without specificity hacks or !important. Declared
 * order in globals.css is what makes that deterministic. */
const LAYER = 'gamut.consumer';

const inserted = new Set<string>();
const collected: string[] = [];
let sheetEl: HTMLStyleElement | undefined;

const element = (nonce?: string) => {
  if (sheetEl) return sheetEl;
  const found = document.querySelector<HTMLStyleElement>('style[data-gamut]');
  if (found) {
    sheetEl = found;
    // adopt rules already delivered by SSR so we never double-insert
    found.textContent
      ?.match(/\.gmt-[a-z0-9]+/g)
      ?.forEach((match) => inserted.add(match.slice(1)));
    return found;
  }
  const created = document.createElement('style');
  created.setAttribute('data-gamut', '');
  if (nonce) created.setAttribute('nonce', nonce);
  document.head.appendChild(created);
  sheetEl = created;
  return created;
};

const append = (text: string, nonce?: string) => {
  const node = element(nonce);
  try {
    // insertRule is markedly faster; @layer blocks are a single rule here
    node.sheet?.insertRule(text, node.sheet.cssRules.length);
  } catch {
    node.appendChild(document.createTextNode(text));
  }
};

/**
 * Turns a resolved CSSObject into a class name, inserting the rule once.
 * Deterministic: identical styles always produce the identical class, on both
 * server and client, so SSR needs no cache handoff and cannot mismatch.
 */
export const inject = (styles: CSSObject, nonce?: string): string => {
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

  if (inserted.has(className)) return className;
  inserted.add(className);

  const text = `@layer ${LAYER}{${cssText(blocks, className)}}`;
  if (typeof document === 'undefined') collected.push(text);
  else append(text, nonce);

  return className;
};

/**
 * SSR: everything rendered so far, as CSS text for a single `<style>` tag.
 * Replaces Emotion's `extractCriticalToChunks` + injected-cache dance — no
 * per-request cache object, so `GamutProvider`'s `cache` prop becomes a no-op.
 */
export const extractStyles = () => {
  const text = collected.join('');
  collected.length = 0;
  inserted.clear();
  return text;
};

// test/measurement seam — lets the harness count rules without a DOM
export const __rules = () => [...inserted];
