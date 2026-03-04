import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  formatDateForInput,
  parseDateFromInput,
} from './Calendar/utils/format';
import type { UseDatePickerArgs, UseDatePickerReturn } from './types';

/**
 * Hook for single-date DatePicker state and props. Use with DatePicker,
 * DatePickerInput, and DatePickerCalendar (or the default DatePicker layout).
 */
export function useDatePicker(
  args: UseDatePickerArgs = {}
): UseDatePickerReturn {
  const {
    selectedDate: controlledDate,
    onDateSelect: onDateSelectProp,
    locale = 'en-US',
    disabledDates = [],
  } = args;

  const [internalDate, setInternalDate] = useState<Date | null>(null);
  const selectedDate =
    controlledDate !== undefined ? controlledDate : internalDate;
  const setSelectedDate = useCallback(
    (date: Date | null) => {
      if (onDateSelectProp) onDateSelectProp(date);
      if (controlledDate === undefined) setInternalDate(date);
    },
    [controlledDate, onDateSelectProp]
  );

  const [visibleDate, setVisibleDate] = useState<Date>(() => {
    const d = selectedDate ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    () => selectedDate ?? new Date()
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(() =>
    selectedDate ? formatDateForInput(selectedDate, locale) : ''
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isInputFocusedRef = useRef(false);
  const dialogId = useId();

  const formattedValue = useMemo(
    () => (selectedDate ? formatDateForInput(selectedDate, locale) : ''),
    [selectedDate, locale]
  );

  // Sync input display when selectedDate changes from outside the input (e.g. calendar selection).
  // Don't overwrite while the user is typing (input focused).
  useEffect(() => {
    if (!isInputFocusedRef.current) {
      setInputValue(formattedValue);
    }
  }, [formattedValue]);

  const openCalendar = useCallback(() => setIsCalendarOpen(true), []);
  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
    inputRef.current?.focus();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);
      if (!raw.trim()) {
        setSelectedDate(null);
        return;
      }
      const parsed = parseDateFromInput(raw, locale);
      if (parsed) setSelectedDate(parsed);
    },
    [locale, setSelectedDate]
  );

  const handleInputBlur = useCallback(() => {
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
  }, [inputValue, locale, formattedValue, setSelectedDate]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault();
        openCalendar();
      }
    },
    [openCalendar]
  );

  const handleDateSelect = useCallback(
    (date: Date) => {
      setInputValue(formatDateForInput(date, locale));
      setSelectedDate(date);
    },
    [locale, setSelectedDate]
  );

  const handleClearDate = useCallback(() => {
    setSelectedDate(null);
    setFocusedDate(visibleDate);
  }, [visibleDate]);

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    setVisibleDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setFocusedDate(today);
  }, []);

  const datePickerProps = useMemo(
    () => ({
      selectedDate,
      onDateSelect: setSelectedDate,
      locale,
      disabledDates,
    }),
    [selectedDate, setSelectedDate, locale, disabledDates]
  );

  const dialogIdSafe = `datepicker-dialog-${dialogId.replace(/:/g, '')}`;

  const inputProps = useMemo(
    (): UseDatePickerReturn['inputProps'] => ({
      value: inputValue,
      onChange: handleInputChange,
      onFocus: () => {
        isInputFocusedRef.current = true;
      },
      onBlur: handleInputBlur,
      onKeyDown: handleInputKeyDown,
      onClick: openCalendar,
      label: 'Date',
      id: dialogId,
      placeholder: 'MM/DD/YYYY',
      inputRef,
      'aria-expanded': isCalendarOpen,
      'aria-controls': dialogIdSafe,
      'aria-haspopup': 'dialog',
    }),
    [
      inputValue,
      handleInputChange,
      handleInputBlur,
      handleInputKeyDown,
      openCalendar,
      isCalendarOpen,
      dialogId,
      dialogIdSafe,
    ]
  );

  const calendarProps = useMemo(
    () => ({
      visibleDate,
      onVisibleDateChange: setVisibleDate,
      selectedDate,
      onDateSelect: handleDateSelect,
      disabledDates,
      focusedDate,
      onFocusedDateChange: setFocusedDate,
      onClearDate: handleClearDate,
      onTodayClick: handleTodayClick,
      locale,
      weekStartsOn: 0 as 0 | 1,
    }),
    [
      visibleDate,
      selectedDate,
      handleDateSelect,
      disabledDates,
      focusedDate,
      handleClearDate,
      handleTodayClick,
      locale,
    ]
  );

  return {
    datePickerProps,
    inputProps,
    calendarProps,
    isCalendarOpen,
    openCalendar,
    closeCalendar,
    calendarDialogId: dialogIdSafe,
  };
}
