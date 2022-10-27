import {
  ArrowChevronDownIcon,
  CloseIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
  SearchIcon,
} from '@codecademy/gamut-icons';
import { ColorMode, css, theme, useColorModes } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { CSSProperties, KeyboardEvent } from 'react';
import ReactSelect, {
  components as SelectDropdownElements,
  GroupBase,
  MultiValueProps,
  MultiValueRemoveProps,
  Props,
} from 'react-select';

import { Box } from '../../Box';
import {
  CustomContainerProps,
  ExtendedOption,
  ReactSelectAdditionalProps,
  SelectDropdownGroup,
  SizedIndicatorProps,
} from './types';

const {
  DropdownIndicator,
  MultiValue,
  MultiValueRemove,
  SelectContainer,
} = SelectDropdownElements;

export const MultiValueWithColorMode = (props: MultiValueProps) => {
  /// TO-TRY : kindof an antipattern, but setState to PROVIDER then access here
  const [mode] = useColorModes();
  return (
    // we want the tags to be opposite color mode
    <ColorMode mode={mode === 'light' ? 'dark' : 'light'}>
      <MultiValue {...props} />
    </ColorMode>
  );
};

const onPressEnter2 = (e: KeyboardEvent<HTMLDivElement>, onMouseDown: any) => {
  if (e.key === 'Enter' && onMouseDown) {
    onMouseDown(e as any);
  }
};

export const MultiValueRemoveButton = (props: MultiValueRemoveProps) => {
  console.log('remove props', props);
  return (
    <MultiValueRemove {...props}>
      <MiniDeleteIcon size={12} />
    </MultiValueRemove>
  );
};

const iconSize = { small: 12, medium: 16 };
const indicatorIcons = {
  small: {
    size: iconSize.small,
    icon: MiniChevronDownIcon,
  },
  medium: {
    size: iconSize.medium,
    icon: ArrowChevronDownIcon,
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
  const { ...iconProps } = indicatorIcons[size ?? 'medium'];
  let { icon: IndicatorIcon } = iconProps;

  if (isSearchable) {
    IndicatorIcon = SearchIcon;
  }

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
  })
);

export const RemoveAllButton = (props: SizedIndicatorProps) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    selectProps,
  } = props;

  const { size } = selectProps;
  const { ...iconProps } = indicatorIcons[
    size ? 'smallRemove' : 'mediumRemove'
  ];
  const { icon: IndicatorIcon } = iconProps;

  const onPressEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && restInnerProps.onMouseDown) {
      restInnerProps.onMouseDown(e as any);
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
      onKeyDown={onPressEnter}
      ref={ref}
    >
      <IndicatorIcon {...iconProps} color="text" />
    </CustomStyledRemoveAllDiv>
  );
};

export const CustomContainer = ({
  children,
  ...rest
}: CustomContainerProps) => {
  // in the react-select documentation, this line is ts-ignore'd so its safe to say there's no nice way to do this.
  const { inputProps, name } = rest.selectProps as any;
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
        <Box as="span" fontSize={14} color="text-disabled">
          {subtitle}
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        flexGrow={1}
        textAlign="right"
        fontSize={14}
      >
        {rightLabel}
      </Box>
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
  ...props
}: Props<OptionType, IsMulti, GroupType> & ReactSelectAdditionalProps) {
  return <ReactSelect {...props} />;
}
