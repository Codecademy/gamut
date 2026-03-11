import { CalendarIcon } from '@codecademy/gamut-icons';
import {
  ComponentProps,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { Input } from '../Form/inputs/Input';
import {
  formatDateForInput,
  parseDateFromInput,
} from './Calendar/utils/format';
import { useDatePicker } from './DatePickerContext';

/**
 * Props for DatePickerInput. When used inside DatePicker, only overrides (e.g. placeholder, label).
 * In range mode, use rangePart to bind to start or end date. When outside DatePicker, pass value, onChange, etc.
 */
export type DatePickerInputProps = Omit<
  ComponentProps<typeof Input>,
  'type' | 'icon'
> & {
  /** In range mode: which part of the range this input edits. Omit for single-date or combined display. */
  rangePart?: 'start' | 'end';
};

/**
 * Date input. When inside DatePicker: owns local input value state and syncs to
 * shared selectedDate via context on blur/parse; opens calendar on click/arrow down.
 * When outside DatePicker: fully controlled by props.
 */
export const DatePickerInput = forwardRef<
  HTMLInputElement,
  DatePickerInputProps
>(({ placeholder, label, rangePart, ...rest }, ref) => {
  const context = useDatePicker();
  // do we want to do this or just throw an error?
  if (context == null) {
    return (
      <Input
        {...rest}
        ref={ref}
        type="text"
        icon={CalendarIcon}
        placeholder={placeholder ?? 'MM/DD/YYYY'}
      />
    );
  }

  const {
    mode,
    startDate,
    endDate,
    setSelection,
    openCalendar,
    locale,
    isCalendarOpen,
    calendarDialogId,
  } = context;

  const isRange = mode === 'range';

  const inputID = useId();
  const inputId = `datepicker-input-${inputID.replace(/:/g, '')}`;

  // Range with two inputs: each input binds to one part. Single or range combined: one value.
  const boundDate = isRange && rangePart === 'end' ? endDate : startDate;
  const formattedValue =
    boundDate != null ? formatDateForInput(boundDate, locale) : '';

  const [inputValue, setInputValue] = useState(() => formattedValue);
  const isInputFocusedRef = useRef(false);

  // Sync input from shared state. Skip when focused so we don't overwrite while typing.
  useEffect(() => {
    if (!isInputFocusedRef.current) {
      setInputValue(formattedValue);
    }
  }, [formattedValue]);

  /** Apply raw input string to selection state. Returns formatted string if parsed so caller can sync input (e.g. on blur). */
  const applyValueToSelection = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      if (isRange && rangePart) {
        if (rangePart === 'start') setSelection(null, endDate);
        else setSelection(startDate, null);
      } else setSelection(null);
      return undefined;
    }
    const parsed = parseDateFromInput(trimmed, locale);
    if (!parsed) return undefined;
    if (isRange && rangePart) {
      if (rangePart === 'start') setSelection(parsed, endDate);
      else setSelection(startDate, parsed);
    } else setSelection(parsed);
    return formatDateForInput(parsed, locale);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    applyValueToSelection(raw);
  };

  const handleBlur = () => {
    isInputFocusedRef.current = false;
    const formatted = applyValueToSelection(inputValue.trim());
    if (formatted) setInputValue(formatted);
    else if (inputValue.trim()) setInputValue(formattedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault();
      openCalendar();
    }
  };

  const handleOpenCalendar = () => {
    openCalendar();
  };

  const defaultLabel =
    isRange && rangePart === 'end'
      ? 'End date'
      : isRange
      ? 'Start date'
      : 'Date';

  return (
    <Input
      {...rest}
      id={inputId}
      ref={ref}
      type="text"
      icon={CalendarIcon}
      value={inputValue}
      onChange={handleChange}
      onFocus={() => {
        isInputFocusedRef.current = true;
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={handleOpenCalendar}
      role="combobox"
      aria-expanded={isCalendarOpen}
      aria-controls={calendarDialogId}
      aria-haspopup="dialog"
      aria-autocomplete="none"
      placeholder={placeholder ?? 'MM/DD/YYYY'}
      label={label ?? defaultLabel} // this isnt actually adding a label
    />
  );
});
