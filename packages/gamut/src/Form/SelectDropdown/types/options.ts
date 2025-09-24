import { GamutIconProps } from '@codecademy/gamut-icons';
import * as React from 'react';
import { GroupBase } from 'react-select';

import { SelectOptions } from '../../inputs/Select';
import { SelectDropdownSizes } from './styles';

/**
 * Basic option structure with required label and value properties.
 * This is the minimal interface that all select options must implement.
 */
export interface OptionStrict {
  /** The display text for the option */
  label: string;
  /** The unique value for the option */
  value: string;
}

/**
 * Option with optional icon support.
 * Extends the basic option structure to include an icon component.
 */
export interface IconOption extends OptionStrict {
  /** Optional icon component to display alongside the label */
  icon?: React.ComponentType<GamutIconProps>;
}

/**
 * Extended option with additional display features.
 * Supports icons, subtitles, right labels, abbreviations, and disabled state.
 */
export interface ExtendedOption extends IconOption, SelectDropdownSizes {
  /** Optional subtitle text displayed below the main label */
  subtitle?: string;
  /** Whether the option is disabled and cannot be selected */
  disabled?: boolean;
  /** Optional text displayed on the right side of the option */
  rightLabel?: string;
  /** The abbreviated text shown in the input when selected */
  abbreviation?: string;
}

/**
 * Group structure for organizing options into categories.
 * Extends react-select's GroupBase with optional divider support.
 */
export interface SelectDropdownGroup extends GroupBase<ExtendedOption> {
  /** Whether to show a visual divider above this group */
  divider?: boolean;
}

export type SelectDropdownOptions =
  | SelectOptions
  | IconOption[]
  | ExtendedOption[]
  | SelectDropdownGroup[];
