import { createContext, useContext } from 'react';

import type { DatePickerContextValue as DatePickerContextValueType } from './types';

export const DatePickerContext =
  createContext<DatePickerContextValueType | null>(null);

/** Provider component; DatePicker uses this to set the context value. */
export const DatePickerProvider = DatePickerContext.Provider;

/**
 * Read the DatePicker context (selectedDate, setSelectedDate, openCalendar, etc.).
 * Use this in children of DatePicker or in DatePickerInput / DatePickerCalendar when used inside DatePicker.
 */
export function useDatePickerContext(): DatePickerContextValueType {
  const value = useContext(DatePickerContext);
  if (value == null) {
    throw new Error('useDatePickerContext must be used within a DatePicker.');
  }
  return value;
}
