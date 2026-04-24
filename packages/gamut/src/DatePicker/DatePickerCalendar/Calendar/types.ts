import type { RefObject } from 'react';

import type {
  CalendarQuickAction,
  DatePickerSharedProps,
} from '../../sharedTypes';
import type { IsoWeekday } from '../../utils/locale';

interface CalendarBaseProps extends DatePickerSharedProps {
  /**
   * Date used to display month and year in the calendar header.
   */
  displayDate: Date;
  /**
   * Callback when the visible month changes. Pass the new `Date` to your `displayDate` state (or
   * equivalent) so the calendar stays in sync.
   */
  onDisplayDateChange: (newDate: Date) => void;
}

export interface CalendarNavProps
  extends Omit<CalendarBaseProps, 'shouldDisableDate'> {
  /** Callback called after the user navigates to the previous month. */
  onLastMonthClick?: () => void;
  /** Callback called after the user navigates to the next month. */
  onNextMonthClick?: () => void;
  /**
   * Whether to intercept focus from the month chevron buttons. Used when the day grid is temporarily "paused" after a
   * month change until the user moves into the grid.
   *
   */
  interceptTabToGrid?: boolean;
  /**
   * Callback called when {@link interceptTabToGrid} is set to move focus into the day grid
   * and restore roving focus.
   */
  onTabIntoGrid?: () => void;
}

export interface CalendarHeaderProps extends CalendarNavProps {
  /** Hides the control that moves to the previous month. */
  hideLastNav?: boolean;
  /** Hides the control that moves to the next month. */
  hideNextNav?: boolean;
  /**
   * Date used to display month and year in the second month's calendar header.
   */
  secondDisplayDate?: Date;
  /**
   * `id` of the visible month heading, used for the grid `aria-labelledby` association.
   */
  headingId: string;
}

export interface CalendarBodyProps extends CalendarBaseProps {
  /**
   * Start of the selected range, or the single selected date. Pass `null` when nothing is
   * selected.
   */
  selectedDate: Date | null;
  /**
   * End of the range. Omit in single-date mode, or pass `null` for no end date in range mode.
   */
  endDate?: Date | null;
  /**
   * Callback when the user chooses a day cell
   */
  onDateSelect: (date: Date) => void;
  /**
   * First column of the grid as an ISO weekday (`1` = Monday through `7` = Sunday), matching
   * `Intl.Locale.prototype.getWeekInfo().firstDay`. Omit to use the active locale.
   */
  weekStartsOn?: IsoWeekday;
  /**
   * `id` of the month heading, used for the grid `aria-labelledby` association.
   */
  labelledById: string;
  /**
   * Which day should hold roving `tabindex` in the grid.
   */
  focusedDate: Date | null;
  /**
   * Callback when the focused day changes, including from arrow keys, click, and programmatic
   * updates to `focusedDate`.
   */
  onFocusedDateChange: (date: Date | null) => void;
  /**
   * Callback when the user presses <kbd>Escape</kbd> while a day is focused. The
   * `DatePicker` shell uses this to close the calendar popover.
   */
  onEscapeKeyPress?: () => void;
  /**
   * Whether the current month has a second grid to the right.
   */
  hasAdjacentMonthRight?: boolean;
  /**
   * Whether the current month has a second grid to the left.
   */
  hasAdjacentMonthLeft?: boolean;
  /**
   * Focus management contract for the `DatePicker` shell. Programmatically moves DOM
   * focus to a day only when this grid, or a wider `calendarContainerRef` region, already has
   * focus, or when `gridFocusRequested` is set (e.g. keyboard open or <kbd>ArrowDown</kbd> from
   * the field).
   *
   */
  focusGridSync?: {
    /**
     * Whether the shell requested a one-shot move of focus into the grid (e.g. from the
     * input or trigger).
     */
    gridFocusRequested: boolean;
    /**
     * Whether a grid-focus request is issued with an unchanged `focusedDate`, so layout
     * effects that depend on focus can still re-run.
     */
    signal: boolean;
    /**
     * Call after DOM focus was successfully moved into the grid in response to
     * `gridFocusRequested` so the shell can clear the request.
     */
    onGridFocusRequestHandled: () => void;
    /**
     * Ref to an element that wraps the calendar (e.g. the two month tables).
     */
    calendarContainerRef: RefObject<HTMLElement | null>;
  };
  /**
   * Whether to pause grid roving, i.e. should all day cells use `tabIndex={-1}` until the user moves into the grid
   * so the grid does not steal focus during month transitions.
   */
  pauseGridRoving?: boolean;
}

export interface CalendarFooterProps {
  /**
   * "Clear" action in the footer.
   */
  clearButton?: {
    /** Whether the clear button is disabled. */
    disabled?: boolean;
    /** Callback called when the clear button is clicked. */
    onClick?: () => void;
    /** Text to display for the clear button. `DatePickerCalendar` uses `translations.clearButtonText` */
    text?: string;
  };
  /**
   * Shortcut actions. See {@link CalendarQuickAction} for the
   * object shape. The `DatePicker` shell provides defaults for single and range mode unless you
   * override.
   */
  quickActions?: CalendarQuickAction[];
}
