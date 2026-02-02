/** Shared context fields for accessibility translation functions. */
type BarChartAccessibilityContextBase = {
  unit: string;
  locale: string;
};

/**
 * Context passed to the single-bar accessibility translation function (inOnly).
 * Used for non-interactive bars when the summary does not include the row label.
 */
export type BarChartAccessibilityInOnlyContext =
  BarChartAccessibilityContextBase & {
    value: number;
  };

/**
 * Context passed to the single-bar-with-label accessibility translation function (inLabel).
 * Used for interactive bars (button/link) when the summary includes the row label.
 */
export type BarChartAccessibilityInLabelContext =
  BarChartAccessibilityInOnlyContext & {
    yLabel: string;
  };

/**
 * Context passed to the stacked-bar accessibility translation function (gainedNowAt).
 * Use when you need full control over the accessibility summary for stacked bars,
 * e.g. for pluralization, word order, or locale-specific phrasing.
 */
export type BarChartAccessibilityStackedContext =
  BarChartAccessibilityContextBase & {
    yLabel: string;
    seriesOneValue: number;
    seriesTwoValue: number;
  };

/**
 * BarChart translation configuration for internationalization.
 *
 * **Accessibility keys** (`gainedNowAt`, `inLabel`, `inOnly`) may be either:
 * - **String** – Used as a fragment in the built-in template (e.g. "in", "gained - now at").
 *   Backward compatible with existing usage.
 * - **Function** – Receives scoped context (values, label, unit, locale) and returns the
 *   **entire** accessibility summary string. Use for nuanced i18n (pluralization, word
 *   order, locale-specific phrasing).
 *
 * **sortLabel**, **sortOptions**, and **locale** are always strings.
 */
export type BarChartTranslations = {
  sortLabel: string;
  sortOptions: {
    none: string;
    labelAsc: string;
    labelDesc: string;
    valueAsc: string;
    valueDesc: string;
  };
  accessibility: {
    gainedNowAt:
      | string
      | ((ctx: BarChartAccessibilityStackedContext) => string);
    inLabel: string | ((ctx: BarChartAccessibilityInLabelContext) => string);
    inOnly: string | ((ctx: BarChartAccessibilityInOnlyContext) => string);
  };
  /** For Intl.NumberFormat (e.g. 'en', 'es', 'fr'). */
  locale: string;
};

/**
 * Partial translations for BarChart. Nested `accessibility` and `sortOptions` may
 * override individual keys; they are merged with defaults at runtime.
 */
export type PartialBarChartTranslations = Partial<
  Omit<BarChartTranslations, 'accessibility' | 'sortOptions'>
> & {
  sortOptions?: Partial<BarChartTranslations['sortOptions']>;
  accessibility?: Partial<BarChartTranslations['accessibility']>;
};

export const defaultBarChartTranslations: BarChartTranslations = {
  sortLabel: 'Order by:',
  sortOptions: {
    none: 'None',
    labelAsc: 'Label (A-Z)',
    labelDesc: 'Label (Z-A)',
    valueAsc: 'Value (Low-High)',
    valueDesc: 'Value (High-Low)',
  },
  accessibility: {
    gainedNowAt: 'gained - now at',
    inLabel: 'in',
    inOnly: 'in ',
  },
  locale: 'en',
};
