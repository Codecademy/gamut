import { isDateInRange, isSameDay } from './Calendar/utils/dateGrid';
import { ActiveRangePart } from './types';

/** True if any disabled date falls within [start, end] (inclusive, by calendar day). */
export const rangeContainsDisabled = (
  start: Date,
  end: Date,
  disabledDates: Date[]
) => {
  return disabledDates.some(
    (date) =>
      isSameDay(date, start) ||
      isSameDay(date, end) ||
      isDateInRange(date, start, end)
  );
};

export const handleDateSelectSingle = (
  date: Date,
  selectedDate: Date | null,
  setSelection: (date: Date | null) => void
) => {
  // If clicked date is the same as Start Date: Clear Start Date
  if (selectedDate && date.getTime() === selectedDate.getTime()) {
    setSelection(null);
    return;
  }
  // If clicked date is not the same as Start Date: Set Start Date to clicked date
  setSelection(date);
};

const applyRangeOrNewStart = (
  start: Date,
  end: Date,
  clickedDate: Date,
  disabledDates: Date[],
  setSelection: (startDate: Date | null, endDate?: Date | null) => void
) => {
  // if range contains disabled dates, set start date to clicked date and end date to null
  if (rangeContainsDisabled(start, end, disabledDates)) {
    setSelection(clickedDate, null);
  } else {
    setSelection(start, end);
  }
};

export const handleDateSelectRange = (
  date: Date,
  activeRangePart: ActiveRangePart,
  startDate: Date | null,
  endDate: Date | null,
  setSelection: (startDate: Date | null, endDate?: Date | null) => void,
  disabledDates: Date[]
) => {
  // Range mode: field targeting (start or end input was focused)
  if (activeRangePart === 'start') {
    if (date.getTime() === startDate?.getTime()) {
      setSelection(null, endDate);
      return;
    }
    const newEnd =
      endDate != null && date.getTime() <= endDate.getTime() ? endDate : null;
    if (newEnd != null) {
      applyRangeOrNewStart(date, newEnd, date, disabledDates, setSelection);
    } else {
      setSelection(date, newEnd);
    }
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
    if (newStart != null) {
      applyRangeOrNewStart(newStart, date, date, disabledDates, setSelection);
    } else {
      setSelection(newStart, date);
    }
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
    if (date.getTime() === startDate.getTime()) {
      setSelection(endDate, null);
      return;
    }
    // if clicked on end date, clears end date and start remains
    if (date.getTime() === endDate.getTime()) {
      setSelection(startDate, null);
      return;
    }
    // If clicked date > Start: Updates End Date to new date (Start remains)
    if (date.getTime() > startDate.getTime()) {
      applyRangeOrNewStart(startDate, date, date, disabledDates, setSelection);
      return;
    }
    // If clicked date < Start: Updates Start Date to new date (End remains) - extends range to the left
    applyRangeOrNewStart(date, endDate, date, disabledDates, setSelection);
    return;
  }
  // Start is Set, End is Empty
  if (startDate && !endDate) {
    // If clicked date < Start: Restarts selection with clicked date as new Start
    if (date.getTime() < startDate.getTime()) {
      setSelection(date, null);
    } else {
      // If clicked date > Start: Sets it as End Date (if range valid)
      applyRangeOrNewStart(startDate, date, date, disabledDates, setSelection);
    }
    return;
  }
  setSelection(date, null);
};
