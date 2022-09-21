import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import React from 'react';
import ReactSelect, {
  components as SelectDropdownElements,
  GroupBase,
  Props,
} from 'react-select';

import { Box } from '../../Box';
import { MenuSeparator } from '../../Menu';
import { SelectOptionBase } from '../utils';
import {
  CustomContainerProps,
  ExtendedOption,
  ReactSelectAdditionalProps,
  SizedIndicatorProps,
} from './types';

const { DropdownIndicator, SelectContainer } = SelectDropdownElements;

const indicatorSizes = {
  small: {
    size: 12,
    icon: MiniChevronDownIcon,
  },
  medium: {
    size: 16,
    icon: ArrowChevronDownIcon,
  },
};

export const ChevronDropdown = (props: SizedIndicatorProps) => {
  const { size } = props.selectProps;
  const color = props.isDisabled ? 'text-disabled' : 'text';
  const { icon: IndicatorIcon, ...iconProps } = indicatorSizes[
    size ?? 'medium'
  ];

  return (
    <DropdownIndicator {...props}>
      <IndicatorIcon {...iconProps} color={color} />
    </DropdownIndicator>
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
      >
        {rightLabel}
      </Box>
    </Box>
  );
};

export const formatGroupLabel = ({
  label,
  divider,
}: GroupBase<SelectOptionBase>) => {
  console.log(label, divider);
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
        )
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
