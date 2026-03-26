import { useMemo } from 'react';

/**
 * The runtime default locale string (user agent), matching what `Intl` uses when no locale is passed.
 */
export const getDefaultLocaleTag = () =>
  new Intl.DateTimeFormat().resolvedOptions().locale;

/**
 * Resolves `Intl.LocalesArgument` (or `undefined`) to a stable `Intl.Locale` instance for formatting
 * and locale metadata (e.g. `getWeekInfo()` in supporting environments).
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

/**
 * Memoized {@link resolveLocale} for calendar subcomponents. Pass the same `locale` prop you accept
 * from `CalendarBaseProps` (optional `Intl.LocalesArgument`).
 */
export const useResolvedLocale = (locale?: Intl.LocalesArgument) =>
  useMemo(() => resolveLocale(locale), [locale]);

/**
 * Convert an Intl.Locale to a string. This is necessary the Intl.DateTimeFormat constructor only accepts a string in some versions of TS.
 * @param locale - The Intl.Locale to convert to a string.
 * @returns The stringified locale.
 */
export const stringifyLocale = (locale: Intl.Locale) => locale.toString();
