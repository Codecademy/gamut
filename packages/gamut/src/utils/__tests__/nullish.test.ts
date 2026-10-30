import { isDefined, isNullish } from '../nullish';

describe('isNullish', () => {
  it('is true for null and undefined', () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it('is false for other values', () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish('')).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish({})).toBe(false);
  });
});

describe('isDefined', () => {
  it('is false for null and undefined', () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });

  it('is true for other values', () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined('')).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined({})).toBe(true);
  });
});

describe('isNullish and isDefined', () => {
  it('are opposites for typical inputs', () => {
    const values: unknown[] = [null, undefined, 0, '', NaN, Symbol('x')];
    for (const v of values) {
      expect(isNullish(v)).toBe(!isDefined(v));
    }
  });
});
