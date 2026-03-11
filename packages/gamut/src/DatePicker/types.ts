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

/** Shared state provided by DatePicker via context. */
export interface DatePickerContextValue {
  mode: 'single' | 'range';
  /** Selected date (single) or start date (range). Same value as startDate. */
  selectedDate: Date | null;
  /** Alias for selectedDate (same value). */
  startDate: Date | null;
  /** Range only: end date. */
  endDate: Date | null;
  /** Range only: set full range. */
  setSelection: (startDate: Date | null, endDate?: Date | null) => void;
  isCalendarOpen: boolean;
  openCalendar: () => void;
  closeCalendar: () => void;
  locale: string;
  disabledDates: Date[];
  calendarDialogId: string;
}

/** Input props returned by useDatePicker for DatePickerInput. */
export interface UseDatePickerInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  placeholder?: string;
  error?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  role?: 'combobox';
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: 'dialog';
  'aria-autocomplete'?: 'none';
}

/** Return value of useDatePicker() (same as context value). */
export type UseDatePickerReturn = DatePickerContextValue;
