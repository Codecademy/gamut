import { useContext } from 'react';

import { DatePickerContext, DatePickerContextValue } from './types';

/** Provider component; DatePicker uses this to set the context value. */
export const DatePickerProvider = DatePickerContext.Provider;

/**
 * Returns the DatePicker context value (shared state and callbacks).
 * Must be used inside a DatePicker. For composed layouts, use this to get
 * openCalendar, closeCalendar, isCalendarOpen, inputRef, calendarDialogId, etc.
 */
export const useDatePicker = (): DatePickerContextValue => {
  const value = useContext(DatePickerContext);
  if (value === null) {
    throw new Error('useDatePickerContext must be used within a DatePicker.');
  }
  return value;
};
