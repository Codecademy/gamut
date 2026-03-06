import { useDatePickerContext } from './DatePickerContext';

/**
 * Returns the DatePicker context value (shared state and callbacks).
 * Must be used inside a DatePicker. For composed layouts, use this to get
 * openCalendar, closeCalendar, isCalendarOpen, inputRef, calendarDialogId, etc.
 */
export function useDatePicker() {
  return useDatePickerContext();
}
