import { CheckIcon } from '@codecademy/gamut-icons';
import {
  components as SelectDropdownElements,
  SingleValueProps,
} from 'react-select';

import { Box, FlexBox } from '../../../Box';
import {
  CustomSelectComponentProps,
  ExtendedOption,
  SelectDropdownGroup,
} from '../types';
import { selectedIconSize } from './constants';

const { SingleValue } = SelectDropdownElements;

const OptionWrapper: React.FC<
  Pick<ExtendedOption, 'disabled'> & React.PropsWithChildren
> = ({ children, disabled }) => {
  const textColor = disabled ? 'text-disabled' : 'inherit';

  return (
    <FlexBox color={textColor} justifyContent="space-between" width="100%">
      {children}
    </FlexBox>
  );
};

const IconOptionLabel: React.FC<
  Pick<ExtendedOption, 'label' | 'icon' | 'size'>
> = ({ label, icon: Icon, size }) => {
  return (
    <FlexBox flexDirection="row">
      {Icon && (
        <FlexBox center>
          <Icon color="text" ml={4} size={size === 'small' ? 16 : 24} />
        </FlexBox>
      )}
      <Box as="span" color="currentColor" pl={Icon ? 16 : 0}>
        {label}
      </Box>
    </FlexBox>
  );
};

/**
 * Custom option component that displays a check icon for selected items.
 * Also manages ARIA attributes for accessibility.
 */
export const IconOption = ({
  children,
  ...rest
}: CustomSelectComponentProps<typeof SelectDropdownElements.Option>) => {
  const { size } = rest.selectProps;
  const { isFocused, innerProps } = rest;

  return (
    <SelectDropdownElements.Option
      {...rest}
      innerProps={{ ...innerProps, 'aria-selected': isFocused }}
    >
      {children}
      {rest?.isSelected && (
        <CheckIcon size={selectedIconSize[size ?? 'medium']} />
      )}
    </SelectDropdownElements.Option>
  );
};

/**
 * Custom single value component that displays abbreviated text when available.
 * This is only for selected single values - we notablely do not want rightLabel or subtitle here.
 * Falls back to the full label if no abbreviation is provided.
 */
export const AbbreviatedSingleValue = (
  props: SingleValueProps<ExtendedOption, false>
) => {
  const { isDisabled } = props;
  const { data } = props;
  const { label, icon, size } = data;
  const displayText = data?.abbreviation ? data.abbreviation : label || '';

  return (
    <SingleValue {...props}>
      <OptionWrapper disabled={isDisabled}>
        <IconOptionLabel icon={icon} label={displayText} size={size} />
      </OptionWrapper>
    </SingleValue>
  );
};

/**
 * Formats an option label with icon, subtitle, and right label support.
 * Handles disabled state styling and responsive layout.
 *
 * @param option - The extended option to format
 * @returns JSX element representing the formatted option
 */
export const formatOptionLabel = ({
  label,
  icon: Icon,
  size,
  subtitle,
  rightLabel,
  disabled,
}: ExtendedOption) => {
  return (
    <OptionWrapper disabled={disabled}>
      <FlexBox flexDirection="column">
        <IconOptionLabel icon={Icon} label={label} size={size} />
        {subtitle && (
          <Box as="span" color="text-disabled" fontSize={14}>
            {subtitle}
          </Box>
        )}
      </FlexBox>
      {rightLabel && (
        <FlexBox
          alignItems="center"
          aria-label={rightLabel}
          flexGrow={1}
          fontSize={14}
          justifyContent="flex-end"
          pr={16}
          textAlign="right"
        >
          {rightLabel}
        </FlexBox>
      )}
    </OptionWrapper>
  );
};

/**
 * Formats a group label, optionally rendering a visual divider.
 *
 * @param group - The group to format
 * @returns JSX element representing the formatted group label or divider
 */
export const formatGroupLabel = ({ label, divider }: SelectDropdownGroup) => {
  if (divider) {
    return (
      <Box display="flex" justify-content="center">
        <Box
          bg="text-disabled"
          borderRadius="md"
          fit
          height="1px"
          mx={16}
          width="100%"
        />
      </Box>
    );
  }
  return label;
};
