import { breakpoints } from '@codecademy/gamut-styles';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useMedia } from 'react-use';

import { Box, FlexBox } from '../Box';
import {
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
  CalendarWrapper,
} from './Calendar';
import type { CalendarBodyProps } from './Calendar/types';
import { useDatePicker } from './DatePickerContext';
import {
  handleDateSelectRange,
  handleDateSelectSingle,
} from './utils/dateSelect';

export type DatePickerCalendarProps = Pick<
  CalendarBodyProps,
  'weekStartsOn'
> & {
  /** id for the dialog (for aria-controls from input). */
  dialogId: string;
};

/**
 * Calendar that composes Calendar, CalendarHeader, CalendarBody, CalendarFooter.
 * When inside DatePicker: owns local visibleDate and focusedDate; updates shared
 * state via context. Supports single-date and range modes.
 */
export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  dialogId,
  weekStartsOn,
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
    focusGridSignal,
    gridFocusRequested,
    clearGridFocusRequest,
  } = context;

  const focusGridSync = useMemo(
    () => ({
      gridFocusRequested,
      signal: focusGridSignal,
      onGridFocusRequestHandled: clearGridFocusRequest,
    }),
    [gridFocusRequested, focusGridSignal, clearGridFocusRequest]
  );

  const isRange = mode === 'range';
  const endDate = isRange ? context.endDate : undefined;
  const firstOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);

  const [displayDate, setDisplayDate] = useState(() =>
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
      setDisplayDate(firstOfMonth(anchor));
      setFocusedDate(startOrSelectedDate ?? endDate ?? new Date());
    }
  }, [isCalendarOpen, startOrSelectedDate, endDate]);

  const onDateSelect = (date: Date) => {
    if (!isRange) {
      handleDateSelectSingle({
        date,
        selectedDate: startOrSelectedDate,
        setSelection,
      });
      // Defer close so React can commit the new date and the input can sync segments
      // before closeCalendar focuses the spinbutton (which blocks segment sync while "focused").
      queueMicrotask(closeCalendar);
      return;
    }
    context.setActiveRangePart(null);
    const shouldClose = handleDateSelectRange({
      date,
      activeRangePart: context.activeRangePart,
      startDate: startOrSelectedDate,
      endDate: context.endDate,
      setSelection,
      disabledDates,
    });
    if (shouldClose) closeCalendar();
  };

  const handleClearDate = () => {
    setSelection(null);
    setFocusedDate(displayDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelection(today);
    setDisplayDate(firstOfMonth(today));
    setFocusedDate(today);
    if (!isRange) queueMicrotask(closeCalendar);
  };

  const focusTarget =
    focusedDate ?? startOrSelectedDate ?? endDate ?? new Date();

  const addMonths = (date: Date, n: number) =>
    new Date(date.getFullYear(), date.getMonth() + n, 1);
  const secondMonthDate = addMonths(displayDate, 1);

  const isTwoMonthsVisible = useMedia(`(min-width: ${breakpoints.xs})`);

  return (
    <CalendarWrapper>
      <FlexBox p={24} pb={16}>
        <Box>
          <CalendarHeader
            displayDate={displayDate}
            headingId={headingId}
            hideNextNav={isTwoMonthsVisible}
            locale={locale}
            onDisplayDateChange={setDisplayDate}
          />
          <CalendarBody
            disabledDates={disabledDates}
            displayDate={displayDate}
            endDate={endDate}
            focusGridSync={focusGridSync}
            focusedDate={focusTarget}
            hasAdjacentMonthRight={isTwoMonthsVisible}
            labelledById={headingId}
            locale={locale}
            selectedDate={startOrSelectedDate}
            weekStartsOn={weekStartsOn}
            onDateSelect={onDateSelect}
            onDisplayDateChange={setDisplayDate}
            onEscapeKeyPress={closeCalendar}
            onFocusedDateChange={setFocusedDate}
          />
        </Box>
        <Box display={{ _: 'none', xs: 'initial' }} pl={{ _: 0, xs: 32 }}>
          <CalendarHeader
            displayDate={secondMonthDate}
            headingId={headingId}
            hideLastNav
            locale={locale}
            onDisplayDateChange={setDisplayDate}
          />
          <CalendarBody
            disabledDates={disabledDates}
            displayDate={secondMonthDate}
            endDate={endDate}
            focusGridSync={focusGridSync}
            focusedDate={focusTarget}
            hasAdjacentMonthLeft={isTwoMonthsVisible}
            labelledById={headingId}
            locale={locale}
            selectedDate={startOrSelectedDate}
            weekStartsOn={weekStartsOn}
            onDateSelect={onDateSelect}
            onDisplayDateChange={setDisplayDate}
            onEscapeKeyPress={closeCalendar}
            onFocusedDateChange={setFocusedDate}
          />
        </Box>
      </FlexBox>
      <CalendarFooter
        clearText={translations.clearText}
        disabled={startOrSelectedDate === null && endDate === null}
        locale={locale}
        showClearButton={isRange}
        onClearDate={handleClearDate}
        onTodayClick={handleTodayClick}
      />
    </CalendarWrapper>
  );
};
