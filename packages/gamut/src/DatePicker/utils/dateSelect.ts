import { isDateInRange, isSameDay } from '../Calendar/utils/dateGrid';
import type {
  DatePickerBaseContextValue,
  DatePickerProps,
  DatePickerRangeContextValue,
  DatePickerRangeProps,
} from '../types';

export const isRangeProps = (
  props: DatePickerProps
): props is DatePickerRangeProps => props.mode === 'range';

export type RangeContainsDisabledParams = {
  start: Date;
  end: Date;
  disabledDates: Date[];
};

/** True if any disabled date falls within [start, end] (inclusive, by calendar day). */
export const rangeContainsDisabled = ({
  start,
  end,
  disabledDates,
}: RangeContainsDisabledParams) => {
  return disabledDates.some(
    (date) =>
      isSameDay(date, start) ||
      isSameDay(date, end) ||
      isDateInRange(date, start, end)
  );
};

export type HandleDateSelectSingleParams = {
  date: Date;
  selectedDate: DatePickerBaseContextValue['startOrSelectedDate'];
} & Pick<DatePickerBaseContextValue, 'setSelection'>;

export const handleDateSelectSingle = ({
  date,
  selectedDate,
  setSelection,
}: HandleDateSelectSingleParams) => {
  // If clicked date is the same as Start Date: Clear Start Date
  if (selectedDate && date.getTime() === selectedDate.getTime()) {
    setSelection(null);
    return;
  }
  // If clicked date is not the same as Start Date: Set Start Date to clicked date
  setSelection(date);
};

type ApplyRangeOrNewStartParams = {
  start: Date;
  end: Date;
  clickedDate: Date;
  disabledDates: Date[];
} & Pick<DatePickerBaseContextValue, 'setSelection'>;

/** @returns whether a full start+end range was committed (calendar may close). */
export const applyRangeOrNewStart = ({
  start,
  end,
  clickedDate,
  disabledDates,
  setSelection,
}: ApplyRangeOrNewStartParams) => {
  // if range contains disabled dates, set start date to clicked date and end date to null
  if (rangeContainsDisabled({ start, end, disabledDates })) {
    setSelection(clickedDate, null);
    return false;
  }
  setSelection(start, end);
  return true;
};

export type HandleDateSelectRangeParams = {
  date: Date;
  startDate: DatePickerRangeContextValue['startOrSelectedDate'];
} & Pick<
  DatePickerRangeContextValue,
  'activeRangePart' | 'endDate' | 'setSelection' | 'disabledDates'
>;

/** @returns whether the calendar should close (full range selected and committed). */
export const handleDateSelectRange = ({
  date,
  activeRangePart,
  startDate,
  endDate,
  setSelection,
  disabledDates = [],
}: HandleDateSelectRangeParams) => {
  // Range mode: field targeting (start or end input was focused)
  if (activeRangePart === 'start') {
    if (date.getTime() === startDate?.getTime()) {
      setSelection(null, endDate);
      return false;
    }
    const newEnd =
      endDate != null && date.getTime() <= endDate.getTime() ? endDate : null;
    if (newEnd != null) {
      return applyRangeOrNewStart({
        start: date,
        end: newEnd,
        clickedDate: date,
        disabledDates,
        setSelection,
      });
    }
    setSelection(date, newEnd);
    return false;
  }
  if (activeRangePart === 'end') {
    if (date.getTime() === endDate?.getTime()) {
      setSelection(startDate, null);
      return false;
    }
    const newStart =
      startDate != null && date.getTime() >= startDate.getTime()
        ? startDate
        : null;
    if (newStart != null) {
      return applyRangeOrNewStart({
        start: newStart,
        end: date,
        clickedDate: date,
        disabledDates,
        setSelection,
      });
    }
    setSelection(newStart, date);
    return false;
  }

  // Range selection mode (no field focused: calendar drives both)
  if (startDate && endDate) {
    // if start date is end date and is clicked, clears everything
    if (
      startDate.getTime() === endDate.getTime() &&
      date.getTime() === startDate.getTime()
    ) {
      setSelection(null, null);
      return false;
    }
    // if clicked on start date, end date becomes start date
    if (date.getTime() === startDate.getTime()) {
      setSelection(endDate, null);
      return false;
    }
    // if clicked on end date, clears end date and start remains
    if (date.getTime() === endDate.getTime()) {
      setSelection(startDate, null);
      return false;
    }
    // If clicked date > Start: Updates End Date to new date (Start remains)
    if (date.getTime() > startDate.getTime()) {
      return applyRangeOrNewStart({
        start: startDate,
        end: date,
        clickedDate: date,
        disabledDates,
        setSelection,
      });
    }
    // If clicked date < Start: Updates Start Date to new date (End remains) - extends range to the left
    return applyRangeOrNewStart({
      start: date,
      end: endDate,
      clickedDate: date,
      disabledDates,
      setSelection,
    });
  }
  // Start is Set, End is Empty
  if (startDate && !endDate) {
    // If clicked date < Start: Restarts selection with clicked date as new Start
    if (date.getTime() < startDate.getTime()) {
      setSelection(date, null);
      return false;
    }
    // If clicked date > Start: Sets it as End Date (if range valid)
    return applyRangeOrNewStart({
      start: startDate,
      end: date,
      clickedDate: date,
      disabledDates,
      setSelection,
    });
  }
  setSelection(date, null);
  return false;
};
