import { breakpoints } from '@codecademy/gamut-styles';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMedia } from 'react-use';

import { Box, FlexBox } from '../Box';
import {
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
  CalendarWrapper,
} from './Calendar';
import type { CalendarBodyProps, QuickAction } from './Calendar/types';
import { addMonths, getFirstOfMonth } from './Calendar/utils/dateGrid';
import { useDatePicker } from './DatePickerContext';
import {
  applyRangeOrNewStart,
  handleDateSelectRange,
  handleDateSelectSingle,
  rangeContainsDisabled,
} from './utils/dateSelect';
import { computeQuickAction } from './utils/quickActions';

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
    onSelection,
    disabledDates,
    locale,
    closeCalendar,
    isCalendarOpen,
    translations,
    focusGridSignal,
    gridFocusRequested,
    clearGridFocusRequest,
    quickActions,
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
  const setActiveRangePart = isRange ? context.setActiveRangePart : undefined;

  const [displayDate, setDisplayDate] = useState(() =>
    getFirstOfMonth(startOrSelectedDate ?? new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    () => startOrSelectedDate ?? endDate ?? new Date()
  );
  const onFocusedDateChange = useCallback(
    (date: Date | null) => {
      setFocusedDate(date);
    },
    [setFocusedDate]
  );

  const focusTarget =
    focusedDate ?? startOrSelectedDate ?? endDate ?? new Date();
  const secondMonthDate = addMonths(displayDate, 1);
  const isTwoMonthsVisible = useMedia(`(min-width: ${breakpoints.xs})`);
  const wasOpenRef = useRef(false);

  // Sync visible month to selection only when the calendar opens, not on every
  // date click. Otherwise clicking a date in the second month would jump the view.
  useEffect(() => {
    const justOpened = isCalendarOpen && !wasOpenRef.current;
    wasOpenRef.current = isCalendarOpen;
    if (!justOpened) return;
    const anchor = startOrSelectedDate ?? endDate;
    if (anchor) {
      setDisplayDate(getFirstOfMonth(anchor));
      setFocusedDate(startOrSelectedDate ?? endDate ?? new Date());
    }
  }, [isCalendarOpen, startOrSelectedDate, endDate]);

  const onDateSelect = useCallback(
    (date: Date) => {
      if (!isRange) {
        handleDateSelectSingle({
          date,
          selectedDate: startOrSelectedDate,
          onSelection,
        });
        // Defer close so React can commit the new date and the input can sync segments
        // before closeCalendar focuses the spinbutton (which blocks segment sync while "focused").
        queueMicrotask(closeCalendar);
        return;
      }
      setActiveRangePart?.(null);
      const shouldClose = handleDateSelectRange({
        date,
        activeRangePart: context.activeRangePart,
        startDate: startOrSelectedDate,
        endDate: context.endDate,
        onSelection,
        disabledDates,
      });
      if (shouldClose) queueMicrotask(closeCalendar);
    },
    [
      isRange,
      setActiveRangePart,
      context,
      startOrSelectedDate,
      onSelection,
      disabledDates,
      closeCalendar,
    ]
  );

  const clearDate = useCallback(() => {
    onSelection(null);
    setFocusedDate(displayDate);
  }, [onSelection, setFocusedDate, displayDate]);

  const computedQuickActions: QuickAction[] = useMemo(() => {
    const safeDisabled = disabledDates ?? [];
    return quickActions.slice(0, 3).map((action) => ({
      ...action,
      onClick: () => {
        action.onClick?.();
        setActiveRangePart?.(null);
        const { start, end } = computeQuickAction(
          action.num,
          action.timePeriod,
          isRange
        );
        if (isRange) {
          if (
            rangeContainsDisabled({
              start,
              end,
              disabledDates: safeDisabled,
            })
          ) {
            applyRangeOrNewStart({
              start,
              end,
              clickedDate: end,
              disabledDates: safeDisabled,
              onSelection,
            });
          } else {
            onSelection(start, end);
          }
          setDisplayDate(getFirstOfMonth(end));
          setFocusedDate(end);
          queueMicrotask(closeCalendar);
        } else {
          onSelection(start);
          setDisplayDate(getFirstOfMonth(start));
          setFocusedDate(start);
          queueMicrotask(closeCalendar);
        }
      },
    }));
  }, [
    closeCalendar,
    disabledDates,
    isRange,
    quickActions,
    setActiveRangePart,
    onSelection,
  ]);

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
            onFocusedDateChange={onFocusedDateChange}
          />
        </Box>
      </FlexBox>
      <CalendarFooter
        clear={
          isRange
            ? {
                disabled: startOrSelectedDate === null && endDate === null,
                onClick: clearDate,
                text: translations.clearText,
              }
            : undefined
        }
        quickActions={computedQuickActions}
      />
    </CalendarWrapper>
  );
};
