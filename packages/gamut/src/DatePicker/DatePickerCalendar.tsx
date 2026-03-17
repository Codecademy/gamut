import { useEffect, useId, useRef, useState } from 'react';

import { Box, FlexBox } from '../Box';
import {
  Calendar,
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
} from './Calendar';
import { useDatePicker } from './DatePickerContext';
import { handleDateSelectRange, handleDateSelectSingle } from './utils';

export type DatePickerCalendarProps = {
  /** id for the dialog (for aria-controls from input). */
  dialogId: string;
  /** Whether to start the calendar on Sunday (0) or Monday (1). Default is Sunday. */
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
    startOrSelectedDate,
    setSelection,
    disabledDates,
    locale,
    closeCalendar,
    isCalendarOpen,
    translations,
  } = context;

  const isRange = mode === 'range';
  const endDate = isRange ? context.endDate : undefined;
  const firstOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);

  const [visibleDate, setVisibleDate] = useState(() =>
    firstOfMonth(startOrSelectedDate ?? new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    () => startOrSelectedDate ?? endDate ?? new Date()
  );
  const wasOpenRef = useRef(false);

  // Sync visible month to selection only when the calendar opens, not on every
  // date click. Otherwise clicking a date in the second month would jump the view.
  useEffect(() => {
    const justOpened = isCalendarOpen && !wasOpenRef.current;
    wasOpenRef.current = isCalendarOpen;
    if (!justOpened) return;
    const anchor = startOrSelectedDate ?? endDate;
    if (anchor) {
      setVisibleDate(firstOfMonth(anchor));
      setFocusedDate(startOrSelectedDate ?? endDate ?? new Date());
    }
  }, [isCalendarOpen, startOrSelectedDate, endDate]);

  const onDateSelect = (date: Date) => {
    if (!isRange) {
      handleDateSelectSingle(date, startOrSelectedDate, setSelection);
    } else {
      context.setActiveRangePart(null);
      handleDateSelectRange(
        date,
        context.activeRangePart,
        startOrSelectedDate,
        context.endDate,
        setSelection
      );
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

  const focusTarget =
    focusedDate ?? startOrSelectedDate ?? endDate ?? new Date();

  const addMonths = (date: Date, n: number) =>
    new Date(date.getFullYear(), date.getMonth() + n, 1);
  const secondMonthDate = addMonths(visibleDate, 1);

  return (
    <Calendar>
      <Box p={24}>
        <CalendarHeader
          currentMonthYear={visibleDate}
          headingId={headingId}
          locale={locale}
          secondMonthYear={secondMonthDate}
          onCurrentMonthYearChange={setVisibleDate}
        />
        <FlexBox>
          <CalendarBody
            disabledDates={disabledDates}
            endDate={endDate}
            focusedDate={focusTarget}
            labelledById={headingId}
            locale={locale}
            selectedDate={startOrSelectedDate}
            visibleDate={visibleDate}
            weekStartsOn={weekStartsOn}
            onDateSelect={onDateSelect}
            onEscapeKeyPress={closeCalendar}
            onFocusedDateChange={setFocusedDate}
            onVisibleDateChange={setVisibleDate}
          />
          <Box display={{ _: 'none', xs: 'initial' }} pl={{ _: 0, xs: 32 }}>
            <CalendarBody
              disabledDates={disabledDates}
              endDate={endDate}
              focusedDate={focusTarget}
              labelledById={headingId}
              locale={locale}
              selectedDate={startOrSelectedDate}
              visibleDate={secondMonthDate}
              weekStartsOn={weekStartsOn}
              onDateSelect={onDateSelect}
              onEscapeKeyPress={closeCalendar}
              onFocusedDateChange={setFocusedDate}
              onVisibleDateChange={setVisibleDate}
            />
          </Box>
        </FlexBox>
      </Box>
      <CalendarFooter
        clearText={translations.clear}
        disabled={startOrSelectedDate === null && endDate === null}
        locale={locale}
        showClearButton={isRange}
        onClearDate={handleClearDate}
        onTodayClick={handleTodayClick}
      />
    </Calendar>
  );
};
