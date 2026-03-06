import { CalendarIcon } from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react';

import { Input } from '../Form/inputs/Input';
import {
  formatDateForInput,
  parseDateFromInput,
} from './Calendar/utils/format';
import { useDatePickerContext } from './DatePickerContext';

/**
 * Props for DatePickerInput. When used inside DatePicker, only overrides (e.g. placeholder, label).
 * When used outside DatePicker, pass value, onChange, and other input props.
 */
export type DatePickerInputProps = Omit<
  ComponentProps<typeof Input>,
  'type' | 'icon'
>;

/**
 * Date input. When inside DatePicker: owns local input value state and syncs to
 * shared selectedDate via context on blur/parse; opens calendar on click/arrow down.
 * When outside DatePicker: fully controlled by props.
 */
export const DatePickerInput = forwardRef<
  HTMLInputElement,
  DatePickerInputProps
>((props, ref) => {
  const context = useDatePickerContext();
  if (context == null) {
    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        icon={CalendarIcon}
        placeholder={props.placeholder ?? 'MM/DD/YYYY'}
      />
    );
  }

  const {
    selectedDate,
    setSelectedDate,
    openCalendar,
    inputRef,
    locale,
    isCalendarOpen,
    calendarDialogId,
  } = context;

  const [inputValue, setInputValue] = useState(() =>
    selectedDate ? formatDateForInput(selectedDate, locale) : ''
  );
  const isInputFocusedRef = useRef(false);

  const formattedValue = selectedDate
    ? formatDateForInput(selectedDate, locale)
    : '';

  // Sync input from shared selectedDate (e.g. after calendar select). Skip when
  // input is focused so we don't overwrite while the user is typing.
  useEffect(() => {
    if (!isInputFocusedRef.current) {
      setInputValue(formattedValue);
    }
  }, [formattedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    if (!raw.trim()) {
      setSelectedDate(null);
      return;
    }
    const parsed = parseDateFromInput(raw, locale);
    if (parsed) setSelectedDate(parsed);
  };

  const handleBlur = () => {
    isInputFocusedRef.current = false;
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setSelectedDate(null);
      return;
    }
    const parsed = parseDateFromInput(trimmed, locale);
    if (parsed) {
      setSelectedDate(parsed);
      setInputValue(formatDateForInput(parsed, locale));
    } else {
      setInputValue(formattedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault();
      openCalendar();
    }
  };

  // what is this doing?
  // forwarded ref vs context inputRef?
  const setRef = (el: HTMLInputElement | null) => {
    (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref)
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
  };

  return (
    <Input
      {...props}
      ref={setRef}
      type="text"
      icon={CalendarIcon}
      value={inputValue}
      onChange={handleChange}
      onFocus={() => {
        isInputFocusedRef.current = true;
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={openCalendar}
      role="combobox"
      aria-expanded={isCalendarOpen}
      aria-controls={calendarDialogId}
      aria-haspopup="dialog"
      aria-autocomplete="none"
      placeholder={props.placeholder ?? 'MM/DD/YYYY'}
      label={props.label ?? 'Date'}
    />
  );
});
