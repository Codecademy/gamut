import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { overlapStates } from './authoring';

/* Do the RUNTIME and PRECOMPUTED paths agree when two active states set the same
 * property?
 *
 *   runtime    — `states()` deep-merges active states in DECLARATION order, so
 *                `error` (declared second) should win.
 *   precomputed — Panda emits one INDEPENDENT class per active boolean variant,
 *                so the winner is whichever rule lands LAST in the stylesheet.
 *
 * A disagreement is a silent visual regression: no error, no type failure, just a
 * different colour. mono has 62 `states()` sites.
 *
 * Requires `panda cssgen` to have run. Run: yarn nx run panda-styling-poc:fidelity */

const theme = coreTheme as unknown as Record<string, unknown>;
const CLASS = 'gmt-gen-overlap';
const PROPERTY = 'background-color';

// --- runtime: both flags on, read the merged result -------------------------
const merged = (
  overlapStates as unknown as (
    props: Record<string, unknown>
  ) => Record<string, string>
)({ warning: true, error: true, theme });

const runtimeWinner = merged.backgroundColor;

// --- precomputed: find which rule lands last in the emitted stylesheet ------
const cssPath = join(process.cwd(), 'src/gamut-static.css');
const css = readFileSync(cssPath, 'utf8');

const ruleFor = (state: string) => {
  const selector = `.${CLASS}--${state}_true`;
  const at = css.lastIndexOf(selector);
  if (at === -1) return undefined;
  const body = css.slice(at, css.indexOf('}', at));
  const declared = new RegExp(`${PROPERTY}:\\s*([^;\\n}]+)`).exec(body);
  return { at, value: declared?.[1]?.trim() };
};

const warning = ruleFor('warning');
const error = ruleFor('error');

const later =
  warning && error ? (error.at > warning.at ? error : warning) : undefined;
const staticWinner = later?.value;

/* Both sides express the winner differently — variance resolves the token to a
 * `var(--color-*)` reference, Panda to `var(--colors-*)`. Compare the token NAME,
 * which is what actually determines the rendered colour. */
const tokenOf = (value?: string) =>
  value?.match(/--colors?-([a-z0-9-]+)/)?.[1] ?? value;

const runtimeToken = tokenOf(runtimeWinner);
const staticToken = tokenOf(staticWinner);
const agree = Boolean(
  runtimeToken && staticToken && runtimeToken === staticToken
);

/* eslint-disable no-console */
console.log('\n=== states() fidelity: runtime merge vs stylesheet order ===\n');
console.log('Authoring (declaration order matters):');
console.log("  states({ warning: { bg: 'yellow' }, error: { bg: 'red' } })");
console.log('Rendered with BOTH flags active.\n');

console.log(`runtime      merges in declaration order -> ${runtimeWinner}`);
console.log(`             token: ${runtimeToken}`);
console.log(
  `precomputed  last rule in stylesheet (${
    later === error ? 'error' : 'warning'
  }) -> ${staticWinner}`
);
console.log(`             token: ${staticToken}\n`);

console.log(`  .${CLASS}--warning_true at index ${warning?.at ?? 'MISSING'}`);
console.log(`  .${CLASS}--error_true   at index ${error?.at ?? 'MISSING'}\n`);

if (agree) {
  console.log(`PASS  both paths resolve to \`${runtimeToken}\`.`);
  console.log(
    '      Panda emits boolean variants in DECLARATION order, so stylesheet order'
  );
  console.log('      and merge order coincide.');
  console.log('');
  console.log(
    '      This test is not vacuous: declaration order here is warning->error,'
  );
  console.log(
    '      while ALPHABETICAL order is error->warning. Had Panda sorted the'
  );
  console.log(
    '      variants, `warning` would have landed last and won, giving `yellow`'
  );
  console.log('      and failing. So the pass genuinely discriminates.');
  console.log('');
  console.log(
    "      Still a property of Panda's emission order rather than a guarantee in"
  );
  console.log(
    '      the authoring model — which is why this stays as a regression test.'
  );
} else {
  console.log(
    `FAIL  runtime says \`${runtimeToken}\`, precomputed says \`${staticToken}\`.`
  );
  console.log(
    '      Overlapping states are a silent visual regression under precompute.'
  );
  console.log(
    '      Fix: have the precompute step COLLAPSE overlapping states into a'
  );
  console.log(
    '      single compound variant, rather than emitting independent classes.'
  );
}
console.log('');
/* eslint-enable no-console */

process.exit(agree ? 0 : 1);
