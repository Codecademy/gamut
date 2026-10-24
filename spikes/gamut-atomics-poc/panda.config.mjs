import { defineConfig } from '@pandacss/dev';

import {
  GAMUT_BASE_KEY,
  SCALE_TO_PANDA_CATEGORY,
  closedProps,
  scaleValues,
  viewportBreakpoints,
} from './gamut-source.mjs';

/* ════════════════════════════════════════════════════════════════════════════
 * THE CLAIM UNDER TEST
 *
 * Gamut can drive Panda to emit prebuilt atomic classes for its OWN prop
 * vocabulary — `bg`, `p`, `mx`, `borderRadiusTopLeft` — rather than adopting
 * Panda's (`background`, `padding`, `mx`-as-Panda-defines-it). If that holds,
 * the ~99% of call sites that pass a closed value get zero-runtime CSS with no
 * call-site change, and the runtime injector shrinks to the open-value tail.
 *
 * `eject: true` is the load-bearing line. Panda's `preset-base` already defines
 * `bg`, `p`, `mx` and friends with ITS semantics — notably `bg` → `background`,
 * where Gamut's `bg` → `backgroundColor`. Inheriting those silently produces the
 * wrong CSS property, which is the same collision that produced
 * `.bg_primary { background: primary }` in PR #3405 §6.
 *
 * MEASURED THE HARD WAY: `presets: []` is NOT enough. Panda merges
 * `@pandacss/preset-base` + `@pandacss/preset-panda` in regardless, and only
 * `eject: true` opts out (`@pandacss/types/dist/config.d.ts:456`). With
 * `presets: []` alone this spike emitted `.bg_primary { background: … }` and
 * `.mx_16 { margin-inline: … }` — i.e. Panda's semantics under Gamut's prop
 * names, which is the exact failure mode the whole approach is meant to avoid,
 * and it fails SILENTLY.
 * ════════════════════════════════════════════════════════════════════════════ */

/* Gamut's default. `ATOMICS_MODE=physical` emits the other set, to size what
 * supporting both would cost. */
const PROPERTY_MODE =
  process.env.ATOMICS_MODE === 'physical' ? 'physical' : 'logical';

/* Gamut's config uses two shapes:
 *   { property: 'padding' }                              — one CSS property
 *   { property: 'margin', properties: { physical: [...],  — several, and it
 *                                       logical: [...] } }  varies by mode
 *
 * The second exists because Gamut supports logical properties (`useLogicalProperties`),
 * so `mx` is marginLeft/Right OR marginInlineStart/End at runtime. Atomics can't
 * be ambiguous, so this spike emits the PHYSICAL set and the README reports what
 * covering both would cost. */
const utilities = Object.fromEntries(
  closedProps.map(({ prop, property, properties, scale }) => {
    const category = SCALE_TO_PANDA_CATEGORY[scale];
    if (!category) throw new Error(`unmapped Gamut scale '${scale}' on '${prop}'`);

    /* GOTCHA, found by reading Panda's source: `PropertyConfig.property` is
     * documented as "the css property this utility maps to", but it is consumed
     * ONLY when generating TypeScript types
     * (`@pandacss/core/dist/index.js:3429` — `this.types.set(...)`). It has no
     * effect on emitted CSS. Without a `transform`, Panda uses the utility KEY as
     * the CSS property, so `bg` emitted `bg: …` and `p` emitted `p: …` — invalid
     * declarations the browser drops on the floor, silently.
     *
     * So every utility gets an explicit transform. Panda resolves the token
     * first, so `value` arrives as the `var(--spacing-16)` reference. */
    /* Gamut's config has THREE shapes, not two — the third cost this spike a
     * silent 16-prop hole before it was spotted:
     *
     *   1. { property: 'margin' }
     *        plain string, one CSS property.
     *   2. { property: 'margin',
     *        properties: { physical: ['marginLeft','marginRight'], logical: [...] } }
     *        several CSS properties, and which set depends on mode.
     *   3. { property: { physical: 'marginTop', logical: 'marginBlockStart' } }
     *        ONE property, but still mode-dependent — `property` is an OBJECT.
     *
     * Shape 3 covers `mt/mb/mr/ml`, `pt/pb/pr/pl`, `borderTop/Right/Bottom/Left`
     * and the four `borderRadius*Corner` props (16 of the 47). Treating its
     * `property` as a string yields `[object Object]` as the CSS property, which
     * Panda drops — no error, just 720 missing classes.
     *
     * MODE: Gamut defaults to LOGICAL properties — `variance/src/core.ts:150`
     * reads `useLogicalProperties ?? true`, so `mt` is `marginBlockStart`, not
     * `marginTop`. Emitting physical here produced atomics that silently did not
     * match what `css()` actually generates. Both modes are reachable at runtime,
     * which is why dual-mode support is a matrix multiplier — see the README. */
    const modeKey = PROPERTY_MODE;
    const cssProperties = properties?.[modeKey]?.length
      ? properties[modeKey]
      : typeof property === 'object' && property !== null
        ? [property[modeKey]]
        : [property];

    return [
      prop,
      {
        // class names carry GAMUT's prop name: `bg_primary`, `p_24`, `mx_16`
        className: prop,
        values: category,
        property,
        transform: (value) =>
          Object.fromEntries(cssProperties.map((cssProp) => [cssProp, value])),
      },
    ];
  })
);

