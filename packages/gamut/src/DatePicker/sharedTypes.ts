export interface DatePickerSharedProps {
  /**
   * Return `true` to disable that calendar day. Use `matchDisabledDates` from `./utils/dateGrid`
   * to disable a fixed list of days.
   *
   * @example Disable anything older than three calendar months
   * ```tsx
   * const cutoff = new Date();
   * cutoff.setMonth(cutoff.getMonth() - 3);
   * const startOfCutoff = new Date(
   *   cutoff.getFullYear(),
   *   cutoff.getMonth(),
   *   cutoff.getDate()
   * );
   * <DatePicker shouldDisableDate={(d) => d < startOfCutoff} />
   * ```
   */
  shouldDisableDate?: (date: Date) => boolean;

  /**
   * Locale for formatting and `Intl.Locale` APIs. Accepts `Intl.LocalesArgument` (e.g. `'en-US'`,
   * `['en-GB', 'en']`, or a prebuilt `Intl.Locale`). Omitted → runtime default (user agent).
   */
  locale?: Intl.LocalesArgument;
}

export interface CalendarQuickAction {
  /** Number of days, weeks, months, or years to add or subtract from the current date. */
  num: number;
  /** Time period to add or subtract from the current date. */
  timePeriod: 'day' | 'week' | 'month' | 'year';
  /** Text to display for the quick action. */
  displayText: string;
  /** Callback when the quick action is clicked. */
  onClick?: () => void;
}
