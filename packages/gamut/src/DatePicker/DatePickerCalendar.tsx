import { useEffect, useId, useState } from 'react';

import {
  Calendar,
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
} from './Calendar';
import { useDatePicker } from './DatePickerContext';

export type DatePickerCalendarProps = {
  /** Optional id for the dialog (for aria-controls from input). */
  dialogId?: string;
  /** When outside DatePicker, pass weekStartsOn (0 or 1). */
  weekStartsOn?: 0 | 1;
};

/**
 * Calendar that composes Calendar, CalendarHeader, CalendarBody, CalendarFooter.
 * When inside DatePicker: owns local visibleDate and focusedDate; updates shared
 * state via context. Supports single-date and range modes.
 */
export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  dialogId,
  weekStartsOn = 0,
}) => {
  const context = useDatePicker();
  const generatedId = useId();
  const fallbackDialogId = `datepicker-calendar-${generatedId.replace(
    /:/g,
    ''
  )}`;
  const headingId = dialogId ?? context?.calendarDialogId ?? fallbackDialogId;

  if (context == null) {
    throw new Error(
      'DatePickerCalendar must be used inside a DatePicker (it reads shared state from context).'
    );
  }

  const {
    mode,
    selectedDate,
    setSelection,
    endDate,
    disabledDates,
    locale,
    closeCalendar,
  } = context;

  const isRange = mode === 'range';
  const firstOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);

  const [visibleDate, setVisibleDate] = useState(() =>
    firstOfMonth(selectedDate ?? new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    () => selectedDate ?? endDate ?? new Date()
  );

  useEffect(() => {
    const anchor = selectedDate ?? endDate;
    if (anchor) {
      setVisibleDate(firstOfMonth(anchor));
      setFocusedDate(selectedDate ?? endDate ?? new Date());
    }
  }, [selectedDate, endDate]);

  const handleDateSelect = (date: Date) => {
    if (!isRange) {
      setSelection(date);
      return;
    }
    // Range mode: first click = start, second = end; if both set, next click starts over
    const hasStart = selectedDate != null;
    const hasEnd = endDate != null;
    if (hasStart && hasEnd) {
      setSelection(date, null);
    } else if (hasStart && !hasEnd) {
      const start = selectedDate!;
      if (date.getTime() < start.getTime()) {
        setSelection(date, start);
      } else {
        setSelection(start, date);
      }
    } else {
      setSelection(date, null);
    }
  };

  const handleClearDate = () => {
    setSelection(null);
    setFocusedDate(visibleDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelection(today);
    setVisibleDate(firstOfMonth(today));
    setFocusedDate(today);
  };

  const focusTarget = focusedDate ?? selectedDate ?? endDate ?? new Date();

  return (
    <Calendar>
      <CalendarHeader
        currentMonthYear={visibleDate}
        onCurrentMonthYearChange={setVisibleDate}
        locale={locale}
        headingId={headingId}
      />
      <CalendarBody
        visibleDate={visibleDate}
        selectedDate={selectedDate}
        endDate={endDate}
        onDateSelect={handleDateSelect}
        disabledDates={disabledDates}
        focusedDate={focusTarget}
        onFocusedDateChange={setFocusedDate}
        onVisibleDateChange={setVisibleDate}
        labelledById={headingId}
        locale={locale}
        weekStartsOn={weekStartsOn}
        onEscapeKeyPress={closeCalendar}
      />
      <CalendarFooter
        onSelectedDateChange={(date) =>
          date === null ? handleClearDate() : handleTodayClick()
        }
        onCurrentMonthYearChange={setVisibleDate}
        onClearDate={handleClearDate}
        onTodayClick={handleTodayClick}
      />
    </Calendar>
  );
};
