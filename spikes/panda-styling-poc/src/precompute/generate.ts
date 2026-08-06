import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import type { CSSObject } from '@codecademy/variance';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { declValue } from '../gamut/engine';
import {
  buttonStates,
  buttonStyles,
  fillButtonVariants,
  sizeVariants,
  textButtonVariants,
} from './authoring';

/* PRECOMPUTE: turn unchanged variance authoring into static Panda recipes by
 * EXECUTING it, not parsing it.
 *
 * This is the whole idea. A parse-based codemod fails on authoring.ts because of
 * `templateVariants`, computed enum keys, `transitionConcat()` calls and ternaries.
 * Running the code sidesteps every one of those, because by the time we see the
 * result it's a plain CSSObject.
 *
 * Enumerating the prop space is possible only because props.ts attaches
 * `variantMeta`/`stateMeta` — variance otherwise closes over its config.
 *
 * Run: yarn nx run panda-styling-poc:precompute */

type Meta = {
  variantMeta?: {
    prop: string;
    keys: string[];
    defaultVariant?: string;
    hasBase: boolean;
  };
  stateMeta?: { keys: string[] };
};
type StyleFn = ((props: Record<string, unknown>) => CSSObject) & Meta;

const theme = coreTheme as unknown as Record<string, unknown>;

const isPlainObject = (value: unknown): value is CSSObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const merge = (target: CSSObject, source: CSSObject): CSSObject => {
  Object.entries(source).forEach(([key, value]) => {
    const existing = (target as Record<string, unknown>)[key];
    (target as Record<string, unknown>)[key] =
      isPlainObject(value) && isPlainObject(existing)
        ? merge({ ...existing }, value)
        : value;
  });
  return target;
};

type Recipe = {
  className: string;
  base: CSSObject;
  variants: Record<string, Record<string, CSSObject>>;
  defaultVariants: Record<string, string>;
};

/**
 * Executes each style function across its whole domain:
 *  - a `variant()` fn is called once per variant key
 *  - a `states()` fn is called once per state, becoming a Panda boolean variant
 *  - anything else is base styles
 */
const precompute = (className: string, fns: StyleFn[]): Recipe => {
  const base: CSSObject = {};
  const variants: Record<string, Record<string, CSSObject>> = {};
  const defaultVariants: Record<string, string> = {};

  fns.forEach((fn) => {
    if (fn.variantMeta) {
      const { prop, keys, defaultVariant, hasBase } = fn.variantMeta;
      variants[prop] ??= {};
      if (defaultVariant) defaultVariants[prop] = defaultVariant;

      // `variant({ base })` contributes to every key, so fold it into base once
      if (hasBase) merge(base, fn({ theme }));

      keys.forEach((key) => {
        const withVariant = fn({ [prop]: key, theme });
        const withoutVariant = hasBase ? fn({ theme }) : {};
        // subtract the base contribution so it isn't duplicated per variant
        const only: CSSObject = {};
        Object.entries(withVariant).forEach(([prop2, value]) => {
          const baseValue = (withoutVariant as Record<string, unknown>)[prop2];
          if (JSON.stringify(baseValue) !== JSON.stringify(value)) {
            (only as Record<string, unknown>)[prop2] = value;
          }
        });
        variants[prop][key] = merge(variants[prop][key] ?? {}, only);
      });
      return;
    }

    if (fn.stateMeta) {
      // boolean state props map onto Panda's `variants: { x: { true: {...} } }`
      fn.stateMeta.keys.forEach((key) => {
        variants[key] ??= {};
        variants[key].true = merge(
          variants[key].true ?? {},
          fn({ [key]: true, theme })
        );
      });
      return;
    }

    merge(base, fn({ theme }));
  });

  return { className, base, variants, defaultVariants };
};

/* Everything variance emits is already resolved CSS (`var(--color-primary)`,
 * `1rem`), i.e. POST token resolution. Under `strictTokens` Panda rejects raw
 * values on tokenised properties, so wrap them in its arbitrary-value syntax.
 * Consequence, accepted deliberately: Panda's token layer is bypassed for
 * internals and Gamut keeps owning tokens + color-mode variables — which is also
 * what keeps nested <Background> correct. */
const escapeValues = (styles: CSSObject): CSSObject => {
  const out: Record<string, unknown> = {};
  Object.entries(styles).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      out[key] = escapeValues(value);
      return;
    }
    if (value === undefined || value === null) return;
    // declValue is shared with the runtime injector so the two paths can't drift
    out[key] = `[${declValue(key, value as string | number)}]`;
  });
  return out as CSSObject;
};

const serialize = (value: unknown, indent = 2): string => {
  const pad = ' '.repeat(indent);
  if (isPlainObject(value)) {
    const entries = Object.entries(value).map(
      ([key, inner]) =>
        `${pad}  ${JSON.stringify(key)}: ${serialize(inner, indent + 2)}`
    );
    return `{\n${entries.join(',\n')}\n${pad}}`;
  }
  return JSON.stringify(value);
};

const emit = (name: string, recipe: Recipe) => `
export const ${name} = defineRecipe(${serialize(
  {
    className: recipe.className,
    base: escapeValues(recipe.base),
    variants: Object.fromEntries(
      Object.entries(recipe.variants).map(([prop, keys]) => [
        prop,
        Object.fromEntries(
          Object.entries(keys).map(([key, styles]) => [
            key,
            escapeValues(styles),
          ])
        ),
      ])
    ),
    defaultVariants: recipe.defaultVariants,
  },
  0
)} as RecipeConfig);
`;

const recipes = {
  generatedFillButton: precompute('gmt-gen-fill-button', [
    buttonStyles as StyleFn,
    fillButtonVariants as StyleFn,
    sizeVariants as StyleFn,
    buttonStates as StyleFn,
  ]),
  generatedTextButton: precompute('gmt-gen-text-button', [
    buttonStyles as StyleFn,
    textButtonVariants as StyleFn,
    sizeVariants as StyleFn,
    buttonStates as StyleFn,
  ]),
};

const header = `/* GENERATED by src/precompute/generate.ts — do not edit.
 *
 * Produced by EXECUTING the unchanged variance authoring in ./authoring.ts and
 * enumerating its variant/state space. The authoring file keeps
 * \`templateVariants\`, computed enum keys, \`transitionConcat()\` and ternaries —
 * none of which a parse-based codemod could handle. */
import { defineRecipe } from '@pandacss/dev';

type RecipeConfig = Parameters<typeof defineRecipe>[0];
`;

const body = Object.entries(recipes)
  .map(([name, recipe]) => emit(name, recipe))
  .join('');

// resolved from cwd, not __dirname — this runs from a bundle in .proof/
const outPath = join(process.cwd(), 'src/precompute/generated-recipes.ts');
writeFileSync(outPath, `${header}${body}`);

/* eslint-disable no-console */
console.log(
  '\n=== Precompute: variance authoring -> static Panda recipes ===\n'
);
Object.entries(recipes).forEach(([name, recipe]) => {
  const variantSummary = Object.entries(recipe.variants)
    .map(([prop, keys]) => `${prop}(${Object.keys(keys).join('|')})`)
    .join(' ');
  console.log(`${name}`);
  console.log(`  className:  ${recipe.className}`);
  console.log(`  base decls: ${Object.keys(recipe.base).length}`);
  console.log(`  variants:   ${variantSummary}`);
});
console.log(`\nwrote ${outPath}`);
console.log(
  '\nAuthoring changes required in ./authoring.ts to make this work: NONE.\n'
);
/* eslint-enable no-console */
