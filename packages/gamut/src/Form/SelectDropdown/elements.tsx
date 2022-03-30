import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';
import ReactSelect, {
  components as SelectDropdownElements,
} from 'react-select';

import { Box } from '../../Box';
import {
  CustomContainerProps,
  ReactSelectProps,
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

export const TypedReactSelect = styled(ReactSelect)<ReactSelectProps>();
