/**
 * Public and internal types for the DatePicker (single-date and range).
 */

/** Result of custom validation; null means valid. */
export interface DatePickerValidationResult {
  errorMessage: string;
  errorType: string;
}

/** Shared props for all DatePicker modes. */
export interface DatePickerBaseProps {
  /** Locale for formatting (e.g. 'en-US'). */
  locale?: string;
  /** Dates that are disabled (unselectable) in the calendar. */
  disabledDates?: Date[];
  /** When provided, only the provider is rendered and children compose Input + Calendar. */
  children?: React.ReactNode;
  /** Placeholder for the input. */
  placeholder?: string;
}

/** Props for the DatePicker (single-date mode). */
export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: 'single';
  /** Controlled selected date. */
  selectedDate: Date | null;
  /** Called when the user selects a date. */
  setSelectedDate: (date: Date | null) => void;
  /** Label for the input. */
  label?: string;
}

/** Props for the DatePicker (range mode). */
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

/** Props for the DatePicker provider / standalone component. */
export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

/** Which range input is active (focused); null = calendar drives both (selection mode). */
export type ActiveRangePart = 'start' | 'end' | null;

/** Shared state provided by DatePicker via context. */
export interface DatePickerContextValue {
  mode: 'single' | 'range';
  /** Selected date (single) or start date (range). Same value as startDate. */
  selectedDate: Date | null;
  /** Alias for selectedDate (same value). */
  startDate: Date | null;
  /** Range only: end date. */
  endDate: Date | null;
  /** Set selection. Single: (date). Range: (start, end). */
  setSelection: (startDate: Date | null, endDate?: Date | null) => void;
  /** Range only: which input is active (start/end focused); null = selection mode. */
  activeRangePart: ActiveRangePart;
  /** Range only: set which input is active (e.g. when input receives focus). */
  setActiveRangePart: (part: ActiveRangePart) => void;
  isCalendarOpen: boolean;
  openCalendar: () => void;
  closeCalendar: () => void;
  locale: string;
  disabledDates: Date[];
  calendarDialogId: string;
}
