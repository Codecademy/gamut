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
  /** Error message when typed segments do not form a valid date (default: "Enter a valid date"). */
  invalidDateError?: string;
  /** Label for the last 7 days quick action (default: "Last 7 days"). */
  last7DaysDisplayText?: string;
  /** Label for the last 30 days quick action (default: "Last 30 days"). */
  last30DaysDisplayText?: string;
  /** Label for the last 90 days quick action (default: "Last 90 days"). */
  last90DaysDisplayText?: string;
}

export const DEFAULT_DATE_PICKER_TRANSLATIONS: Required<DatePickerTranslations> =
  {
    clearButtonText: 'Clear',
    dateLabel: 'Date',
    startDateLabel: 'Start date',
    endDateLabel: 'End date',
    calendarDialogAriaLabel: 'Choose date',
    openCalendarLabel: 'Open calendar',
    invalidDateError: 'Enter a valid date',
    last7DaysDisplayText: 'Last 7 days',
    last30DaysDisplayText: 'Last 30 days',
    last90DaysDisplayText: 'Last 90 days',
  };
