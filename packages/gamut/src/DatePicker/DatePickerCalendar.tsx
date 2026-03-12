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
    startDate,
    setSelection,
    endDate,
    activeRangePart,
    setActiveRangePart,
    disabledDates,
    locale,
    closeCalendar,
  } = context;

  const isRange = mode === 'range';
  const firstOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);

  const [visibleDate, setVisibleDate] = useState(() =>
    firstOfMonth(startDate ?? new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    () => startDate ?? endDate ?? new Date()
  );

  useEffect(() => {
    const anchor = startDate ?? endDate;
    if (anchor) {
      setVisibleDate(firstOfMonth(anchor));
      setFocusedDate(startDate ?? endDate ?? new Date());
    }
  }, [startDate, endDate]);

  // Clicking Start Date: Clears it. If End exists, End becomes new Start
  // Clicking End Date: Clears End Date (Start remains)
  // If Start == End (single day range): Clicking it clears everything

  const handleDateSelect = (date: Date) => {
    console.log('handle date select');
    setActiveRangePart(null);
    // single date select
    if (!isRange) {
      // If clicked date is the same as Start Date: Clear Start Date
      if (startDate && date.getTime() === startDate.getTime()) {
        setSelection(null);
        return;
      }
      // If clicked date is not the same as Start Date: Set Start Date to clicked date
      setSelection(date);
      return;
    }

    // Range mode: field targeting (start or end input was focused)
    if (activeRangePart === 'start') {
      if (date.getTime() === startDate?.getTime()) {
        setSelection(null, endDate);
        return;
      }
      const newEnd =
        endDate != null && date.getTime() <= endDate.getTime() ? endDate : null;
      setSelection(date, newEnd);
      return;
    }
    if (activeRangePart === 'end') {
      if (date.getTime() === endDate?.getTime()) {
        setSelection(startDate, null);
        return;
      }
      const newStart =
        startDate != null && date.getTime() >= startDate.getTime()
          ? startDate
          : null;
      setSelection(newStart, date);
      return;
    }

    // Range selection mode (no field focused: calendar drives both)
    if (startDate && endDate) {
      // if start date is end date and is clicked, clears everything
      if (
        startDate.getTime() === endDate.getTime() &&
        date.getTime() === startDate.getTime()
      ) {
        setSelection(null, null);
        return;
      }
      // if clicked on start date, end date becomes start date
      else if (date.getTime() === startDate.getTime()) {
        setSelection(endDate, null);
        return;
      }
      // if clicked on end date, clears end date and start remains
      else if (date.getTime() === endDate.getTime()) {
        setSelection(startDate, null);
        return;
      }
      // If clicked date > Start: Updates End Date to new date (Start remains)
      else if (date.getTime() > startDate.getTime()) {
        setSelection(startDate, date);
      }
      // If clicked date < Start: Updates Start Date to new date (End remains) - extends range to the left
      else {
        setSelection(date, endDate);
      }
      return;
    }
    // Start is Set, End is Empty
    else if (startDate && !endDate) {
      // If clicked date < Start: Restarts selection with clicked date as new Start
      if (date.getTime() < startDate.getTime()) {
        setSelection(date, null);
      }
      // If clicked date > Start: Sets it as End Date
      else {
        setSelection(startDate, date);
      }
      return;
    }
    setSelection(date, null);
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

  const focusTarget = focusedDate ?? startDate ?? endDate ?? new Date();

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
        selectedDate={startDate}
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
