import { ComponentProps } from 'react';

import { Input } from '../Form/inputs/Input';
import { CalendarBaseProps } from './Calendar/types';
import { DatePickerTranslations } from './utils/translations';

export interface DatePickerBaseProps
  extends Pick<CalendarBaseProps, 'locale' | 'disabledDates'> {
  /** When provided, only the provider is rendered and children compose Input + Calendar. */
  children?: React.ReactNode;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Override UI strings (e.g. clear button). Merged with defaults. */
  translations?: DatePickerTranslations;
  inputSize?: ComponentProps<typeof Input>['size'];
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: 'single';
  /** Controlled selected date. */
  selectedDate: Date | null;
  /** Called when the user selects a date. */
  setSelectedDate: (date: Date | null) => void;
  /** Label for the input. */
  label?: string;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: 'range';
  /** Controlled start date. */
  startDate: Date | null;
  /** Controlled end date. */
  endDate: Date | null;
  /** Called when the user changes the start date. */
  setStartDate: (date: Date | null) => void;
  /** Called when the user changes the end date. */
  setEndDate: (date: Date | null) => void;
  /** Label for the start date input. */
  startLabel?: string;
  /** Label for the end date input. */
  endLabel?: string;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

export type OpenCalendarOptions = {
  /**
   * When true, move DOM focus into the date grid after open (keyboard / explicit request).
   * When false (default), keep focus on the input so pointer users can type (WCAG 3.2.1).
   */
  moveFocusIntoCalendar?: boolean;
};

export interface DatePickerBaseContextValue
  extends Pick<CalendarBaseProps, 'disabledDates'> {
  /**
   * Resolved `Intl.Locale` from the `locale` prop (or runtime default). Same instance passed to
   * formatters and available for `getWeekInfo()` etc.
   */
  locale: Intl.Locale;
  isCalendarOpen: boolean;
  openCalendar: (options?: OpenCalendarOptions) => void;
  /** Move focus from the input into the grid when the calendar is already open (e.g. ArrowDown). */
  focusCalendarGrid: () => void;
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
  /** Start date (range) or selected date (single). */
  startOrSelectedDate: Date | null;
  /** Set selection. Single: (date). Range: (start, end). */
  setSelection: (
    startOrSelectedDate: Date | null,
    endDate?: Date | null
  ) => void;
}

export interface DatePickerSingleContextValue
  extends DatePickerBaseContextValue {
  mode: 'single';
}

export type ActiveRangePart = 'start' | 'end' | null;

export interface DatePickerRangeContextValue
  extends DatePickerBaseContextValue {
  mode: 'range';
  endDate: Date | null;
  /** Which input is active (start/end focused); null = selection mode. */
  activeRangePart: ActiveRangePart;
  /** Set which input is active (e.g. when input receives focus). */
  setActiveRangePart: (part: ActiveRangePart) => void;
}

export type DatePickerContextValue =
  | DatePickerSingleContextValue
  | DatePickerRangeContextValue;
