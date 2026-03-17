import { ActiveRangePart } from './types';

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

export const handleDateSelectRange = (
  date: Date,
  activeRangePart: ActiveRangePart,
  startDate: Date | null,
  endDate: Date | null,
  setSelection: (startDate: Date | null, endDate?: Date | null) => void
) => {
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
      setSelection(startDate, date);
      return;
    }
    // If clicked date < Start: Updates Start Date to new date (End remains) - extends range to the left

    setSelection(date, endDate);
    return;
  }
  // Start is Set, End is Empty
  if (startDate && !endDate) {
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
