import { adminTheme } from '@codecademy/gamut-styles/dist/themes/admin';
import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import { lxStudioTheme } from '@codecademy/gamut-styles/dist/themes/lxStudio';
import { percipioTheme } from '@codecademy/gamut-styles/dist/themes/percipio';
import { platformTheme } from '@codecademy/gamut-styles/dist/themes/platform';
import { defineConfig, defineRecipe } from '@pandacss/dev';

/* ════════════════════════════════════════════════════════════════════════════
 * PANDA'S TWO JOBS HERE
 *
 *   1. Emit every Gamut design token as a CSS variable — for all five themes,
 *      in both colour modes.
 *   2. Emit static, zero-runtime CSS for Gamut's own components (recipes).
 *
 * Both are INTERNAL. Nothing in this file is visible to a consumer, which is the
 * whole point: Panda does real work without the external styling API changing.
 *
 * Every value is read from the REAL Gamut themes, so these are production values.
 * ════════════════════════════════════════════════════════════════════════════ */

type GamutTheme = {
  modes: Record<'light' | 'dark', Record<string, string>>;
  _variables: { root: Record<string, unknown> };
  spacing: Record<string, string | number>;
  borderRadii: Record<string, string>;
  fontSize: Record<string, string>;
};

const THEMES = {
  core: coreTheme,
  admin: adminTheme,
  platform: platformTheme,
  lxStudio: lxStudioTheme,
  percipio: percipioTheme,
} as unknown as Record<string, GamutTheme>;

const core = THEMES.core;

/* ── Reading the palette out of a theme ──────────────────────────────────────
 * `_variables.root` is a mixed bag, not just colours: it also holds element
 * variables (`--elements-headerHeight`) and even responsive blocks keyed by a
 * media query whose value is an OBJECT. Take only flat declarations. */
const paletteOf = (theme: GamutTheme) =>
  Object.fromEntries(
    Object.entries(theme._variables.root).filter(
      ([, value]) => typeof value === 'string' || typeof value === 'number'
    )
  ) as Record<string, string>;

/* Core's palette is NOT a superset of the others. lxStudio and percipio add their
 * own tokens (`--color-percipioTextPrimary`, `--color-lxStudioSuccess`,
 * `--color-sapphire`, plus code-editor colours) and their alias blocks reference
 * them — emitting only Core's left 33 variables dangling and silently unstyled.
 *
 * So: emit the UNION at `:root`, then per-theme overrides for any token whose
 * value actually differs. Core is merged last so it wins ties. */
const unionPalette: Record<string, string> = Object.assign(
  {},
  ...Object.keys(THEMES)
    .filter((name) => name !== 'core')
    .map((name) => paletteOf(THEMES[name])),
  paletteOf(core)
);

const paletteOverrides = (name: string) =>
  Object.fromEntries(
    Object.entries(paletteOf(THEMES[name])).filter(
      ([token, value]) => unionPalette[token] !== value
    )
  );

/* ── Mapping Gamut's themes ──────────────────────────────────────────────────
 * Gamut's theme object stores colours as CSS-variable REFERENCES:
 * `coreTheme.colors.primary` is literally the string `var(--color-primary)`. So
 * `variance` never handles a hex value — it emits that reference, and something
 * has to DEFINE it. Today a React `<Variables>` component does, at runtime.
 * Here Panda does, at build time.
 *
 * A theme is just a different set of ALIAS ASSIGNMENTS over the same palette:
 * Core's light `primary` is `hyper-500`, Admin's is `blue-500`. So switching
 * theme or colour mode is an attribute flip — no restyle, no rebuild. */
const aliases = (name: string, mode: 'light' | 'dark') =>
  Object.fromEntries(
    Object.entries(THEMES[name].modes[mode]).map(([alias, token]) => [
      `--color-${alias}`,
      `var(--color-${token})`,
    ])
  );

/* `data-theme` sits on an outer element while `data-color-mode` can be on a
 * NESTED one, so the two can't be a single compound selector. Each block matches
 * both the descendant case and the same-element case. */
