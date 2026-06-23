/** Fixed width of each segmented date field shell (matches design spec). */
export const DATE_PICKER_FIELD_WIDTH = '170px';

/** Horizontal space reserved for the range arrow between start and end fields. */
export const DATE_PICKER_RANGE_ARROW_WIDTH = 24;

/** Vertical space reserved below each field shell for validation error text. */
export const DATE_PICKER_ERROR_SLOT_HEIGHT = 20;

/** Height of the segmented shell row (used to align the range arrow with inputs). */
export const DATE_PICKER_SHELL_HEIGHT = {
  base: 48,
  small: 32,
} as const;
