/**
 * Public and internal types for the DatePicker (single-date).
 */

/** Result of custom validation; null means valid. */
export interface DatePickerValidationResult {
  errorMessage: string;
  errorType: string;
}

/** Props for the DatePicker provider / standalone component. */
export interface DatePickerProps {
  /** Controlled selected date (single-date mode). */
  selectedDate: Date | null;
  /** Called when the user selects a date. */
  setSelectedDate: (date: Date | null) => void;
  /** Locale for formatting (e.g. 'en-US'). */
  locale?: string;
  /** Dates that are disabled (unselectable) in the calendar. */
  disabledDates?: Date[];
  /** Custom validation; if returns non-null, error is shown and date may be unselectable. */
  validation?: (value: {
    date: Date | null;
  }) => DatePickerValidationResult | null;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Label for the input. */
  label?: string;
  /** Id for the input. */
  id?: string;
  /** When provided, only the provider is rendered and children compose Input + Calendar. */
  children?: React.ReactNode;
}

/** Shared state provided by DatePicker via context. */
export interface DatePickerContextValue {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
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
