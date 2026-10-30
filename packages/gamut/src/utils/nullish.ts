/**
 * True when `value` is `null` or `undefined`.
 * Use instead of `value == null` when `eqeqeq` is enforced.
 */
export const isNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/**
 * True when `value` is neither `null` nor `undefined`.
 * Use instead of `value != null` when `eqeqeq` is enforced.
 */
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== undefined && value !== null;
