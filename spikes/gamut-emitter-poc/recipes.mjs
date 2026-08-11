/* THE RECIPE TIER — a Gamut-owned replacement for Panda's `defineRecipe`, sized by
 * building it rather than by argument.
 *
 * Three parts, each measurable:
 *
 *   A. AUTHORING (unchanged, 0 lines of new code) — a faithful reproduction of
 *      `packages/gamut/src/Button/shared/{styles,variants}.ts`, executed against
 *      the REAL `variance` from `packages/variance/dist/core.js`. Reproduced
 *      rather than imported only because gamut-styles' dist ships no JS in this
 *      tree; every construct that defeats a static extractor is kept:
 *      `templateVariants` builds the config programmatically, selectors are
 *      computed enum keys, `transitionConcat()` is a call, and `textButton` has a
 *      ternary. Nothing here is parsed — it is EXECUTED.
 *
 *   B. PRECOMPUTE (`precompute`) — enumerate each style function's domain and
 *      collapse it into `{ className, base, variants, defaultVariants }`. This is
 *      the structure `panda-styling-poc` already hands to `defineRecipe`, so it is
 *      machinery Gamut owns either way. Not a cost of dropping Panda.
 *
 *   C. EMIT (`emitRecipeCss`) — the part Panda currently does. Flatten nested
 *      `&`-selectors, kebab-case, one class per variant key, force-emit the whole
 *      matrix. That is the honest size of the replacement.
 *
 * `verify-recipes.mjs` is the loud check: for every point in the variant matrix it
 * compares the cascade of emitted classes against the runtime deep merge.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

import {
  coreTheme,
  css,
  states,
  variant,
} from './dist/recipe-source.bundle.mjs';

/* ══ A. authoring, reproduced verbatim ═══════════════════════════════════════ */

/** `packages/gamut-styles/src/variables/timing.ts` — `fast: 150ms`. */
const timing = { fast: '150ms', slow: '300ms' };

/** `packages/gamut-styles/src/styles/transitionConcat.ts`, verbatim. */
const transitionConcat = (properties, transition, timingFn = 'linear') => {
  const suffix = `${timing[transition]} ${timingFn}`;
  return `${properties.join(` ${suffix},`)} ${suffix}`;
};

/** `packages/gamut/src/ButtonBase/ButtonBase.tsx` — computed selector keys. */
const ButtonSelectors = {
  HOVER: '&:hover',
  ACTIVE: '&:active',
  DISABLED: "[disabled], &:disabled, &[aria-disabled='true']",
  FOCUS_VISIBLE: '&:focus-visible',
  OUTLINE: '&:before',
  OUTLINE_FOCUS_VISIBLE: '&:focus-visible:before',
};

const buttonVariants = ['primary', 'secondary', 'danger', 'interface'];

/** `shared/styles.ts`, verbatim — builds the variant config PROGRAMMATICALLY. */
const templateVariants = (variants, template) => {
  const variantConfig = {};
  variants.forEach((key) => {
    variantConfig[key] = template(key);
  });
  return variant({ defaultVariant: variants[0], variants: variantConfig });
};

const hoverBackgroundTransition = transitionConcat(
  ['background-color', 'box-shadow'],
  'fast',
  'ease-in'
);

const buttonStyles = css({
  position: 'relative',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 2,
  borderRadius: 'md',
  borderColor: 'transparent',
  transition: transitionConcat(
    ['border-color', 'color', 'background-color', 'box-shadow'],
    'fast',
    'ease-in'
  ),
  [ButtonSelectors.DISABLED]: { cursor: 'not-allowed', userSelect: 'none' },
  [ButtonSelectors.OUTLINE]: {
    content: '""',
    transition: transitionConcat(['opacity'], 'fast'),
    position: 'absolute',
    borderRadius: 'lg',
    border: 2,
    inset: -5,
    opacity: 0,
    zIndex: 0,
  },
  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: { opacity: 1 },
});

const fillButtonVariants = templateVariants(buttonVariants, (v) => ({
  bg: v,
  color: 'background',
  [ButtonSelectors.OUTLINE]: { borderColor: v },
  [ButtonSelectors.HOVER]: {
    bg: `${v}-hover`,
    color: 'background',
    transition: hoverBackgroundTransition,
  },
  [ButtonSelectors.ACTIVE]: {
    borderColor: 'border-primary',
    bg: v,
    color: 'background',
  },
  [ButtonSelectors.DISABLED]: { color: 'text-disabled', bg: 'background-disabled' },
}));

