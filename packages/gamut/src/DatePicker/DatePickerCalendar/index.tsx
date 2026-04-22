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

import { Box, FlexBox } from '../../Box';
import { useDatePicker } from '../DatePickerContext';
import { CalendarQuickAction } from '../sharedTypes';
import {
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
  CalendarWrapper,
} from './Calendar';
import type { CalendarBodyProps } from './Calendar/types';
import {
  addMonths,
  getFirstOfMonth,
  isDateWithinVisibleMonths,
} from './Calendar/utils/dateGrid';
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
  const headingLeftId = `datepicker-calendar-left-month-heading-${generatedId.replace(
    /:/g,
    ''
  )}`;
  const headingRightId = `datepicker-calendar-right-month-heading-${generatedId.replace(
    /:/g,
    ''
  )}`;

  if (context === null) {
    throw new Error(
      'DatePickerCalendar must be used inside a DatePicker (it reads shared state from context).'
    );
  }

  const {
    mode,
    shouldDisableDate,
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
  const selectedDate = isRange ? context.startDate : context.selectedDate;
  const endDate = isRange ? context.endDate : undefined;
  const setActiveRangePart = isRange ? context.setActiveRangePart : undefined;
  const activeRangePart = isRange ? context.activeRangePart : null;

  /** Committed value that should drive the visible month when it changes (input, grid, or quick actions). */
  const anchorDate = useMemo((): Date | null => {
    if (!isRange) return selectedDate ?? null;
    if (activeRangePart === 'end') return endDate ?? selectedDate ?? null;
    return selectedDate ?? endDate ?? null;
  }, [isRange, selectedDate, endDate, activeRangePart]);

  const [displayDate, setDisplayDate] = useState(() =>
    getFirstOfMonth(anchorDate ?? selectedDate ?? endDate ?? new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    () => selectedDate ?? endDate ?? new Date()
  );

  const focusTarget = focusedDate ?? selectedDate ?? endDate ?? new Date();
  const secondMonthDate = addMonths({ date: displayDate, n: 1 });
  const isTwoMonthsVisible = useMedia(`(min-width: ${breakpoints.xs})`);
  /** Current left-column month; read in the anchor sync effect without listing `displayDate` in deps (month nav would retrigger and snap back). */
  const startOfLeftVisibleMonthRef = useRef(displayDate);
  startOfLeftVisibleMonthRef.current = displayDate;
  /** Wraps both month grids so keyboard focus can move between them without treating it as “outside” the calendar. */
  const calendarKeyboardSurfaceRef = useRef<HTMLDivElement>(null);

  /** Set after header month chevrons; cleared when the user enters the grid or the anchor updates. */
  const [pauseGridRoving, setPauseGridRoving] = useState(false);

  const resumeGridRoving = useCallback(() => setPauseGridRoving(false), []);

  const beginHeaderMonthChange = useCallback(
    (nextDisplay: (prev: Date) => Date) => {
      setPauseGridRoving(true);
      setDisplayDate(nextDisplay);
    },
    []
  );

  const onFocusedDateChangeFromGrid = useCallback(
    (next: Date | null) => {
      resumeGridRoving();
      setFocusedDate(next);
    },
    [resumeGridRoving]
  );

  useEffect(() => {
    if (gridFocusRequested) resumeGridRoving();
  }, [gridFocusRequested, resumeGridRoving]);

  const onTabFromMonthNav = useCallback(() => {
    setFocusedDate(getFirstOfMonth(displayDate));
    resumeGridRoving();
    requestAnimationFrame(() => {
      calendarKeyboardSurfaceRef.current
        ?.querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')
        ?.focus();
    });
  }, [displayDate, resumeGridRoving]);

  // When the committed anchor changes while the popover is open (typed input, grid, quick action),
  // move focus to that day. Shift the visible month pair only if the anchor is not already shown
  // (including the second column in a two-month layout), so picking in the right-hand month does
  // not jump the view.
  useEffect(() => {
    if (!isCalendarOpen || !anchorDate) {
      return;
    }

    const alreadyVisible = isDateWithinVisibleMonths({
      date: anchorDate,
      startOfLeftVisibleMonth: startOfLeftVisibleMonthRef.current,
      showSecondMonth: isTwoMonthsVisible,
    });

    if (!alreadyVisible) {
      setDisplayDate(getFirstOfMonth(anchorDate));
    }
    setFocusedDate(anchorDate);
  }, [isCalendarOpen, anchorDate, isTwoMonthsVisible]);

  const onDateSelect = useCallback(
    (date: Date) => {
      if (!isRange) {
        handleDateSelectSingle({
          date,
          selectedDate: context.selectedDate,
          onSelection: context.onSelection,
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
        startDate: context.startDate,
        endDate: context.endDate,
        onRangeSelection: context.onRangeSelection,
        shouldDisableDate,
      });
      if (shouldClose) queueMicrotask(closeCalendar);
    },
    [isRange, setActiveRangePart, context, shouldDisableDate, closeCalendar]
  );

  const clearDate = useCallback(() => {
    if (isRange) context.onRangeSelection(null, null);
    else context.onSelection(null);
    resumeGridRoving();
    setFocusedDate(displayDate);
  }, [isRange, context, setFocusedDate, displayDate, resumeGridRoving]);

  const computedQuickActions: CalendarQuickAction[] = useMemo(() => {
    return quickActions.slice(0, 3).map((action) => ({
      ...action,
      onClick: () => {
        action.onClick?.();
        setActiveRangePart?.(null);
        const { startDate, endDate } = computeQuickAction({
          num: action.num,
          timePeriod: action.timePeriod,
          isRange,
        });
        if (isRange) {
          if (
            rangeContainsDisabled({
              startDate,
              endDate,
              shouldDisableDate,
            })
          ) {
            applyRangeOrNewStart({
              startDate,
              endDate,
              clickedDate: endDate,
              shouldDisableDate,
              onRangeSelection: context.onRangeSelection,
            });
          } else {
            context.onRangeSelection(startDate, endDate);
          }
          setDisplayDate(getFirstOfMonth(endDate));
          setFocusedDate(endDate);
          queueMicrotask(closeCalendar);
        } else {
          context.onSelection(startDate);
          setDisplayDate(getFirstOfMonth(startDate));
          setFocusedDate(startDate);
          queueMicrotask(closeCalendar);
        }
      },
    }));
  }, [
    closeCalendar,
    shouldDisableDate,
    isRange,
    quickActions,
    setActiveRangePart,
    context,
  ]);

  return (
    <CalendarWrapper aria-labelledby={dialogId}>
      <FlexBox p={24} pb={16} ref={calendarKeyboardSurfaceRef}>
        <Box>
          <CalendarHeader
            displayDate={displayDate}
            headingId={headingLeftId}
            hideNextNav={isTwoMonthsVisible}
            interceptTabToGrid={pauseGridRoving}
            locale={locale}
            onDisplayDateChange={(next) => beginHeaderMonthChange(() => next)}
            onTabIntoGrid={onTabFromMonthNav}
          />
          <CalendarBody
            calendarKeyboardSurfaceRef={calendarKeyboardSurfaceRef}
            displayDate={displayDate}
            endDate={endDate}
            focusGridSync={focusGridSync}
            focusedDate={focusTarget}
            hasAdjacentMonthRight={isTwoMonthsVisible}
            labelledById={headingLeftId}
            locale={locale}
            pauseGridRoving={pauseGridRoving}
            selectedDate={selectedDate}
            shouldDisableDate={shouldDisableDate}
            weekStartsOn={weekStartsOn}
            onDateSelect={onDateSelect}
            onDisplayDateChange={setDisplayDate}
            onEscapeKeyPress={closeCalendar}
            onFocusedDateChange={onFocusedDateChangeFromGrid}
          />
        </Box>
        <Box display={{ _: 'none', xs: 'initial' }} pl={{ _: 0, xs: 32 }}>
          <CalendarHeader
            displayDate={secondMonthDate}
            headingId={headingRightId}
            hideLastNav
            interceptTabToGrid={pauseGridRoving}
            locale={locale}
            onDisplayDateChange={() =>
              beginHeaderMonthChange((prev) => addMonths({ date: prev, n: 1 }))
            }
            onTabIntoGrid={onTabFromMonthNav}
          />
          <CalendarBody
            calendarKeyboardSurfaceRef={calendarKeyboardSurfaceRef}
            displayDate={secondMonthDate}
            endDate={endDate}
            focusGridSync={focusGridSync}
            focusedDate={focusTarget}
            hasAdjacentMonthLeft={isTwoMonthsVisible}
            labelledById={headingRightId}
            locale={locale}
            pauseGridRoving={pauseGridRoving}
            selectedDate={selectedDate}
            shouldDisableDate={shouldDisableDate}
            weekStartsOn={weekStartsOn}
            onDateSelect={onDateSelect}
            onDisplayDateChange={() =>
              setDisplayDate((prev) => addMonths({ date: prev, n: 1 }))
            }
            onEscapeKeyPress={closeCalendar}
            onFocusedDateChange={onFocusedDateChangeFromGrid}
          />
        </Box>
      </FlexBox>
      <CalendarFooter
        clearButton={
          isRange
            ? {
                disabled: context.startDate === null && endDate === null,
                onClick: clearDate,
                text: translations.clearButtonText,
              }
            : undefined
        }
        quickActions={computedQuickActions}
      />
    </CalendarWrapper>
  );
};
