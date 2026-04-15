import { createContext } from 'react';

import { CalendarQuickAction, DatePickerSharedProps } from '../sharedTypes';
import type { DatePickerTranslations } from '../utils/translations';

interface DatePickerBaseContextValue<Mode extends 'single' | 'range'>
  extends Pick<DatePickerSharedProps, 'shouldDisableDate'> {
  mode: Mode;
  /**
   * Resolved `Intl.Locale` from the `locale` prop (or runtime default). Same instance passed to
   * formatters and available for `getWeekInfo()` etc.
   */
  locale: Intl.Locale;
  isCalendarOpen: boolean;
  openCalendar: () => void;
  /** Move focus from the input into the grid when the calendar is already open (e.g. ArrowDown). */
  focusCalendar: () => void;
  /**
   * Flips on each grid focus request so `CalendarBody` effects re-run when `focusTarget` is unchanged.
   * Not a semantic true/false — only the change matters; pair with `gridFocusRequested`.
   */
  focusGridSignal: boolean;
  /** When true, `CalendarBody` runs a one-shot move of DOM focus into the grid if it is not already there. */
  gridFocusRequested: boolean;
  /** Clears `gridFocusRequested` after focus has moved into the grid (or call when closing). */
  clearGridFocusRequest: () => void;
  closeCalendar: () => void;
  calendarDialogId: string;
  /** UI string overrides (e.g. clear button). */
  translations: Required<DatePickerTranslations>;
  /** Calendar footer quick actions (max 3 shown). */
  quickActions: CalendarQuickAction[];
  // /** Start date (range) or selected date (single). */
  // startOrSelectedDate: Date | null;
  /** Set selection. Single: (date). Range: (start, end). */
  // onSelection: (date: Date | null, endDate?: Date | null) => void;
}

export interface DatePickerSingleContextValue
  extends DatePickerBaseContextValue<'single'> {
  selectedDate: Date | null;
  onSelection: (date: Date | null) => void;
}

type ActiveRangePart = 'start' | 'end' | null;

export interface DatePickerRangeContextValue
  extends DatePickerBaseContextValue<'range'> {
  startDate: Date | null;
  endDate: Date | null;
  onRangeSelection: (startDate: Date | null, endDate: Date | null) => void;
  /** Which input is active (start/end focused); null = selection mode. */
  activeRangePart: ActiveRangePart;
  /** Set which input is active (e.g. when input receives focus). */
  setActiveRangePart: (part: ActiveRangePart) => void;
}

export type DatePickerContextValue =
  | DatePickerSingleContextValue
  | DatePickerRangeContextValue;

export const DatePickerContext = createContext<DatePickerContextValue | null>(
  null
);
