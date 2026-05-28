// Replaces `Intl.Locale` when missing or incomplete (e.g. no `getWeekInfo` in Firefox).
// https://formatjs.github.io/docs/polyfills/intl-locale/
import '@formatjs/intl-locale/polyfill.js';

import { useEffect, useMemo, useState } from 'react';

/**
 * The runtime default locale string (user agent), matching what `Intl` uses when no locale is passed.
 */
export const getDefaultLocaleTag = () =>
  new Intl.DateTimeFormat().resolvedOptions().locale;

/**
 * Resolves `Intl.LocalesArgument` (or `undefined`) to a stable `Intl.Locale` instance for formatting
 * and locale metadata.
 *
 * - `undefined` → default runtime locale via {@link getDefaultLocaleTag}
 * - `Intl.Locale` → returned as-is (no duplicate allocation)
 * - `string` / `readonly string[]` → `new Intl.Locale(...)`
 */
export const resolveLocale = (locales?: Intl.LocalesArgument) => {
  if (locales === undefined) {
    return new Intl.Locale(getDefaultLocaleTag());
  }
  if (locales instanceof Intl.Locale) {
    return locales;
  }
  if (typeof locales === 'string') {
    return new Intl.Locale(locales);
  }
  const first = locales[0];
  if (first === undefined) {
    return new Intl.Locale(getDefaultLocaleTag());
  }
  if (typeof first === 'string') {
    return new Intl.Locale(first);
  }
  return first instanceof Intl.Locale ? first : new Intl.Locale(String(first));
};

export const useResolvedLocale = (locale?: Intl.LocalesArgument) =>
  useMemo(() => resolveLocale(locale), [locale]);

export const stringifyLocale = (locale: Intl.Locale) => locale.toString();

/** ISO weekday: 1 = Monday … 7 = Sunday (matches `Intl.Locale#getWeekInfo().firstDay`). */
export type IsoWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** `getWeekInfo` is stage-3; typings may lag behind runtime / polyfill. */
type LocaleWithWeekInfo = Intl.Locale & {
  getWeekInfo?: () => { firstDay: number };
};

/**
 * First calendar column weekday from `locale` (via `getWeekInfo()`), or explicit override.
 */
export const getIsoFirstDayFromLocale = (
  locale: Intl.Locale,
  weekStartsOnOverride?: IsoWeekday
) => {
  if (weekStartsOnOverride) return weekStartsOnOverride;

  try {
    const getWeekInfo = (locale as LocaleWithWeekInfo).getWeekInfo?.bind(
      locale
    );
    if (typeof getWeekInfo === 'function') {
      const { firstDay } = getWeekInfo();
      if (typeof firstDay === 'number' && firstDay >= 1 && firstDay <= 7) {
        return firstDay as IsoWeekday;
      }
    }
  } catch {}
  return 7;
};

/**
 * Resolved first weekday for the calendar grid. Re-reads after mount so async polyfills
 * (e.g. Firefox) can install `getWeekInfo` before the first paint in some bundles.
 */
export const useIsoFirstWeekday = (
  locale: Intl.Locale,
  weekStartsOnOverride?: IsoWeekday
) => {
  const [firstDay, setFirstDay] = useState<IsoWeekday>(() =>
    getIsoFirstDayFromLocale(locale, weekStartsOnOverride)
  );

  useEffect(() => {
    setFirstDay(getIsoFirstDayFromLocale(locale, weekStartsOnOverride));
    const t = setTimeout(() => {
      setFirstDay(getIsoFirstDayFromLocale(locale, weekStartsOnOverride));
    }, 0);
    return () => clearTimeout(t);
  }, [locale, weekStartsOnOverride]);

  return firstDay;
};
