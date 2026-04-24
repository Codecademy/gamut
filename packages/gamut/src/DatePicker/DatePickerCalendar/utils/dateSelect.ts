import type {
  DatePickerRangeContextValue,
  DatePickerSingleContextValue,
} from '../../DatePickerContext/types';
import { DatePickerSharedProps } from '../../sharedTypes';
import type { DatePickerProps, DatePickerRangeProps } from '../../types';
import {
  getOrderedCalendarEndpoints,
  isDateDisabled,
  isDateInRange,
  isSameDay,
} from '../Calendar/utils/dateGrid';

export const isRangeProps = (
  props: DatePickerProps
): props is DatePickerRangeProps => props.mode === 'range';

type RangeContainsDisabledParams = {
  startDate: Date;
  endDate: Date;
} & Pick<DatePickerSharedProps, 'shouldDisableDate'>;

export const rangeContainsDisabled = ({
  startDate,
  endDate,
  shouldDisableDate,
}: RangeContainsDisabledParams) => {
  const { low, high } = getOrderedCalendarEndpoints({ startDate, endDate });

  if (
    isDateDisabled({ date: low, shouldDisableDate }) ||
    isDateDisabled({ date: high, shouldDisableDate })
  ) {
    return true;
  }

  let date = new Date(low.getFullYear(), low.getMonth(), low.getDate() + 1);
  while (isDateInRange({ date, startDate, endDate })) {
    if (isDateDisabled({ date, shouldDisableDate })) {
      return true;
    }
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  }
  return false;
};

type HandleDateSelectSingleParams = {
  date: Date;
} & Pick<DatePickerSingleContextValue, 'onSelection' | 'selectedDate'>;

export const handleDateSelectSingle = ({
  date,
  selectedDate,
  onSelection,
}: HandleDateSelectSingleParams) => {
  if (isSameDay(date, selectedDate)) {
    onSelection(null);
    return;
  }
  onSelection(date);
};

type ApplyRangeOrNewStartParams = {
  startDate: Date;
  endDate: Date;
  clickedDate: Date;
} & Pick<DatePickerRangeContextValue, 'onRangeSelection' | 'shouldDisableDate'>;

/** @returns whether a full startDate+endDate range was committed (calendar may close). */
export const applyRangeOrNewStart = ({
  startDate,
  endDate,
  clickedDate,
  shouldDisableDate,
  onRangeSelection,
}: ApplyRangeOrNewStartParams) => {
  if (rangeContainsDisabled({ startDate, endDate, shouldDisableDate })) {
    onRangeSelection(clickedDate, null);
    return false;
  }
  onRangeSelection(startDate, endDate);
  return true;
};

type HandleDateSelectRangeParams = {
  date: Date;
} & Pick<
  DatePickerRangeContextValue,
  | 'activeRangePart'
  | 'endDate'
  | 'onRangeSelection'
  | 'shouldDisableDate'
  | 'startDate'
>;

/** @returns whether the calendar should close (full range selected and committed). */
export const handleDateSelectRange = ({
  date,
  activeRangePart,
  startDate,
  endDate,
  onRangeSelection,
  shouldDisableDate,
}: HandleDateSelectRangeParams) => {
  // Field targeting: start or end input was focused
  if (activeRangePart === 'start') {
    if (isSameDay(date, startDate)) {
      onRangeSelection(null, endDate);
      return false;
    }
    const newEndDate =
      endDate !== null && date.getTime() <= endDate.getTime() ? endDate : null;
    if (newEndDate !== null) {
      return applyRangeOrNewStart({
        startDate: date,
        endDate: newEndDate,
        clickedDate: date,
        shouldDisableDate,
        onRangeSelection,
      });
    }
    onRangeSelection(date, newEndDate);
    return false;
  }
  if (activeRangePart === 'end') {
    if (isSameDay(date, endDate)) {
      onRangeSelection(startDate, null);
      return false;
    }
    const newStartDate =
      startDate !== null && date.getTime() >= startDate.getTime()
        ? startDate
        : null;
    if (newStartDate !== null) {
      return applyRangeOrNewStart({
        startDate: newStartDate,
        endDate: date,
        clickedDate: date,
        shouldDisableDate,
        onRangeSelection,
      });
    }
    onRangeSelection(newStartDate, date);
    return false;
  }

  // Selection mode (no field focused: calendar drives both)
  if (startDate && endDate) {
    if (isSameDay(startDate, endDate) && isSameDay(date, startDate)) {
      onRangeSelection(null, null);
      return false;
    }
    // if clicked on start date, end date becomes start date
    if (isSameDay(date, startDate)) {
      onRangeSelection(endDate, null);
      return false;
    }
    // if clicked on end date, clears end date and start remains
    if (isSameDay(date, endDate)) {
      onRangeSelection(startDate, null);
      return false;
    }
    // If clicked date > Start: Updates End Date to new date (Start remains)
    if (date.getTime() > startDate.getTime()) {
      return applyRangeOrNewStart({
        startDate,
        endDate: date,
        clickedDate: date,
        shouldDisableDate,
        onRangeSelection,
      });
    }
    // If clicked date < Start: Updates Start Date to new date (End remains) - extends range to the left
    return applyRangeOrNewStart({
      startDate: date,
      endDate,
      clickedDate: date,
      shouldDisableDate,
      onRangeSelection,
    });
  }
  // Start is Set, End is Empty
  if (startDate && !endDate) {
    // If clicked date < Start: Restarts selection with clicked date as new Start
    if (date.getTime() < startDate.getTime()) {
      onRangeSelection(date, null);
      return false;
    }
    // If clicked date > Start: Sets it as End Date (if range valid)
    return applyRangeOrNewStart({
      startDate,
      endDate: date,
      clickedDate: date,
      shouldDisableDate,
      onRangeSelection,
    });
  }
  onRangeSelection(date, null);
  return false;
};
