import { useContext } from 'react';

import { DatePickerContext, DatePickerContextValue } from './types';

export const DatePickerProvider = DatePickerContext.Provider;

export const useDatePicker = (): DatePickerContextValue => {
  const value = useContext(DatePickerContext);
  if (value === null) {
    throw new Error('useDatePickerContext must be used within a DatePicker.');
  }
  return value;
};
