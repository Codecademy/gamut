import { useId } from 'react';

import {
  Calendar,
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
} from './Calendar';
import type { UseDatePickerReturn } from './types';

/** Props for the presentational DatePickerCalendar (single-date). */
export type DatePickerCalendarProps = UseDatePickerReturn['calendarProps'] & {
  /** Optional id for the dialog (for aria-controls from input). */
  dialogId?: string;
};

/**
 * Presentational calendar that composes Calendar, CalendarHeader, CalendarBody,
 * and CalendarFooter. Used inside a popover; does not manage open/close state.
 */
export function DatePickerCalendar({
  visibleDate,
  onVisibleDateChange,
  selectedDate,
  onDateSelect,
  disabledDates,
  focusedDate,
  onFocusedDateChange,
  onClearDate,
  onTodayClick,
  locale = 'en-US',
  weekStartsOn = 0,
  dialogId: dialogIdProp,
}: DatePickerCalendarProps) {
  const generatedId = useId();
  const headingId = dialogIdProp ?? `datepicker-calendar-${generatedId.replace(/:/g, '')}`;

  return (
    <Calendar>
      <CalendarHeader
        currentMonthYear={visibleDate}
        onCurrentMonthYearChange={onVisibleDateChange}
        locale={locale}
        headingId={headingId}
      />
      <CalendarBody
        visibleDate={visibleDate}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        disabledDates={disabledDates}
        focusedDate={focusedDate ?? selectedDate ?? new Date()}
        onFocusedDateChange={onFocusedDateChange}
        onVisibleDateChange={onVisibleDateChange}
        labelledById={headingId}
        locale={locale}
        weekStartsOn={weekStartsOn}
      />
      <CalendarFooter
        onSelectedDateChange={(date) =>
          date === null ? onClearDate() : onDateSelect(date)
        }
        onCurrentMonthYearChange={onVisibleDateChange}
        onClearDate={onClearDate}
        onTodayClick={onTodayClick}
      />
    </Calendar>
  );
}
