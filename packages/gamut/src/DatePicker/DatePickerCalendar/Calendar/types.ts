import type { RefObject } from 'react';

import type {
  CalendarQuickAction,
  DatePickerSharedProps,
} from '../../sharedTypes';
import type { IsoWeekday } from '../../utils/locale';

interface CalendarBaseProps extends DatePickerSharedProps {
  /** Used for the currently displayed month and year */
  displayDate: Date;
  /** Called when the displayed month changes. Pass the new date (e.g. setDisplayDate) so the calendar updates. */
  onDisplayDateChange: (newDate: Date) => void;
}

export interface CalendarNavProps
  extends Omit<CalendarBaseProps, 'shouldDisableDate'> {
  /** Called after navigating to previous month. */
  onLastMonthClick?: () => void;
  /** Called after navigating to next month */
  onNextMonthClick?: () => void;
  /**
   * When true, Tab (forward) on a chevron runs `onTabIntoGrid` instead of the default order.
   * Set when the user just changed the month and the grid is still "paused" until they enter it.
   */
  interceptTabToGrid?: boolean;
  /**
   * When `interceptTabToGrid` is set: move focus into the day grid with an appropriate roving date.
   * Omit in standalone calendar stories.
   */
  onTabIntoGrid?: () => void;
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
  /**
   * Region that contains all month grids (e.g. two-month layout). When focus is inside this
   * subtree, roving tabindex may move DOM focus between grids; omit so only this table counts.
   */
  calendarKeyboardSurfaceRef?: RefObject<HTMLElement | null>;
  /**
   * After a header month change: all day cells stay tabIndex -1 until the user moves into the grid
   * (Tab on a chevron, etc.).
   */
  pauseGridRoving?: boolean;
}

export interface CalendarFooterProps {
  clearButton?: {
    disabled?: boolean;
    onClick?: () => void;
    text?: string;
  };
  quickActions?: CalendarQuickAction[];
}
