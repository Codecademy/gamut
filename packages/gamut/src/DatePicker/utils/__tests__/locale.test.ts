import {
  getDefaultLocaleTag,
  getIsoFirstDayFromLocale,
  resolveLocale,
  stringifyLocale,
} from '../locale';

describe('getDefaultLocaleTag', () => {
  it('returns a non-empty BCP 47 tag from the runtime', () => {
    const tag = getDefaultLocaleTag();
    expect(typeof tag).toBe('string');
    expect(tag.length).toBeGreaterThan(0);
  });
});

describe('resolveLocale', () => {
  it('uses the runtime default when locales is undefined', () => {
    const loc = resolveLocale(undefined);
    expect(loc).toBeInstanceOf(Intl.Locale);
    expect(loc.toString()).toBe(getDefaultLocaleTag());
  });

  it('returns the same Intl.Locale instance when passed in', () => {
    const input = new Intl.Locale('en-CA');
    expect(resolveLocale(input)).toBe(input);
  });

  it('parses a string tag', () => {
    const loc = resolveLocale('de-DE');
    expect(loc.toString()).toBe('de-DE');
  });

  it('uses the first entry of a locale array', () => {
    const loc = resolveLocale(['fr-FR', 'fr']);
    expect(loc.toString()).toBe('fr-FR');
  });

  it('falls back to default when the locale array is empty', () => {
    const loc = resolveLocale([]);
    expect(loc.toString()).toBe(getDefaultLocaleTag());
  });
});

describe('stringifyLocale', () => {
  it('returns locale.toString()', () => {
    const loc = new Intl.Locale('en-US');
    expect(stringifyLocale(loc)).toBe(loc.toString());
  });
});

describe('getIsoFirstDayFromLocale', () => {
  it('returns the override when provided', () => {
    const locale = new Intl.Locale('en-US');
    expect(getIsoFirstDayFromLocale(locale, 1)).toBe(1);
    expect(getIsoFirstDayFromLocale(locale, 7)).toBe(7);
  });

  it('uses getWeekInfo().firstDay when it is between 1 and 7', () => {
    const locale = {
      getWeekInfo: () => ({ firstDay: 3 }),
    } as unknown as Intl.Locale;
    expect(getIsoFirstDayFromLocale(locale)).toBe(3);
  });

  it('falls back to Sunday (7) when getWeekInfo is missing or firstDay is invalid', () => {
    expect(getIsoFirstDayFromLocale({} as unknown as Intl.Locale)).toBe(7);
    const badFirstDay = {
      getWeekInfo: () => ({ firstDay: 0 }),
    } as unknown as Intl.Locale;
    expect(getIsoFirstDayFromLocale(badFirstDay)).toBe(7);
  });
});
