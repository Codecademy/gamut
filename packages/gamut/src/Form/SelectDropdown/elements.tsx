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
import {
  CustomContainerProps,
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

export const formatOptionLabel = ({ label, icon: Icon, size }: any) => {
  return (
    <>
      {Icon && <Icon size={size === 'small' ? 16 : 24} color="text" ml={4} />}
      <Box as="span" pl={Icon ? 16 : 0}>
        {label}
      </Box>
    </>
  );
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
