import { elementDir } from '../elementDir';

describe('elementDir', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('dir');
  });

  it('returns rtl when the element has dir="rtl"', () => {
    const el = document.createElement('div');
    el.setAttribute('dir', 'rtl');
    expect(elementDir(el)).toBe('rtl');
  });

  it('returns ltr when the element has dir="ltr"', () => {
    const el = document.createElement('div');
    el.setAttribute('dir', 'ltr');
    expect(elementDir(el)).toBe('ltr');
  });

  it('falls back to documentElement dir when computed style is empty (JSDOM)', () => {
    const el = document.createElement('div');
    document.documentElement.setAttribute('dir', 'rtl');
    expect(elementDir(el)).toBe('rtl');
  });
});
