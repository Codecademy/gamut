/* Does the Gamut-owned recipe emitter produce what the runtime produces?
 *
 * The atomics tier had a Panda artifact to diff against. The recipe tier has none
 * — `panda-styling-poc`'s `src/gamut-static.css` is gitignored and Panda is not
 * installed in this tree — so the oracle here is the RUNTIME, which is the one
 * that actually decides what a user sees. That is a stronger oracle than "matches
 * Panda", and it is the oracle `panda-via-gamut-option-a.md`'s own fidelity probe
 * used (`verify-fidelity.ts` compares the runtime merge to the stylesheet).
 *
 * Method, stated precisely because "byte-identical" would be wrong here:
 *   - RUNTIME side: deep-merge the component's style layers in `createButtonComponent`
 *     order for a given point in the matrix, then flatten to
 *     selector-context → { css-property: value }.
 *   - EMITTED side: parse `dist/recipes.css` in file order, keep the blocks whose
 *     class is active at that point, normalise each selector back to `&`-relative
 *     form, and let later rules win — i.e. simulate the cascade for single-class
 *     specificity.
 *   - Compare the two maps. Equal keys, equal values, no extras.
 * So: NORMALISED DECLARATION MAPS PER SELECTOR CONTEXT, not bytes.
 *
 * Loud: `process.exitCode = 1` on any divergence.
 */
import { readFileSync } from 'node:fs';

import {
  FOLD_VARIANT_BASE,
  descriptors,
  flatten,
  precompute,
  recipeClasses,
  recipes,
  variantClass,
} from './recipes.mjs';
import { coreTheme } from './dist/recipe-source.bundle.mjs';

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

/* ── parse the emitted sheet ────────────────────────────────────────────────── */
const css = readFileSync('dist/recipes.css', 'utf8');
const blocks = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((match) => {
  const decls = [];
  for (const decl of match[2].split(';')) {
    const idx = decl.indexOf(':');
    if (idx !== -1) decls.push([decl.slice(0, idx).trim(), decl.slice(idx + 1).trim()]);
  }
  return { selector: match[1].trim(), decls };
});

/** Which class does this rule belong to? The first class token in the selector. */
const classOf = (selector) => /\.([A-Za-z][\w-]*)/.exec(selector)?.[1];

/** `.gmt-fill-button--variant_primary:before` → `&:before`, for any active class. */
const contextOf = (selector, activeClasses) => {
  let out = selector;
  /* LONGEST FIRST, and this bites: `.gmt-fill-button` is a strict prefix of
   * `.gmt-fill-button--variant_primary`, so replacing the short one first leaves
   * `&--variant_primary` and every variant rule silently stops matching. */
  for (const className of [...activeClasses].sort((a, b) => b.length - a.length))
    out = out.split(`.${className}`).join('&');
  return out;
};

/** Simulate the cascade for the classes active at one matrix point. */
const cascade = (activeClasses) => {
  const active = new Set(activeClasses);
  const out = {};
  for (const { selector, decls } of blocks) {
    const owner = classOf(selector);
    if (!owner || !active.has(owner)) continue;
    const context = contextOf(selector, activeClasses);
    out[context] ??= {};
    for (const [property, value] of decls) out[context][property] = value;
  }
  return out;
};

/** The runtime CSSObject for one matrix point, flattened the same way. */
const runtimeMap = (layers, props) => {
  const merged = {};
  for (const layer of layers) merge(merged, layer.fn({ ...props, theme: coreTheme }));
  const out = {};
  for (const [selector, decls] of flatten('&', merged)) {
    out[selector] ??= {};
    for (const [property, value] of decls) out[selector][property] = value;
  }
  return out;
};

/* ── enumerate the matrix ───────────────────────────────────────────────────── */
/** Every point: one value per variant prop × every boolean-state subset. */
const matrixPoints = (recipe) => {
  const variantProps = [];
  const booleanProps = [];
  for (const [prop, byKey] of Object.entries(recipe.variants))
    (Object.keys(byKey).length === 1 && byKey.true ? booleanProps : variantProps).push([
      prop,
      Object.keys(byKey),
    ]);

  let points = [{}];
  for (const [prop, keys] of variantProps)
    points = points.flatMap((point) => keys.map((key) => ({ ...point, [prop]: key })));
  for (const [prop] of booleanProps)
    points = points.flatMap((point) => [
      { ...point },
      { ...point, [prop]: true },
    ]);
  /* And the point where EVERY variant prop is omitted, so `defaultVariants` has to
   * supply them. The runtime side does the same by construction
   * (`variance/src/core.ts:266`), so this arm tests that the two defaults agree. */
  points.push({});
  return points;
};