const textButtonVariants = templateVariants(buttonVariants, (v) => ({
  borderColor: 'transparent',
  // the ternary a static extractor cannot fold
  color: v === 'interface' ? 'text' : v,
  [ButtonSelectors.HOVER]: {
    color: v,
    bg: 'background-hover',
    transition: hoverBackgroundTransition,
  },
  [ButtonSelectors.FOCUS_VISIBLE]: { color: v },
  [ButtonSelectors.OUTLINE]: { borderColor: v },
  [ButtonSelectors.ACTIVE]: { color: 'text' },
  [ButtonSelectors.DISABLED]: { color: 'text-disabled', bg: 'transparent' },
}));

const strokeButtonVariants = templateVariants(buttonVariants, (v) => ({
  borderColor: v,
  bg: 'transparent',
  color: v,
  [ButtonSelectors.HOVER]: { bg: 'background-hover', transition: hoverBackgroundTransition },
  [ButtonSelectors.OUTLINE]: { borderColor: v },
  [ButtonSelectors.ACTIVE]: { bg: v, color: 'background' },
  [ButtonSelectors.DISABLED]: {
    borderColor: 'background-disabled',
    color: 'text-disabled',
    bg: 'transparent',
  },
}));

/* `variant({ base })` — the folding path. `shared/variants.ts` really does this. */
const sizeVariants = variant({
  prop: 'size',
  defaultVariant: 'normal',
  base: { fontWeight: 'title' },
  variants: {
    normal: { fontSize: 16, height: 40, minWidth: 40, py: 4, px: 16 },
    small: { fontSize: 14, height: 32, minWidth: 32, py: 4, px: 8 },
    large: { fontSize: 18, height: 56, minWidth: 40, py: 4, px: 16 },
  },
});

const buttonStates = states({ fullWidth: { width: '100%' } });

/* The A22 fidelity probe: two states writing the SAME property. `states()`
 * deep-merges in declaration order; an emitter that writes one independent class
 * per active boolean lets STYLESHEET order decide. If those disagree it is a
 * silent visual regression. mono has 62 `states()` sites. */
const overlapStates = states({
  warning: { bg: 'yellow' },
  error: { bg: 'red' },
});

/* ══ B. precompute ═══════════════════════════════════════════════════════════ */

const isPlainObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const merge = (target, source) => {
  Object.entries(source ?? {}).forEach(([key, value]) => {
    target[key] =
      isPlainObject(value) && isPlainObject(target[key])
        ? merge({ ...target[key] }, value)
        : value;
  });
  return target;
};

const theme = coreTheme;

/* See the `variant({ base })` note in `precompute`. Default OFF: not folding is
 * strictly more faithful to the runtime, because it preserves layer order. */
export const FOLD_VARIANT_BASE = process.env.FOLD_VARIANT_BASE === '1';

/* `variantMeta`/`stateMeta` do NOT exist on shipping `variance` — the spike added
 * them on `cass-GMT-1715`. Here the descriptor carries them instead, which is the
 * same information from the other side. Either way it is ~6 lines in variance, and
 * it is required by the Panda route too: `generate.ts` reads exactly this. */
