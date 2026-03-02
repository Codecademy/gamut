/**
 * Internal types for the Calendar subcomponents (used by DatePickerCalendar).
 */

export interface CalendarHeaderProps {
  /** Currently displayed month and year (used for heading and prev/next range) */
  currentMonthYear: Date;
  /** Called when the user navigates to a different month. Pass the new date (e.g. setVisibleDate) so the calendar updates. */
  onCurrentMonthYearChange: (newDate: Date) => void;
  /** Optional. Called after navigating to previous month; use for click tracking. */
  onPreviousMonthClick?: () => void;
  /** Optional. Called after navigating to next month; use for click tracking. */
  onNextMonthClick?: () => void;
  /** Locale for month/year formatting (e.g. 'en-US') */
  locale?: string;
  /** Optional id for the heading (for grid aria-labelledby) */
  headingId?: string;
}

export interface CalendarBodyProps {
  /** The month to display (typically first day of that month) */
  visibleDate: Date;
  /** Selected start date (single or range start) */
  selectedDate: Date | null;
  /** Selected end date (range only; null for single-date mode) */
  endDate?: Date | null;
  /** Dates that should be disabled (unselectable) */
  disabledDates?: Date[];
  /** Called when a date cell is selected */
  onDateSelect: (date: Date) => void;
  /** Locale for weekday names and week start */
  locale?: string;
  /** 0 = Sunday, 1 = Monday (default from locale if not set) */
  weekStartsOn?: 0 | 1;
  /** For keyboard nav: which cell has focus (roving tabindex) */
  focusedDate?: Date | null;
  /** Callback when focused date changes (e.g. arrow keys) */
  onFocusedDateChange?: (date: Date | null) => void;
  /** Id of the month/year heading (aria-labelledby on grid) */
  labelledById?: string;
}

export interface QuickAction {
  num: number;
  timePeriod: 'day' | 'week' | 'month' | 'year';
  onClick: () => void;
}

export interface CalendarFooterProps {
  onClearDate?: () => void;
  onTodayClick?: () => void;
  /** Called when the user navigates to a different month. Pass the new date (e.g. setVisibleDate) so the calendar updates. */
  onSelectedDateChange: (newDate: Date | null) => void;
  onCurrentMonthYearChange: (newDate: Date) => void;

  /** Max 3 quick actions (e.g. "7 days", "1 month") */
  quickActions?: QuickAction[];
}