/* Go through the runtime resolver rather than constructing class names inline, so
 * the resolver is under test too — including `defaultVariants`, which appears
 * nowhere in the CSS and is therefore the one part a byte-diff could never catch. */
const activeFor = (recipe, point) => recipeClasses(recipe, point);

let checked = 0;
const failures = [];

for (const [index, recipe] of recipes.entries()) {
  const { layers } = descriptors[index];
  for (const point of matrixPoints(recipe)) {
    checked += 1;
    const expected = runtimeMap(layers, point);
    const actual = cascade(activeFor(recipe, point));

    const contexts = new Set([...Object.keys(expected), ...Object.keys(actual)]);
    for (const context of contexts) {
      const exp = expected[context] ?? {};
      const act = actual[context] ?? {};
      const properties = new Set([...Object.keys(exp), ...Object.keys(act)]);
      for (const property of properties)
        if (exp[property] !== act[property])
          failures.push(
            `.${recipe.className} ${JSON.stringify(point)} @ "${context}" ` +
              `${property}: runtime '${exp[property]}' vs emitted '${act[property]}'`
          );
    }
  }
}

console.log(
  `\nRECIPE TIER — emitted cascade vs runtime deep merge` +
    ` (FOLD_VARIANT_BASE=${FOLD_VARIANT_BASE ? '1' : '0'})`
);
console.log(
  `   method: normalised declaration maps per selector context, NOT bytes`
);
console.log(
  `   ${recipes.length} recipes, ${checked} matrix points, ${blocks.length} emitted rules`
);
if (failures.length === 0)
  console.log(`   ✓ every matrix point matches the runtime, declaration for declaration`);
else {
  console.log(`   ✗ ${failures.length} divergences`);
  failures.slice(0, 12).forEach((f) => console.log(`     ${f}`));
  process.exitCode = 1;
}

/* ── the A22 states-overlap probe, re-run against a Gamut-owned emitter ────── */
const overlapLayers = descriptors.find((d) => d.className === 'gmt-overlap').layers;
const both = cascade([
  'gmt-overlap',
  'gmt-overlap--warning_true',
  'gmt-overlap--error_true',
]);
const runtimeBoth = runtimeMap(overlapLayers, { warning: true, error: true });
const emittedWinner = both['&']?.['background-color'];
const runtimeWinner = runtimeBoth['&']?.['background-color'];
console.log(`\n   A22 states() overlap — two states, same property, both active`);
console.log(`     runtime  (declaration-order deep merge): ${runtimeWinner}`);
console.log(`     emitted  (stylesheet order):             ${emittedWinner}`);
if (runtimeWinner && runtimeWinner === emittedWinner)
  console.log(
    `     ✓ agree. Discriminating: declaration order is warning→error while\n` +
      `       ALPHABETICAL order is error→warning, so a sorted emitter would fail.\n` +
      `       Here it holds because the emitter walks Object.keys of the states\n` +
      `       config — a property of THIS emitter's own code, not of a vendor's.`
  );
else {
  console.log(`     ✗ disagree — silent visual regression`);
  process.exitCode = 1;
}

/* ── U1: force-emission, asserted rather than asserted-in-prose ─────────────── */
const expectedClasses = new Set();
for (const recipe of recipes) {
  // a recipe with no base declarations legitimately emits no base rule
  if (Object.keys(recipe.base).length) expectedClasses.add(recipe.className);
  for (const [prop, byKey] of Object.entries(recipe.variants))
    for (const key of Object.keys(byKey))
      expectedClasses.add(variantClass(recipe.className, prop, key));
}
const emittedClasses = new Set(blocks.map(({ selector }) => classOf(selector)));
const missing = [...expectedClasses].filter((c) => !emittedClasses.has(c));
console.log(`\n   U1 force-emission — the whole matrix is present, usage-independent`);
console.log(
  `     ${expectedClasses.size} classes required by the matrix, ${
    emittedClasses.size
  } emitted`
);
if (missing.length === 0)
  console.log(
    `     ✓ every variant class exists. Nothing renders in this process, so this\n` +
      `       cannot be usage-driven: there is no extractor to disable.`
  );
else {
  console.log(`     ✗ ${missing.length} missing: ${missing.slice(0, 8).join(', ')}`);
  process.exitCode = 1;
}

console.log(`\n${process.exitCode ? '✗ FAIL' : '✓ PASS'} — exit ${process.exitCode ?? 0}\n`);
void precompute;
