/* DTCG JSON → CSS custom properties + TypeScript types + a Panda preset.
 *
 * Three consumers from one source is the whole point of "engine-neutral": if the
 * Panda preset is generated FROM the tokens rather than being where the tokens
 * live, then swapping the styling engine doesn't touch the token pipeline.
 *
 * One build per colour mode, because DTCG has no mode concept — see the long
 * comment in export-dtcg.mjs.
 */
import { mkdirSync } from 'node:fs';

import StyleDictionary from 'style-dictionary';

mkdirSync('dist', { recursive: true });

/* ── transforms ──────────────────────────────────────────────────────────────
 * Deliberately NOT using the `css` transform group. It bundles opinionated
 * conversions (px→rem among them) that would silently change values, and this
 * spike's entire claim is value parity with what Gamut emits today. Hand-rolled
 * transforms keep the output predictable. */

/* DTCG dimension values are `{ value, unit }` objects, so something has to
 * reassemble the CSS string. This is the round-trip `verify.mjs` checks: Gamut's
 * `spacing[0]` is the bare number `0`, which becomes `{value:0,unit:'px'}` and
 * comes back out as `0px` — equivalent CSS, but not the same string. */
StyleDictionary.registerTransform({
  name: 'gamut/dimension',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'dimension',
  transform: (token) => {
    const { value, unit } = token.$value;
    return `${value}${unit}`;
  },
});

/* Everything else is already a plain scalar — hex, number, font stack. Pass it
 * through untouched rather than let a transform group reformat it. */
StyleDictionary.registerTransform({
  name: 'gamut/scalar',
  type: 'value',
  transitive: true,
  filter: (token) =>
    ['color', 'number', 'fontWeight', 'fontFamily'].includes(token.$type),
  transform: (token) => String(token.$value),
});

/* Gamut's variables are `--color-navy-800`, `--spacing-24`: the token path joined
 * with `-`. Path segments are already lower-case, so no case munging — which
 * matters, because `headerHeight` must stay camel to match
 * `--elements-headerHeight`. */
StyleDictionary.registerTransform({
  name: 'gamut/name',
  type: 'name',
  transform: (token) => token.path.join('-'),
});

/* ── the TypeScript consumer ─────────────────────────────────────────────────
 * A custom format, because Style Dictionary's built-in `typescript/es6-declarations`
 * and `javascript/esm` cannot express Gamut's token names. Both emit
 * `export const <name>`, and Gamut's names are not valid JS identifiers:
 * `navy-800`, `0`, `400`, `spacing-24`. Prettier (bundled inside SD) throws
 * outright on the generated file.
 *
 * The usual escape is the `name/camel` transform — but `navy-800` → `navy800`
 * changes the token's NAME, and name parity is precisely what "verify parity with
 * today's typed tokens" is asking about: `keyof theme.colors` has to keep
 * yielding `'navy-800'`. So: an object literal with quoted keys, `as const`, and
 * a union type derived from it. */
StyleDictionary.registerFormat({
  name: 'gamut/ts-tokens',
  format: ({ dictionary }) => {
    const byCategory = {};
    for (const token of dictionary.allTokens) {
      const [category] = token.path;
      const key = token.path.slice(1).join('-');
      (byCategory[category] ??= {})[key] = token.$value ?? token.value;
    }

    const body = Object.entries(byCategory)
      .map(([category, entries]) => {
        const pairs = Object.entries(entries)
          .map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
          .join('\n');
        return `  ${JSON.stringify(category)}: {\n${pairs}\n  },`;
      })
      .join('\n');

    const unions = Object.keys(byCategory)
      .map((category) => {
        const type = category[0].toUpperCase() + category.slice(1);
        return `export type ${type}Token = keyof typeof tokens[${JSON.stringify(
          category
        )}];`;
      })
      .join('\n');

    return [
      '// GENERATED from DTCG tokens by build.mjs — do not edit.',
      '',
      'export const tokens = {',
      body,
      '} as const;',
      '',
      unions,
      '',
    ].join('\n');
  },
});

/* ── the Panda consumer ──────────────────────────────────────────────────────
 * Emits a `definePreset`-shaped object. Values are `var(--x)` references rather
 * than raw hex, exactly as Gamut's theme does today — which is what keeps colour
 * mode working by variable reassignment instead of duplicated atomic classes. */
StyleDictionary.registerFormat({
  name: 'gamut/panda-preset',
  format: ({ dictionary }) => {
    const byCategory = {};
    for (const token of dictionary.allTokens) {
      const [category] = token.path;
      const key = token.path.slice(1).join('-');
      const bucket = (byCategory[category] ??= {});
      bucket[key] = { value: `var(--${token.name})` };
    }
    return `${[
      '// GENERATED from DTCG tokens by build.mjs — do not edit.',
      '// One of three consumers of the same source; see README.',
      `export const gamutPreset = ${JSON.stringify(
        { theme: { tokens: byCategory } },
        null,
        2
      )};`,
      '',
    ].join('\n')}`;
  },
});

/** Where the mode's variables get scoped. Matches Gamut's own selectors. */
const SELECTOR = {
  light: ':root, [data-color-mode=light]',
  dark: '[data-color-mode=dark]',
};

const transforms = ['gamut/dimension', 'gamut/scalar', 'gamut/name'];

const buildMode = async (mode) => {
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent', warnings: 'disabled' },
    source: [
      'tokens/palette.json',
      'tokens/dimension.json',
      `tokens/semantic.${mode}.json`,
    ],
    platforms: {
      css: {
        transforms,
        buildPath: 'dist/',
        files: [
          {
            destination: `tokens.${mode}.css`,
            format: 'css/variables',
            /* Emit `var(--color-navy-800)` for aliases instead of inlining the
             * hex. This is what makes an attribute flip re-theme the page, and
             * it's how Gamut's alias blocks already work. */
            options: { outputReferences: true, selector: SELECTOR[mode] },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
};

/* Types and the Panda preset are mode-independent — the NAMES are identical
 * across modes, only the values differ — so they're built once, from light. */
const buildShared = async () => {
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent', warnings: 'disabled' },
    source: [
      'tokens/palette.json',
      'tokens/dimension.json',
      'tokens/semantic.light.json',
    ],
    platforms: {
      ts: {
        transforms,
        buildPath: 'dist/',
        files: [
          { destination: 'tokens.ts', format: 'gamut/ts-tokens' },
          // JSON keys are quoted, so this built-in survives Gamut's token names
          { destination: 'flat.json', format: 'json/flat' },
        ],
      },
      panda: {
        transforms,
        buildPath: 'dist/',
        files: [
          { destination: 'panda-preset.mjs', format: 'gamut/panda-preset' },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
};

await buildMode('light');
await buildMode('dark');
await buildShared();

console.log('\nbuilt from tokens/ →');
for (const f of [
  'tokens.light.css',
  'tokens.dark.css',
  'tokens.ts',
  'flat.json',
  'panda-preset.mjs',
])
  console.log(`  dist/${f}`);
