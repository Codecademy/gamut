import { CalendarIcon } from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef } from 'react';

import { Input } from '../Form/inputs/Input';

/**
 * Props for DatePickerInput. Extends all Input props except `type` and `icon`,
 * which are fixed: the input is always type="text" (for formatted date display)
 * and shows CalendarIcon.
 */
export type DatePickerInputProps = Omit<
  ComponentProps<typeof Input>,
  'type' | 'icon'
>;

/**
 * A controlled, presentational date input. Wraps the form Input with type="text"
 * and CalendarIcon. The parent (or useDatePicker) is responsible for formatting
 * the date value for display and parsing manual entry.
 *
 * Use for single-date (pass value/onChange for one date) or as the start/end
 * field in range mode (two instances with distinct labels, e.g. "Start date" / "End date").
 */
export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (props, ref) => {
    return <Input {...props} ref={ref} type="text" icon={CalendarIcon} />;
  }
);

DatePickerInput.displayName = 'DatePickerInput';
