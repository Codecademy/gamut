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
 * selectedDate via context on select/clear/today. When outside DatePicker: receives
 * all props from parent (standalone mode).
 */
export function DatePickerCalendar(props: DatePickerCalendarProps) {
  const context = useDatePicker();
  const generatedId = useId();
  const fallbackDialogId = `datepicker-calendar-${generatedId.replace(
    /:/g,
    ''
  )}`;
  const headingId =
    props.dialogId ?? context?.calendarDialogId ?? fallbackDialogId;

  if (context == null) {
    throw new Error(
      'DatePickerCalendar must be used inside a DatePicker (it reads shared state from context).'
    );
  }

  const { selectedDate, setSelectedDate, disabledDates, locale } = context;

  const firstOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

  const [visibleDate, setVisibleDate] = useState(() =>
    firstOfMonth(selectedDate ?? new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    () => selectedDate ?? new Date()
  );

  useEffect(() => {
    if (selectedDate) {
      setVisibleDate(firstOfMonth(selectedDate));
      setFocusedDate(selectedDate);
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    setFocusedDate(visibleDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setVisibleDate(firstOfMonth(today));
    setFocusedDate(today);
  };

  const weekStartsOn = (props.weekStartsOn ?? 0) as 0 | 1;

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
        onDateSelect={handleDateSelect}
        disabledDates={disabledDates}
        focusedDate={focusedDate ?? selectedDate ?? new Date()}
        onFocusedDateChange={setFocusedDate}
        onVisibleDateChange={setVisibleDate}
        labelledById={headingId}
        locale={locale}
        weekStartsOn={weekStartsOn}
      />
      <CalendarFooter
        onSelectedDateChange={(date) =>
          date === null ? handleClearDate() : handleDateSelect(date)
        }
        onCurrentMonthYearChange={setVisibleDate}
        onClearDate={handleClearDate}
        onTodayClick={handleTodayClick}
      />
    </Calendar>
  );
}
