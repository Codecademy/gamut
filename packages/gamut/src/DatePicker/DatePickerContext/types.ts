import { createContext } from 'react';

import { CalendarQuickAction, DatePickerSharedProps } from '../sharedTypes';
import type { DatePickerTranslations } from '../utils/translations';

interface DatePickerBaseContextValue<Mode extends 'single' | 'range'>
  extends Pick<DatePickerSharedProps, 'disableDate'> {
  /**
   * Discriminator: same meaning as the `mode` prop on `DatePicker` (`"single"` or `"range"`).
   */
  mode: Mode;
  /**
   * Resolved `Intl.Locale` for the `locale` prop (or the runtime default). The same object is
   * passed to formatters and to APIs such as `getWeekInfo` where available.
   */
  locale: Intl.Locale;
  /**
   * Whether the calendar popover (dialog) is open.
   *
   */
  isCalendarOpen: boolean;
  /**
   * Function to open the calendar popover. Use within callbacks that should open the calendar.
   */
  openCalendar: () => void;
  /** Function to move focus into the calendar grid. */
  focusCalendar: () => void;
  /**
   * Whether a grid-focus request is issued with an unchanged `focusedDate`, so layout
   * effects that depend on focus can still re-run.
   */
  focusGridSignal: boolean;
  /**
   * Whether the shell should run a one-shot move of focus into the grid.
   * Clear with {@link clearGridFocusRequest} after focus moves.
   */
  gridFocusRequested: boolean;
  /**
   * Mark the grid focus request as handled. Call after the calendar has moved focus into the
   * grid, or to reset state without closing.
   */
  clearGridFocusRequest: () => void;
  /**
   * Function to close the calendar popover and return focus to the input. Use within callbacks that should close the calendar.
   */
  closeCalendar: () => void;
  /**
   * Merged `translations` for the `DatePicker` component. The `DatePicker` `translations` prop is merged onto
   * the default strings so every key is present. See {@link DatePickerTranslations} for the shape of the translations and default values.
   */
  translations: Required<DatePickerTranslations>;
  /**
   * Footer quick actions. The shell uses an empty array if the
   * `DatePicker` `quickActions` prop is `null`. When the prop is omitted, built-in defaults
   * apply. See {@link CalendarQuickAction} for the shape of the quick actions.
   */
  quickActions: CalendarQuickAction[];
}

export interface DatePickerSingleContextValue
  extends DatePickerBaseContextValue<'single'> {
  /**
   * The controlled selected date. Same as the `DatePicker` `selectedDate` prop.
   */
  selectedDate: Date | null;
  /**
   * Callback to update the selected date. Forwards to the `onSelected` callback on `DatePicker`.
   */
  onSelection: (date: Date | null) => void;
}

type ActiveRangePart = 'start' | 'end' | null;

export interface DatePickerRangeContextValue
  extends DatePickerBaseContextValue<'range'> {
  /**
   * Controlled start of the range. Same as the `DatePicker` `startDate` prop.
   */
  startDate: Date | null;
  /**
   * Controlled end of the range. Same as the `DatePicker` `endDate` prop.
   */
  endDate: Date | null;
  /**
   * Updates both `startDate` and `endDate` by calling the `onStartSelected` and `onEndSelected`
   * props on `DatePicker` in one step.
   */
  onRangeSelection: (startDate: Date | null, endDate: Date | null) => void;
  /**
   * `"start"` or `"end"` when that segment of the field drives the next interaction, or `null`
   * in a combined "selection" state (for example when extending or replacing the range from the
   * grid). Affects the visible anchor month in the open calendar and how a day pick updates
   * start vs. end in range mode.
   */
  activeRangePart: ActiveRangePart;
  /**
   * Set {@link activeRangePart} (for example when focus moves between the start and end
   * spinbutton inputs).
   */
  setActiveRangePart: (part: ActiveRangePart) => void;
}

export type DatePickerContextValue =
  | DatePickerSingleContextValue
  | DatePickerRangeContextValue;

export const DatePickerContext = createContext<DatePickerContextValue | null>(
  null
);
