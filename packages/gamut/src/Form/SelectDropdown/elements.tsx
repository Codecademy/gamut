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

export const SelectDropdownContext =
  createContext<SelectDropdownContextValueTypes>({
    currentFocusedValue: undefined,
    setCurrentFocusedValue: undefined,
    selectInputRef: undefined,
    removeAllButtonRef: undefined,
  });

export const MultiValueWithColorMode = (props: MultiValueProps) => {
  const { currentFocusedValue, setCurrentFocusedValue } = useContext(
    SelectDropdownContext
  );

  const { value } = (props?.data as any) ?? undefined;

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

  return <MultiValue {...props} />;
};

export const MultiValueRemoveButton = (props: MultiValueRemoveProps) => {
  const { label } = (props?.data as any) ?? '';

  props.innerProps['aria-label'] = `Remove ${label}`;

  return (
    <MultiValueRemove {...props}>
      <MiniDeleteIcon size={12} />
    </MultiValueRemove>
  );
};

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

export const CustomContainer = ({
  children,
  ...rest
}: CustomSelectComponentProps<
  typeof SelectDropdownElements.SelectContainer
>) => {
  const { inputProps, name } = rest.selectProps;

  const value = rest.hasValue
    ? rest
        .getValue()
        .map(({ value }) => value)
        .join(', ')
    : '';

  return (
    <SelectDropdownElements.SelectContainer {...rest}>
      {children}
      <input name={name} type="hidden" value={value} {...inputProps} />
    </SelectDropdownElements.SelectContainer>
  );
};

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

export const formatOptionLabel = ({
  label,
  icon: Icon,
  size,
  subtitle,
  rightLabel,
  disabled,
}: ExtendedOption) => {
  const textColor = disabled ? 'text-disabled' : 'inherit';
  return (
    <FlexBox color={textColor} justifyContent="space-between" width="100%">
      <FlexBox flexDirection="column">
        <FlexBox flexDirection="row">
          {Icon && (
            <FlexBox center>
              <Icon color="text" ml={4} size={size === 'small' ? 16 : 24} />
            </FlexBox>
          )}
          <Box as="span" color={textColor} pl={Icon ? 16 : 0}>
            {label}
          </Box>
        </FlexBox>
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
    </FlexBox>
  );
};

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

export const AbbreviatedSingleValue = (
  props: SingleValueProps<ExtendedOption>
) => {
  const { data } = props;

  const displayText = data?.abbreviation
    ? data.abbreviation
    : data?.label || '';

  return <SingleValue {...props}>{displayText}</SingleValue>;
};

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
