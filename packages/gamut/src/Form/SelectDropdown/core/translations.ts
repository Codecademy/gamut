import * as React from 'react';

import { ExtendedOption } from '../types/options';

/**
 * Function form of the no-options message: receives the current input value
 * and returns content (e.g. a localized "No results for '{inputValue}'").
 */
export type ValidationMessageFn = (obj: {
  inputValue: string;
}) => React.ReactNode;

/**
 * Message shown inside the menu when no option matches. Either static content
 * or a function of the current input value.
 */
export type ValidationMessage = React.ReactNode | ValidationMessageFn;

/**
 * Custom translations for SelectDropdown's UI / microcopy strings.
 * Pass a partial object via the `translations` prop; provided keys are merged
 * over these English defaults (see `DEFAULT_SELECT_DROPDOWN_TRANSLATIONS`).
 */
export interface SelectDropdownTranslations {
  /** Placeholder text shown when no option is selected.
   * Placeholder text is not recommended for accessibility. If you need to use placeholder text,
   * please make sure the placeholder text doesn't add any new information to the input.
   * I.e - if the placeholder text describes an action you'd like the user to take, please use a label instead.
   *
   * @default "Select an option"
   */
  placeholder: string;
  /**
   * Replaces the default "No options" text shown inside the dropdown menu
   * whenever no option matches the current input - an empty `options` array,
   * or every option filtered out by a search. Not tied to `isCreatable`; any
   * searchable SelectDropdown can use it. Accepts a `ReactNode`, or a function
   * receiving `{ inputValue }` for live, input-specific validation/error copy
   * (e.g. "No results for '{inputValue}'").
   *
   * @default "No options"
   */
  validationMessage: ValidationMessage;
  /**
   * Customises the label shown in the "Add" row.
   *
   * @default (inputValue) => `Add "${inputValue}"`
   */
  formatCreateLabel: (inputValue: string) => React.ReactNode;
  /**
   * aria-label for a multi-select value's remove button.
   * @default (label) => `Remove ${label}`
   */
  removeOptionLabel: (label: string) => string;
  /**
   * aria-label for the multi-select "remove all" button
   * @default "Remove all selected"
   */
  removeAllLabel: string;
  /**
   * Screen-reader announcement made when an option is focused.
   * Default describes the option's label, subtitle, right label, and disabled state.
   */
  focusedOptionAnnouncement: (option: ExtendedOption) => string;
}

/**
 * Default English translations. Kept internal (not re-exported from the package)
 * — only the `SelectDropdownTranslations` type is public, matching BarChart/DatePicker.
 */
export const DEFAULT_SELECT_DROPDOWN_TRANSLATIONS: SelectDropdownTranslations =
  {
    placeholder: 'Select an option',
    validationMessage: 'No options',
    formatCreateLabel: (inputValue: string) => `Add "${inputValue}"`,
    removeOptionLabel: (label: string) => `Remove ${label}`,
    removeAllLabel: 'Remove all selected',
    focusedOptionAnnouncement: ({ label, subtitle, rightLabel, disabled }) =>
      [
        `You are currently focused on option ${label}`,
        subtitle,
        rightLabel,
        disabled && 'disabled',
      ]
        .filter(Boolean)
        .join(', '),
  };
