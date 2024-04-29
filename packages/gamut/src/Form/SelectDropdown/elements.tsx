import {
  ArrowChevronDownIcon,
  CheckIcon,
  CloseIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
  SearchIcon,
} from '@codecademy/gamut-icons';
import { ColorMode, css, theme, useColorModes } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { createContext, CSSProperties, KeyboardEvent, useContext } from 'react';
import ReactSelect, {
  AriaOnFocus,
  components as SelectDropdownElements,
  GroupBase,
  MultiValueProps,
  MultiValueRemoveProps,
  Props,
} from 'react-select';

import { Box } from '../../Box';
import {
  CustomSelectComponentProps,
  ExtendedOption,
  SelectDropdownContextValueTypes,
  SelectDropdownGroup,
  SizedIndicatorProps,
  TypedReactSelectProps,
} from './types';

const {
  DropdownIndicator,
  MultiValue,
  MultiValueRemove,
  SelectContainer,
  Option,
} = SelectDropdownElements;

export const SelectDropdownContext = createContext<SelectDropdownContextValueTypes>(
  {
    currentFocusedValue: undefined,
    setCurrentFocusedValue: undefined,
    selectInputRef: undefined,
    removeAllButtonRef: undefined,
  }
);

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

  const [mode] = useColorModes();
  return (
    // we want the tags to be opposite color mode
    <ColorMode mode={mode === 'light' ? 'dark' : 'light'}>
      <MultiValue {...props} />
    </ColorMode>
  );
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
      tabIndex={0}
      role="button"
      {...restInnerProps}
      style={style}
      onKeyDown={onKeyPress}
      ref={removeAllButtonRef}
    >
      <IndicatorIcon {...iconProps} color="text" />
    </CustomStyledRemoveAllDiv>
  );
};

export const CustomContainer = ({
  children,
  ...rest
}: CustomSelectComponentProps<typeof SelectContainer>) => {
  const { inputProps, name } = rest.selectProps;

  const value = rest.hasValue
    ? rest
        .getValue()
        .map(({ value }) => value)
        .join(', ')
    : '';

  return (
    <SelectContainer {...rest}>
      {children}
      <input type="hidden" value={value} name={name} {...inputProps} />
    </SelectContainer>
  );
};

export const IconOption = ({
  children,
  ...rest
}: CustomSelectComponentProps<typeof Option>) => {
  const { size } = rest.selectProps;

  return (
    <Option {...rest}>
      {children}
      {rest?.isSelected && (
        <CheckIcon size={selectedIconSize[size ?? 'medium']} />
      )}
    </Option>
  );
};

export const formatOptionLabel = ({
  label,
  icon: Icon,
  size,
  subtitle,
  rightLabel,
  disabled,
}: any) => {
  const textColor = disabled ? 'text-disabled' : 'inherit';
  return (
    <Box
      color={textColor}
      display="flex"
      justifyContent="space-between"
      width="100%"
    >
      <Box display="flex" flexDirection="column">
        <Box>
          {Icon && (
            <Icon size={size === 'small' ? 16 : 24} color="text" ml={4} />
          )}
          <Box color={textColor} as="span" pl={Icon ? 16 : 0}>
            {label}
          </Box>
        </Box>
        {subtitle && (
          <Box as="span" fontSize={14} color="text-disabled">
            {subtitle}
          </Box>
        )}
      </Box>
      {rightLabel && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
          textAlign="right"
          fontSize={14}
          aria-label={rightLabel}
          pr={16}
        >
          {rightLabel}
        </Box>
      )}
    </Box>
  );
};

export const formatGroupLabel = ({ label, divider }: SelectDropdownGroup) => {
  if (divider) {
    return (
      <Box display="flex" justify-content="center">
        <Box
          width="100%"
          fit
          height="1px"
          bg="text-disabled"
          borderRadius="2px"
          mx={16}
        />
      </Box>
    );
  }
  return label;
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
