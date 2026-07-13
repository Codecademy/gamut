export interface DatePickerTranslations {
  /** Label for the clear date button (default: "Clear"). */
  clearButtonText?: string;
  /** Label for the date input in single mode (default: "Date"). */
  dateLabel?: string;
  /** Label for the start date input in range mode (default: "Start date"). */
  startDateLabel?: string;
  /** Label for the end date input in range mode (default: "End date"). */
  endDateLabel?: string;
  /** aria-label for the calendar dialog (default: "Choose date"). */
  calendarDialogAriaLabel?: string;
  /** aria-label for the calendar icon trigger (default: "Open calendar"). */
  openCalendarLabel?: string;
  /** Label for the last 7 days quick action (default: "Last 7 days"). */
  last7DaysDisplayText?: string;
  /** Label for the last 30 days quick action (default: "Last 30 days"). */
  last30DaysDisplayText?: string;
  /** Label for the last 90 days quick action (default: "Last 90 days"). */
  last90DaysDisplayText?: string;
  /** Error message for incomplete date entry (default: "Incomplete date"). */
  invalidDateIncomplete?: string;
  /** Error message for invalid month (default: "Month must be between 1 and 12"). */
  invalidDateInvalidMonth?: string;
  /** Error message for invalid day (default: "{{month}} does not have {{day}} days"). Supports {{month}} and {{day}} template variables. */
  invalidDateInvalidDay?: string;
  /** Error message for date rollover (default: "{{month}} does not have {{day}} days"). Supports {{month}} and {{day}} template variables. */
  invalidDateRollover?: string;
  /** Error message for disabled/unavailable date (default: "This date is not available"). */
  invalidDateNotAvailable?: string;
  /** Error message for date range containing disabled dates (default: "This date range contains unavailable dates"). */
  invalidDateRangeContainsDisabledDate?: string;
}

export const DEFAULT_DATE_PICKER_TRANSLATIONS: Required<DatePickerTranslations> =
  {
    clearButtonText: 'Clear',
    dateLabel: 'Date',
    startDateLabel: 'Start date',
    endDateLabel: 'End date',
    calendarDialogAriaLabel: 'Choose date',
    openCalendarLabel: 'Open calendar',
    last7DaysDisplayText: 'Last 7 days',
    last30DaysDisplayText: 'Last 30 days',
    last90DaysDisplayText: 'Last 90 days',
    invalidDateIncomplete: 'Incomplete date',
    invalidDateInvalidMonth: 'Month must be between 1 and 12',
    invalidDateInvalidDay: '{{month}} does not have {{day}} days',
    invalidDateRollover: '{{month}} does not have {{day}} days',
    invalidDateNotAvailable: 'This date is not available',
    invalidDateRangeContainsDisabledDate:
      'This date range contains unavailable dates',
  };
