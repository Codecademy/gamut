import {
  AriaOnFocus,
  components as SelectDropdownElements,
} from 'react-select';

import { ExtendedOption, SizedIndicatorProps } from '../types';
import { indicatorIcons } from './constants';

const { DropdownIndicator } = SelectDropdownElements;

/**
 * Generates accessible focus messages for screen readers.
 * Provides detailed information about the currently focused option.
 *
 * @param params - Object containing the focused option details
 * @returns Formatted accessibility message
 */
export const onFocus: AriaOnFocus<ExtendedOption> = ({
  focused: { label, subtitle, rightLabel, disabled },
}) => {
  const formattedSubtitle = `, ${subtitle}`;
  const formattedRightLabel = `, ${rightLabel}`;

  const msg = `You are currently focused on option ${label}${
    subtitle ? formattedSubtitle : ''
  } ${rightLabel ? formattedRightLabel : ''}${disabled ? ', disabled' : ''}`;

  return msg;
};

/**
 * Custom dropdown indicator that shows either a chevron or search icon.
 * The icon type depends on whether the select is searchable or not.
 */
export const DropdownButton = (props: SizedIndicatorProps) => {
  const { size } = props.selectProps;
  const color = props.isDisabled ? 'text-disabled' : 'text';
  const iconSize = size ?? 'medium';
  const { ...iconProps } = indicatorIcons[`${iconSize}Chevron`];
  const { icon: IndicatorIcon } = iconProps;

  return (
    <DropdownIndicator {...props}>
      <IndicatorIcon {...iconProps} color={color} />
    </DropdownIndicator>
  );
};
