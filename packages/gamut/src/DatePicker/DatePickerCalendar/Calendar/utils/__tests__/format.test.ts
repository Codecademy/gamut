import {
  capitalizeFirst,
  formatDateForAriaLabel,
  formatMonthYear,
  getRelativeMonthLabels,
  getRelativeTodayLabel,
  getWeekdayNames,
} from '../format';

const enUS = new Intl.Locale('en-US');
const frFR = new Intl.Locale('fr-FR');

describe('capitalizeFirst', () => {
  it('uppercases the first character per locale', () => {
    expect(capitalizeFirst({ str: 'hello', locale: enUS })).toBe('Hello');
  });

  it('returns empty string unchanged', () => {
    expect(capitalizeFirst({ str: '', locale: enUS })).toBe('');
  });
});

describe('formatMonthYear', () => {
  it('formats month in long format and year in numeric format', () => {
    const text = formatMonthYear({ date: new Date(2026, 0, 15), locale: enUS });
    expect(text).toMatch(/2026/);
    expect(text.toLowerCase()).toContain('january');
  });

  it('formats month and year based on the given locale', () => {
    const text = formatMonthYear({ date: new Date(2026, 0, 15), locale: frFR });
    expect(text).toMatch(/2026/);
    expect(text.toLowerCase()).toContain('janvier');
  });
});

describe('getWeekdayNames', () => {
  it('returns short weekday names when format is short', () => {
    const short = getWeekdayNames({
      format: 'short',
      locale: enUS,
      firstWeekday: 1,
    });
    expect(short).toHaveLength(7);
    expect(short).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  });

  it('returns long weekday names when format is long', () => {
    const long = getWeekdayNames({
      format: 'long',
      locale: enUS,
      firstWeekday: 7,
    });
    expect(long).toHaveLength(7);
    expect(long).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });

  it('returns the correct weekday name order for the given firstWeekday', () => {
    const short = getWeekdayNames({
      format: 'short',
      locale: frFR,
      firstWeekday: 1,
    });
    expect(short).toEqual([
      'lun.',
      'mar.',
      'mer.',
      'jeu.',
      'ven.',
      'sam.',
      'dim.',
    ]);
    const long = getWeekdayNames({
      format: 'long',
      locale: frFR,
      firstWeekday: 7,
    });
    expect(long).toEqual([
      'dimanche',
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
    ]);
  });
});

describe('getRelativeMonthLabels', () => {
  it('returns next and last month strings in the given locale (en-US)', () => {
    const { nextMonth, lastMonth } = getRelativeMonthLabels(enUS);
    expect(nextMonth).toEqual('Next month');
    expect(lastMonth).toEqual('Last month');
  });

  it('returns next and last month strings in the given locale (fr-FR)', () => {
    const { nextMonth, lastMonth } = getRelativeMonthLabels(frFR);
    expect(nextMonth).toEqual('Le mois prochain');
    expect(lastMonth).toEqual('Le mois dernier');
  });
});

describe('getRelativeTodayLabel', () => {
  it('returns today string in the given locale (en-US)', () => {
    expect(getRelativeTodayLabel(enUS)).toEqual('Today');
  });

  it('returns today string in the given locale (fr-FR)', () => {
    expect(getRelativeTodayLabel(frFR)).toEqual('Aujourd’hui');
  });
});

describe('formatDateForAriaLabel', () => {
  it('formats month in long format, day in numeric format, and year in numeric format in the given locale (en-US)', () => {
    const label = formatDateForAriaLabel({
      date: new Date(2026, 1, 14),
      locale: enUS,
    });
    expect(label).toMatch(/2026/);
    expect(label.toLowerCase()).toContain('february');
    expect(label).toMatch(/14/);
  });

  it('formats month in long format, day in numeric format, and year in numeric format in the given locale (fr-FR)', () => {
    const label = formatDateForAriaLabel({
      date: new Date(2026, 1, 14),
      locale: frFR,
    });
    expect(label).toMatch(/2026/);
    expect(label.toLowerCase()).toContain('février');
    expect(label).toMatch(/14/);
  });
});
