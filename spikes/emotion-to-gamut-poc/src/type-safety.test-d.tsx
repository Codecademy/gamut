import type { StyleProps } from '@codecademy/variance';

import { Box, css, states, variant } from './gamut';

/* COMPILE-TIME TEST. There is no runtime here — `yarn typecheck` IS the assertion.
 *
 * Every `@ts-expect-error` below must actually error. If token safety silently
 * regressed, TypeScript reports "Unused '@ts-expect-error' directive" and the
 * typecheck fails. So this file fails loudly in both directions.
 *
 * Purpose: prove that removing the Emotion augmentation cost us nothing. */

// ── 1. Scale-valued props still validate against the theme ───────────────────
// (this is the part that genuinely needs `keyof Theme`)

css({ p: 16, bg: 'primary', borderRadius: 'md', fontSize: 22 });

// @ts-expect-error 12 is not a fontSize token (the scale is 14|16|18|20|22|26|34|44|64)
css({ fontSize: 12 });

// @ts-expect-error 5 is not a spacing token
css({ p: 5 });

// @ts-expect-error not a colour token or semantic alias
css({ bg: 'chartreuse' });

// @ts-expect-error not a borderRadii token
css({ borderRadius: 'extra-round' });

// ── 2. variant() produces a dependable literal union ─────────────────────────

const positionVariants = variant({
  prop: 'position',
  base: { display: 'flex' },
  variants: {
    left: { flex: 1 },
    right: { flex: 1 },
    center: { flex: 2 },
  },
});

type PositionProps = StyleProps<typeof positionVariants>;

// the prop is named after `prop`, and accepts exactly the declared keys
const validLeft: PositionProps = { position: 'left' };
const validCenter: PositionProps = { position: 'center' };

// @ts-expect-error 'middle' is not a declared variant
const invalidVariant: PositionProps = { position: 'middle' };

// @ts-expect-error the prop is `position`, not `variant`
const wrongPropName: PositionProps = { variant: 'left' };

// ── 3. states() produces exactly the declared booleans ───────────────────────

const toggleStates = states({
  isFancy: { p: 0 },
  compact: { py: 4 },
});

type ToggleProps = StyleProps<typeof toggleStates>;

const validStates: ToggleProps = { isFancy: true, compact: false };

// @ts-expect-error states are booleans, not strings
const invalidStateValue: ToggleProps = { isFancy: 'yes' };

// @ts-expect-error `hasBorder` was never declared as a state
const undeclaredState: ToggleProps = { hasBorder: true };

// ── 4. The same guarantees hold through a component's props ──────────────────

const boxOk = <Box p={16} bg="primary" borderRadius="md" />;

// @ts-expect-error still rejected when passed as a JSX prop
const boxBadToken = <Box p={5} />;

// ── keep the compiler from pruning these as unused ───────────────────────────
export const __assertions = [
  validLeft,
  validCenter,
  invalidVariant,
  wrongPropName,
  validStates,
  invalidStateValue,
  undeclaredState,
  boxOk,
  boxBadToken,
];
