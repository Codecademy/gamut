/**
 * Internal types for the Calendar subcomponents (used by DatePickerCalendar).
 */

export interface CalendarHeaderProps {
  /** Currently displayed month and year (used for heading and prev/next range) */
  currentMonthYear: Date;
  /** Called when the user navigates to a different month. Pass the new date (e.g. setVisibleDate) so the calendar updates. */
  onCurrentMonthYearChange: (newDate: Date) => void;
  /** Currently displayed second month and year (used for heading and prev/next range) */
  secondMonthYear?: Date;
  /** Called after navigating to previous month; use for click tracking. */
  onLastMonthClick?: () => void;
  /** Called after navigating to next month; use for click tracking. */
  onNextMonthClick?: () => void;
  /** Locale for month/year formatting (e.g. 'en-US') */
  locale?: string;
  /** id for the heading (for grid aria-labelledby) */
  headingId: string;
}

export interface CalendarBodyProps {
  /** The month to display (typically first day of that month) */
  visibleDate: Date;
  /** Selected start date (single or range start) */
  selectedDate: Date | null;
  /** Selected end date (range only; undefined for single-date mode) */
  endDate?: Date | null;
  /** Dates that should be disabled (unselectable) */
  disabledDates?: Date[];
  /** Called when a date cell is selected */
  onDateSelect: (date: Date) => void;
  /** Locale for weekday names and week start */
  locale?: string;
  /** 0 = Sunday, 1 = Monday (default from locale if not set) */
  weekStartsOn?: 0 | 1;
  /** Id of the month/year heading (aria-labelledby on grid) */
  labelledById: string;
  /** For keyboard nav: which cell has focus (roving tabindex) */
  focusedDate: Date | null;
  /** Callback when focused date changes (e.g. arrow keys) */
  onFocusedDateChange: (date: Date | null) => void;
  /** Called when grid keyboard nav changes month (e.g. Page Up/Down). Pass setVisibleDate so the calendar updates. */
  onVisibleDateChange: (newDate: Date) => void;
  /** Called when the escape key is pressed */
  onEscapeKeyPress?: () => void;
}

export interface QuickAction {
  num: number;
  timePeriod: 'day' | 'week' | 'month' | 'year';
  onClick: () => void;
}
export interface CalendarFooterProps {
  disabled?: boolean;
  showClearButton?: boolean;
  locale?: string;
  clearText: string;
  onClearDate?: () => void;
  onTodayClick?: () => void;
  /** Max 3 quick actions (e.g. "7 days", "1 month") */
  quickActions?: QuickAction[];
}

// interface CalendarFooterBaseProps {
//   disabled?: boolean;
//   locale?: string;
//   onTodayClick?: () => void;
//   /** Max 3 quick actions (e.g. "7 days", "1 month") */
//   quickActions?: QuickAction[];
// }

// interface CalendarFooterWithClearProps extends CalendarFooterBaseProps {
//   showClearButton: true;
//   clearText: string;
//   onClearDate: () => void;
// }

// interface CalendarFooterNoClearProps extends CalendarFooterBaseProps {
//   showClearButton?: false;
// }

// export type CalendarFooterProps =
//   | CalendarFooterWithClearProps
//   | CalendarFooterNoClearProps;
