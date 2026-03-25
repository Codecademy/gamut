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
}

/** Default UI strings; pass translations prop to override. */
export const DEFAULT_DATE_PICKER_TRANSLATIONS: Required<DatePickerTranslations> =
  {
    clearText: 'Clear',
    dateLabel: 'Date',
    startDateLabel: 'Start date',
    endDateLabel: 'End date',
    calendarDialogAriaLabel: 'Choose date',
  };
