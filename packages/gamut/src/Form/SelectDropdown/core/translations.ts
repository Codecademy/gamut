import * as React from 'react';

/**
 * Shape of the focused option passed to `focusedOptionAnnouncement`.
 * Mirrors the fields react-select exposes on the focused option.
 */
export interface FocusedOptionAnnouncementContext {
  /** The display text for the focused option */
  label: string;
  /** Optional subtitle text of the focused option */
  subtitle?: string;
  /** Optional right-aligned label of the focused option */
  rightLabel?: string;
  /** Whether the focused option is disabled */
  disabled?: boolean;
}

/**
 * Custom translations for SelectDropdown's UI / microcopy strings.
 * Pass a partial object via the `translations` prop; provided keys are merged
 * over these English defaults (see `DEFAULT_SELECT_DROPDOWN_TRANSLATIONS`).
 */
export interface SelectDropdownTranslations {
  /** Placeholder text shown when no option is selected (default: "Select an option"). */
  placeholder: string;
  /**
   * Text shown inside the menu when no option matches the current input
   * (default: "No options"). Overridden by an explicit `validationMessage` prop.
   */
  noOptionsMessage: string;
  /**
   * Builds the label for the creatable "Add" row.
   * Default: `(inputValue) => `Add "${inputValue}"``.
   */
  formatCreateLabel: (inputValue: string) => React.ReactNode;
  /**
   * Builds the aria-label for a multi-select value's remove button.
   * Default: `(label) => `Remove ${label}``.
   */
  removeOptionLabel: (label: string) => string;
  /** aria-label for the multi-select "remove all" button (default: "Remove all selected"). */
  clearAllLabel: string;
  /**
   * Builds the screen-reader announcement made when an option is focused.
   * Default describes the option's label, subtitle, right label, and disabled state.
   */
  focusedOptionAnnouncement: (
    option: FocusedOptionAnnouncementContext
  ) => string;
}

/**
 * Default English translations. Kept internal (not re-exported from the package)
 * — only the `SelectDropdownTranslations` type is public, matching BarChart/DatePicker.
 */
export const DEFAULT_SELECT_DROPDOWN_TRANSLATIONS: SelectDropdownTranslations =
  {
    placeholder: 'Select an option',
    noOptionsMessage: 'No options',
    formatCreateLabel: (inputValue: string) => `Add "${inputValue}"`,
    removeOptionLabel: (label: string) => `Remove ${label}`,
    clearAllLabel: 'Remove all selected',
    focusedOptionAnnouncement: ({ label, subtitle, rightLabel, disabled }) =>
      `You are currently focused on option ${label}${
        subtitle ? `, ${subtitle}` : ''
      } ${rightLabel ? `, ${rightLabel}` : ''}${disabled ? ', disabled' : ''}`,
  };
