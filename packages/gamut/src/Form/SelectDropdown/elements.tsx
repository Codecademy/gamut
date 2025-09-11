import {
  ArrowChevronDownIcon,
  CheckIcon,
  CloseIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
  SearchIcon,
} from '@codecademy/gamut-icons';
import { css, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { createContext, CSSProperties, KeyboardEvent, useContext } from 'react';
import ReactSelect, {
  AriaOnFocus,
  components as SelectDropdownElements,
  GroupBase,
  MultiValueProps,
  MultiValueRemoveProps,
  Props,
  SingleValueProps,
} from 'react-select';

import { Box, FlexBox } from '../../Box';
import {
  CustomSelectComponentProps,
  ExtendedOption,
  SelectDropdownContextValueTypes,
  SelectDropdownGroup,
  SizedIndicatorProps,
  TypedReactSelectProps,
} from './types';

const { DropdownIndicator, MultiValue, MultiValueRemove, SingleValue } =
  SelectDropdownElements;

/*
 * ============================================================================
 * Context and constants
 * ============================================================================
 */

/**
 * React context for sharing state between SelectDropdown components.
 * Provides access to focus state and refs for keyboard navigation.
 */
export const SelectDropdownContext =
  createContext<SelectDropdownContextValueTypes>({
    currentFocusedValue: undefined,
    setCurrentFocusedValue: undefined,
    selectInputRef: undefined,
    removeAllButtonRef: undefined,
  });

const iconSize = { small: 12, medium: 16 };
const selectedIconSize = { small: 16, medium: 24 };

const indicatorIcons = {
  smallChevron: {
    size: iconSize.small,
    icon: MiniChevronDownIcon,
  },
  mediumChevron: {
    size: iconSize.medium,
    icon: ArrowChevronDownIcon,
  },
  smallSearchable: {
    size: iconSize.small,
    icon: SearchIcon,
  },
  mediumSearchable: {
    size: iconSize.medium,
    icon: SearchIcon,
  },
  smallRemove: {
    size: iconSize.small,
    icon: MiniDeleteIcon,
  },
  mediumRemove: {
    size: iconSize.medium,
    icon: CloseIcon,
  },
};

/*
 * ============================================================================
 * Multi-value components
 * ============================================================================
 */

/**
 * Custom multi-value component that manages focus state for keyboard navigation.
 * Tracks which multi-value is currently focused and updates the context accordingly.
 */
export const MultiValueWithColorMode = (
  props: MultiValueProps<ExtendedOption, true, GroupBase<ExtendedOption>>
) => {
  const { currentFocusedValue, setCurrentFocusedValue } = useContext(
    SelectDropdownContext
  );

  const { data } = props;

  const { value, label } = data;

  if (
    props.isFocused &&
    setCurrentFocusedValue &&
    currentFocusedValue !== value
  ) {
    setCurrentFocusedValue(value);
  }

  if (
    !props.isFocused &&
    setCurrentFocusedValue &&
    currentFocusedValue === value
  ) {
    setCurrentFocusedValue(undefined);
  }
  const displayText = data?.abbreviation ? data.abbreviation : label || '';

  return <MultiValue {...props}>{displayText}</MultiValue>;
};

/**
 * Custom remove button for multi-value items.
 * Provides accessible removal functionality with proper ARIA labels.
 */
export const MultiValueRemoveButton = (
  props: MultiValueRemoveProps<ExtendedOption, true, GroupBase<ExtendedOption>>
) => {
  const { label } = props?.data ?? { label: '' };

  props.innerProps['aria-label'] = `Remove ${label}`;

  return (
    <MultiValueRemove {...props}>
      <MiniDeleteIcon size={12} />
    </MultiValueRemove>
  );
};

/*
 * ============================================================================
 * Indicator components
 * ============================================================================
 */

/**
 * Custom dropdown indicator that shows either a chevron or search icon.
 * The icon type depends on whether the select is searchable or not.
 */
export const DropdownButton = (props: SizedIndicatorProps) => {
  const { size, isSearchable } = props.selectProps;
  const color = props.isDisabled ? 'text-disabled' : 'text';
  const iconSize = size ?? 'medium';
  const iconType = isSearchable ? 'Searchable' : 'Chevron';
  const { ...iconProps } = indicatorIcons[`${iconSize}${iconType}`];
  const { icon: IndicatorIcon } = iconProps;

  return (
    <DropdownIndicator {...props}>
      <IndicatorIcon {...iconProps} color={color} />
    </DropdownIndicator>
  );
};

const CustomStyledRemoveAllDiv = styled('div')(
  css({
    '&:focus': {
      outline: `2px solid ${theme.colors.primary}`,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.primary}`,
    },
  })
);

/**
 * Custom remove all button for multi-select mode.
 * Provides keyboard navigation and accessible removal of all selected values.
 */
export const RemoveAllButton = (props: SizedIndicatorProps) => {
  const {
    getStyles,
    innerProps: { ...restInnerProps },
    selectProps: { size },
  } = props;

  const { removeAllButtonRef, selectInputRef } = useContext(
    SelectDropdownContext
  );

  const iconSize = size ?? 'medium';
  const { ...iconProps } = indicatorIcons[`${iconSize}Remove`];
  const { icon: IndicatorIcon } = iconProps;

  const onKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && restInnerProps.onMouseDown) {
      restInnerProps.onMouseDown(e as any);
    }

    if (
      selectInputRef?.current &&
      (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown')
    ) {
      selectInputRef?.current.focus();
    }
  };

  const style = getStyles('clearIndicator', props) as CSSProperties;

  return (
    <CustomStyledRemoveAllDiv
      aria-label="Remove all selected"
      role="button"
      tabIndex={0}
      {...restInnerProps}
      ref={removeAllButtonRef}
      style={style}
      onKeyDown={onKeyPress}
    >
      <IndicatorIcon {...iconProps} color="text" />
    </CustomStyledRemoveAllDiv>
  );
};

/*
 * ============================================================================
 * Container components
 * ============================================================================
 */

/**
 * Custom container component that adds a hidden input for form submission.
 * Renders the selected values as a comma-separated string in the hidden input.
 */
export const CustomContainer = ({
  children,
  ...rest
}: CustomSelectComponentProps<
  typeof SelectDropdownElements.SelectContainer
>) => {
  const { inputProps, name } = rest.selectProps;
  const hasInputProps = inputProps && Object.keys(inputProps).length > 0;

  const value = rest.hasValue
    ? rest
        .getValue()
        .map(({ value }) => value)
        .join(', ')
    : '';

  return (
    <SelectDropdownElements.SelectContainer {...rest}>
      {children}
      {hasInputProps && (
        <input name={name} type="hidden" value={value} {...inputProps} />
      )}
    </SelectDropdownElements.SelectContainer>
  );
};

/**
 * Typed wrapper around react-select component.
 * Provides type safety for the underlying react-select implementation.
 */
export function TypedReactSelect<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  selectRef,
  ...props
}: Props<OptionType, IsMulti, GroupType> & TypedReactSelectProps) {
  return <ReactSelect {...props} ref={selectRef} />;
}

/*
 * ============================================================================
 * Option components
 * ============================================================================
 */

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

/*
 * ============================================================================
 * Utility functions
 * ============================================================================
 */

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