const themeBlocks = Object.keys(THEMES).reduce<Record<string, unknown>>(
  (blocks, name) => {
    const overrides = paletteOverrides(name);
    if (Object.keys(overrides).length) blocks[`[data-theme=${name}]`] = overrides;

    (['light', 'dark'] as const).forEach((mode) => {
      blocks[
        `[data-theme=${name}] [data-color-mode=${mode}],` +
          `[data-theme=${name}][data-color-mode=${mode}]`
      ] = aliases(name, mode);
    });

    return blocks;
  },
  {}
);

/* ── Tokens Panda owns as real tokens ───────────────────────────────────────── */

// String() because some scales hold numbers (`spacing[0]` is literally `0`)
const asTokens = (obj: Record<string, string | number>) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, { value: String(v) }])
  );

// Panda wants token names (`navy-800`); the variables are keyed `--color-navy-800`
const paletteTokens = Object.fromEntries(
  Object.entries(unionPalette)
    .filter(([name]) => name.startsWith('--color-'))
    .map(([name, value]) => [name.replace(/^--color-/, ''), value])
);

/* ── A Gamut component as a Panda recipe ─────────────────────────────────────
 * The half a consumer never sees, and the half that becomes zero-runtime static
 * CSS. `staticCss` force-emits every variant so the classes exist regardless of
 * what any given build happens to render — which is what makes this safe across
 * lazy-loaded and federated boundaries. */
const strokeButton = defineRecipe({
  className: 'gmt-stroke-button',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '[2px]',
    borderStyle: 'solid',
    borderRadius: '[var(--radius-md)]',
    cursor: 'pointer',
    background: '[transparent]',
    font: 'inherit',
  },
  variants: {
    variant: {
      primary: {
        borderColor: '[var(--color-primary)]',
        color: '[var(--color-primary)]',
        _hover: { background: '[var(--color-background-hover)]' },
      },
      danger: {
        borderColor: '[var(--color-danger)]',
        color: '[var(--color-danger)]',
        _hover: { background: '[var(--color-background-hover)]' },
      },
    },
    size: {
      small: { padding: '[4px 8px]', fontSize: '[0.875rem]' },
      normal: { padding: '[8px 16px]', fontSize: '[1rem]' },
    },
  },
  defaultVariants: { variant: 'primary', size: 'normal' },
});

export default defineConfig({
  preflight: false,

  /* Keep preset-base (utilities + conditions) but DROP preset-panda, whose default
   * palette (rose/fuchsia/violet/…) Gamut never uses. It accounted for more than
   * half the emitted CSS. Gamut's tokens are the design system here. */
  presets: ['@pandacss/preset-base'],

  outdir: 'styled-system',
  jsxFramework: 'react',

  /* IMPORTANT — Panda must NOT scan the app source.
   *
   * Gamut's `css()` and Panda's `css()` are different functions with the same
   * name. Point Panda's extractor at files using Gamut's and it cheerfully
   * "extracts" them, emitting nonsense: `.bg_primary { background: primary }`,
   * `.pos_left { position: left }` (from `variant()` KEYS), `.__43 { _: 43px }`
   * (from responsive `{ _: 43 }` values). Nothing references those classes, so it
   * renders fine — it just silently inflated the stylesheet from 11kB to 27kB.
   *
   * Panda needs to scan nothing here: recipes are declared in this config and
   * `staticCss` force-emits them. If a consumer ever DOES want Panda to extract
   * their own call sites, `importMap` is the supported way to tell the two
   * `css` functions apart. */
  include: ['./panda.config.ts'],

  staticCss: { recipes: { strokeButton: ['*'] } },

  theme: {
    extend: {
      tokens: {
        colors: asTokens(paletteTokens),
        spacing: asTokens(core.spacing),
        radii: asTokens(core.borderRadii),
        fontSizes: asTokens(core.fontSize),
      },
      recipes: { strokeButton },
    },
  },

  /* Cast because these blocks are built dynamically from the themes — Panda types
   * globalCss for hand-written style objects, not generated maps of custom
   * properties. The values are plain CSS variable declarations. */
  globalCss: {
    // the palette union, once
    ':root': {
      ...unionPalette,
      '--radius-md': core.borderRadii.md,
    } as never,
    // Core light as the default, so an app with no `data-theme` still works
    ':root, [data-color-mode=light]': aliases('core', 'light') as never,
    '[data-color-mode=dark]': aliases('core', 'dark') as never,
    // then every theme (+ its palette overrides) x colour mode
    ...(themeBlocks as Record<string, never>),
  },
});
