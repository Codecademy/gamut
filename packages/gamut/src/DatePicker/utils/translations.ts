/** Optional translations for DatePicker UI strings. Pass to override defaults. */
export interface DatePickerTranslations {
  /** Label for the clear date button (default: "Clear"). */
  clearText?: string;
  /** Default label for the date input in single mode (default: "Date"). */
  dateLabel?: string;
  /** Default label for the start date input in range mode (default: "Start date"). */
  startDateLabel?: string;
  /** Default label for the end date input in range mode (default: "End date"). */
  endDateLabel?: string;
  /** aria-label for the calendar dialog (default: "Choose date"). */
  calendarDialogAriaLabel?: string;
  /** Default label for the last 7 days quick action (default: "Last 7 days"). */
  last7DaysDisplayText?: string;
  /** Default label for the last 30 days quick action (default: "Last 30 days"). */
  last30DaysDisplayText?: string;
  /** Default label for the last 90 days quick action (default: "Last 90 days"). */
  last90DaysDisplayText?: string;
}

/** Default UI strings; pass translations prop to override. */
export const DEFAULT_DATE_PICKER_TRANSLATIONS: Required<DatePickerTranslations> =
  {
    clearText: 'Clear',
    dateLabel: 'Date',
    startDateLabel: 'Start date',
    endDateLabel: 'End date',
    calendarDialogAriaLabel: 'Choose date',
    last7DaysDisplayText: 'Last 7 days',
    last30DaysDisplayText: 'Last 30 days',
    last90DaysDisplayText: 'Last 90 days',
  };
