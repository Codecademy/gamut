import { directionIsRtl } from '../directionIsRtl';

describe('directionIsRtl', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('dir');
  });

  it('returns true when the element has dir="rtl"', () => {
    const el = document.createElement('div');
    el.setAttribute('dir', 'rtl');
    expect(directionIsRtl(el)).toBe(true);
  });

  it('returns false when the element has dir="ltr"', () => {
    const el = document.createElement('div');
    el.setAttribute('dir', 'ltr');
    expect(directionIsRtl(el)).toBe(false);
  });

  it('falls back to documentElement dir when computed style is empty (JSDOM)', () => {
    const el = document.createElement('div');
    document.documentElement.setAttribute('dir', 'rtl');
    expect(directionIsRtl(el)).toBe(true);
  });
});