export const precompute = ({ className, layers }) => {
  const base = {};
  const variants = {};
  const defaultVariants = {};

  for (const layer of layers) {
    if (layer.kind === 'variant') {
      const { fn, prop, keys, defaultVariant, hasBase } = layer;
      variants[prop] ??= {};
      if (defaultVariant) defaultVariants[prop] = defaultVariant;

      /* `variant({ base })` contributes to every key, so fold it into `base` once
       * and subtract it from each key so it is not duplicated.
       *
       * DEFECT FOUND, and it is not hypothetical — `panda-styling-poc`'s
       * `src/precompute/generate.ts` (`cass-GMT-1715`) reads the base
       * contribution as `fn({ theme })`. But `createVariant` defaults the
       * selection (`variance/src/core.ts:266`: `{ [prop]: selected =
       * defaultVariant } = props`), so `fn({ theme })` returns
       * base ∪ defaultVariant — NOT base. Folding that into `base` moves the
       * default variant's declarations into the shared class and empties the
       * default key.
       *
       * It is invisible on Gamut's real `sizeVariants` only because all three
       * size keys set the identical property set, so the later class overwrites
       * every leaked declaration. Any variant where one key sets a property
       * another does not would leak that property onto every key. The spike never
       * saw it because its copy of `sizeVariants` dropped the `base` key that the
       * shipping one has (`packages/gamut/src/Button/shared/variants.ts:110`).
       *
       * Fix: select a key that cannot exist, so `variantFns[selected]` is
       * undefined and only `baseFn` contributes. */
      const NO_SUCH_VARIANT = ' none';
      const baseOnly = hasBase ? fn({ [prop]: NO_SUCH_VARIANT, theme }) : {};
      if (hasBase && FOLD_VARIANT_BASE) merge(base, baseOnly);

      for (const key of keys) {
        const withVariant = fn({ [prop]: key, theme });
        if (!FOLD_VARIANT_BASE) {
          /* Don't fold at all. A Gamut component composes SEVERAL style layers
           * (`createButtonComponent` = buttonStyles, colour variant, size variant,
           * states), each of which may carry its own `base`. Panda's
           * `defineRecipe` has exactly ONE `base` slot, so every layer's base must
           * be flattened into it — and that loses layer order: a later layer's
           * base is emitted BEFORE an earlier layer's variant class, inverting who
           * wins. Keeping the base inside each key costs duplication and preserves
           * order exactly.
           *
           * `FOLD_VARIANT_BASE=1` restores the folding, so `verify-recipes.mjs`
           * measures the difference instead of asserting it. On Gamut's real
           * Buttons the two agree — only because no colour variant sets
           * `fontWeight`, the single property `sizeVariants.base` declares. Luck,
           * not a guarantee. */
          variants[prop][key] = merge(variants[prop][key] ?? {}, withVariant);
          continue;
        }
        const only = {};
        for (const [cssProp, value] of Object.entries(withVariant))
          if (JSON.stringify(baseOnly[cssProp]) !== JSON.stringify(value))
            only[cssProp] = value;
        variants[prop][key] = merge(variants[prop][key] ?? {}, only);
      }
      continue;
    }

    if (layer.kind === 'states') {
      for (const key of layer.keys) {
        variants[key] ??= {};
        variants[key].true = merge(
          variants[key].true ?? {},
          layer.fn({ [key]: true, theme })
        );
      }
      continue;
    }

    merge(base, layer.fn({ theme }));
  }

  return { className, base, variants, defaultVariants };
};

const sizeLayer = {
  kind: 'variant',
  fn: sizeVariants,
  prop: 'size',
  keys: ['normal', 'small', 'large'],
  defaultVariant: 'normal',
  hasBase: true,
};
const statesLayer = { kind: 'states', fn: buttonStates, keys: ['fullWidth'] };
const colourLayer = (fn) => ({
  kind: 'variant',
  fn,
  prop: 'variant',
  keys: buttonVariants,
  defaultVariant: 'primary',
  hasBase: false,
});

export const descriptors = [
  {
    className: 'gmt-fill-button',
    layers: [
      { kind: 'css', fn: buttonStyles },
      colourLayer(fillButtonVariants),
      sizeLayer,
      statesLayer,
    ],
  },
  {
    className: 'gmt-text-button',
    layers: [
      { kind: 'css', fn: buttonStyles },
      colourLayer(textButtonVariants),
      sizeLayer,
      statesLayer,
    ],
  },
  {
    className: 'gmt-stroke-button',
    layers: [
      { kind: 'css', fn: buttonStyles },
      colourLayer(strokeButtonVariants),
      sizeLayer,
      statesLayer,
    ],
  },
  {
    className: 'gmt-overlap',
    layers: [{ kind: 'states', fn: overlapStates, keys: ['warning', 'error'] }],
  },
  /* ADVERSARIAL PROBE for the base-folding hazard. A colour variant that sets
   * `fontWeight`, composed with `sizeVariants` whose `base` also sets it — the
   * same shape as the real Buttons, minus the coincidence that saves them.
   *
   * Runtime order is colour-then-size, so size's base wins (`400`). Folding size's
   * base into the recipe's single `base` slot emits it BEFORE the colour class, so
   * the colour wins (`700`) — a different rendered weight, with no error.
   * `FOLD_VARIANT_BASE=1` makes `verify-recipes.mjs` fail on exactly this. */
  {
    className: 'gmt-fold-hazard',
    layers: [
      {
        ...colourLayer(
          templateVariants(['primary', 'secondary'], (v) => ({
            bg: v,
            fontWeight: 'title',
          }))
        ),
        keys: ['primary', 'secondary'],
      },
      {
        kind: 'variant',
        fn: variant({
          prop: 'size',
          defaultVariant: 'normal',
          base: { fontWeight: 400 },
          variants: { normal: { fontSize: 16 }, large: { fontSize: 18 } },
        }),
        prop: 'size',
        keys: ['normal', 'large'],
        defaultVariant: 'normal',
        hasBase: true,
      },
    ],
  },
];

