import type { IsoWeekday } from '../utils/locale';

interface CalendarBaseProps {
  /** Used for the currently displayed month and year */
  displayDate: Date;
  /** Called when the displayed month changes. Pass the new date (e.g. setDisplayDate) so the calendar updates. */
  onDisplayDateChange: (newDate: Date) => void;
  /**
   * Locale for formatting and `Intl.Locale` APIs. Accepts `Intl.LocalesArgument` (e.g. `'en-US'`,
   * `['en-GB', 'en']`, or a prebuilt `Intl.Locale`). Omitted → runtime default (user agent).
   */
  locale?: Intl.LocalesArgument;
  /** Dates that should be disabled (unselectable) */
  disabledDates?: Date[];
}

export interface CalendarNavProps
  extends Omit<CalendarBaseProps, 'disabledDates'> {
  /** Called after navigating to previous month. */
  onLastMonthClick?: () => void;
  /** Called after navigating to next month */
  onNextMonthClick?: () => void;
}

export interface CalendarHeaderProps extends CalendarNavProps {
  hideLastNav?: boolean;
  hideNextNav?: boolean;
  /** Used for the currently displayed second month and year when in two-month view */
  secondDisplayDate?: Date;
  /** id for the heading (for grid aria-labelledby) */
  headingId: string;
}

export interface CalendarBodyProps extends CalendarBaseProps {
  /** Selected start date (single or range start) */
  selectedDate: Date | null;
  /** Selected end date (range only; undefined for single-date mode) */
  endDate?: Date | null;
  /** Called when a date cell is selected */
  onDateSelect: (date: Date) => void;
  /**
   * Force first column to this ISO weekday (1 = Monday … 7 = Sunday). Same scale as
   * `Intl.Locale#getWeekInfo().firstDay`. Omit to use locale (polyfill where needed).
   */
  weekStartsOn?: IsoWeekday;
  /** Id of the month/year heading (aria-labelledby on grid) */
  labelledById: string;
  /** For keyboard nav: which cell has focus (roving tabindex) */
  focusedDate: Date | null;
  /** Callback when focused date changes (e.g. arrow keys) */
  onFocusedDateChange: (date: Date | null) => void;
  /** Called when the escape key is pressed */
  onEscapeKeyPress?: () => void;
  /** When true (e.g. two-month view), arrow keys move focus to adjacent month without changing visible date. */
  hasAdjacentMonthRight?: boolean;
  /** When true (e.g. two-month view), arrow keys move focus to adjacent month without changing visible date. */
  hasAdjacentMonthLeft?: boolean;
  /**
   * When set (DatePicker), only programmatically focuses a day when the grid already has focus
   * or `gridFocusRequested` is true (keyboard open / ArrowDown from input).
   * Omit for standalone calendar stories — keeps legacy behavior (always sync focus to focusedDate).
   */
  focusGridSync?: {
    gridFocusRequested: boolean;
    signal: boolean;
    onGridFocusRequestHandled: () => void;
  };
}

export interface QuickAction {
  /** Number of days, weeks, months, or years to add or subtract from the current date. */
  num: number;
  /** Time period to add or subtract from the current date. */
  timePeriod: 'day' | 'week' | 'month' | 'year';
  /** Text to display for the quick action. */
  displayText: string;
  /** Callback when the quick action is clicked. */
  onClick?: () => void;
}
export interface CalendarFooterProps {
  clear?: {
    disabled?: boolean;
    onClick?: () => void;
    text?: string;
  };
  /** Max 3 quick actions (e.g. "7 days", "1 month") */
  quickActions?: QuickAction[];
}