/* Panda wants `{ [name]: { value } }`. Gamut's scales hold raw strings/numbers,
 * and some are numeric (`spacing[0]` is the number 0), hence String(). */
const tokensFor = (scale) =>
  Object.fromEntries(
    Object.entries(scaleValues(scale)).map(([name, value]) => [
      name,
      { value: String(value) },
    ])
  );

const usedScales = [...new Set(closedProps.map(({ scale }) => scale))];

const tokens = Object.fromEntries(
  usedScales.map((scale) => [SCALE_TO_PANDA_CATEGORY[scale], tokensFor(scale)])
);

/* Force-emit the whole closed matrix: every prop × every token value in its
 * scale × every breakpoint. `['*']` expands to all values of the utility's token
 * category, and `responsive: true` adds one rule per breakpoint.
 *
 * This has to be exhaustive rather than usage-driven — the point is that a class
 * exists regardless of what any given app, lazy chunk or federated remote happens
 * to render. Usage-driven extraction is what can't work across an MF boundary. */
/* ATOMICS_RESPONSIVE=0 emits the base layer only, which is the shape
 * `panda-via-gamut-option-a.md` §3 actually recommends ("prebuild the base
 * atomics, inject the long tail"). Default emits all five breakpoints so both
 * ends of the trade-off are measurable from one spike. */
const responsive = process.env.ATOMICS_RESPONSIVE !== '0';

/* `['*']` expands to every value of the utility's token category — but for the
 * spacing category Panda ALSO auto-emits negative variants (`.m_-4 { margin:
 * calc(var(--spacing-4) * -1) }`). Gamut's spacing scale has no negative keys, so
 * variance would reject `m={-4}` and those rules are dead weight: 1,020 of 8,730
 * rules, ~12% of the matrix.
 *
 * Listing the scale's real keys explicitly instead of `'*'` avoids them.
 * ATOMICS_STAR=1 restores `'*'` to measure the difference. */
const useStar = process.env.ATOMICS_STAR === '1';

const staticCss = {
  css: [
    {
      properties: Object.fromEntries(
        closedProps.map(({ prop, scale }) => [
          prop,
          useStar ? ['*'] : Object.keys(scaleValues(scale)),
        ])
      ),
      responsive,
    },
  ],
};

export default defineConfig({
  preflight: false,
  // see the header: `presets: []` alone still inherits Panda's defaults
  eject: true,
  presets: [],
  outdir: 'styled-system',
  /* Nothing to scan — every class comes from `staticCss`. Pointing the extractor
   * at real source is what mis-extracts Gamut's `css()` (PR #3405 §6). */
  include: ['./panda.config.mjs'],
  utilities,
  staticCss,
  theme: {
    // `extend` would merge into Panda's defaults; this replaces them outright
    tokens,
    breakpoints: viewportBreakpoints,
  },
});

export { GAMUT_BASE_KEY, utilities as gamutUtilities };