export const recipes = descriptors.map(precompute);

/* ══ C. emit ═════════════════════════════════════════════════════════════════ */

const kebab = (prop) =>
  prop.startsWith('--') ? prop : prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/* Selector nesting, stylis/Emotion semantics — and this is where a naive emitter
 * gets it wrong. `&:hover` is self-attachment, but a comma-separated key like
 * `[disabled], &:disabled, &[aria-disabled='true']` mixes BOTH forms: the first
 * part has no `&`, so it is a DESCENDANT (`.cls [disabled]`), while the other two
 * attach. Splitting on the comma per part is mandatory; treating the whole key as
 * one selector, or prefixing `&` to it wholesale, silently changes which elements
 * get styled. */
export const resolveSelector = (parent, key) =>
  key
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      return trimmed.includes('&')
        ? trimmed.replace(/&/g, parent)
        : `${parent} ${trimmed}`;
    })
    .join(', ');

/** A CSSObject → [[selector, [[cssProp, value]]]] in declaration order. */
export const flatten = (selector, styles) => {
  const own = [];
  const nested = [];
  for (const [key, value] of Object.entries(styles ?? {})) {
    if (value === undefined || value === null) continue;
    if (isPlainObject(value)) {
      nested.push(...flatten(resolveSelector(selector, key), value));
      continue;
    }
    own.push([kebab(key), String(value)]);
  }
  return [...(own.length ? [[selector, own]] : []), ...nested];
};

const block = (selector, decls) =>
  `${selector} {\n${decls.map(([p, v]) => `  ${p}: ${v};\n`).join('')}}\n`;

/** The class a given variant key gets. Panda's shape: `cls--prop_key`. */
export const variantClass = (className, prop, key) => `${className}--${prop}_${key}`;

/* The RUNTIME half of the recipe tier: props in, class names out. This is what
 * Panda's generated `recipe()` function does, and it is the only place
 * `defaultVariants` matters — nothing about a default is emitted into CSS, so if
 * the runtime forgets to apply `--size_normal` when `size` is omitted, the
 * component renders unsized with no error. 12 lines. */
export const recipeClasses = (recipe, props = {}) => {
  const classNames = [recipe.className];
  for (const [prop, byKey] of Object.entries(recipe.variants)) {
    const selected = props[prop] ?? recipe.defaultVariants[prop];
    if (selected === undefined || selected === false) continue;
    const key = selected === true ? 'true' : String(selected);
    if (byKey[key]) classNames.push(variantClass(recipe.className, prop, key));
  }
  return classNames;
};

/* FORCE-EMISSION (U1). Every recipe emits its base class plus one class per
 * variant key — unconditionally, from the descriptor, with no reference to what
 * any app renders. That is what Module Federation requires: a host must style a
 * variant it never renders. There is no extractor here to switch off, so this is
 * satisfied by construction rather than by configuration. */
export const emitRecipeCss = (recipeList = recipes) => {
  let out = '';
  for (const { className, base, variants } of recipeList) {
    for (const [selector, decls] of flatten(`.${className}`, base))
      out += block(selector, decls);
    for (const [prop, byKey] of Object.entries(variants))
      for (const [key, styles] of Object.entries(byKey))
        for (const [selector, decls] of flatten(
          `.${variantClass(className, prop, key)}`,
          styles
        ))
          out += block(selector, decls);
  }
  return out;
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  mkdirSync('dist', { recursive: true });
  const out = emitRecipeCss();
  writeFileSync('dist/recipes.css', out);
  console.log('\nrecipe tier — variance authoring → static CSS, no Panda\n');
  for (const { className, base, variants, defaultVariants } of recipes) {
    const summary = Object.entries(variants)
      .map(([prop, keys]) => `${prop}(${Object.keys(keys).join('|')})`)
      .join(' ');
    console.log(
      `  .${className.padEnd(20)} base decls ${String(
        Object.keys(base).length
      ).padStart(2)}  variants ${summary}  defaults ${JSON.stringify(
        defaultVariants
      )}`
    );
  }
  console.log(
    `\n  wrote dist/recipes.css — ${(out.match(/\{/g) || []).length} rules, ${
      out.length
    } bytes`
  );
  console.log(`  authoring changes required: NONE\n`);
}
