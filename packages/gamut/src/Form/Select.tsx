import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { pxRem, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { each, isArray, isObject } from 'lodash';
import React, { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';

import { Box } from '../Box';
import { errorStyle, formFieldStyles, iconStyles } from './styles/shared';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
  sizeVariant?: 'small' | 'base';
};

const selectSizeVariants = variant({
  default: 'base',
  prop: 'sizeVariant',
  variants: {
    small: {
      height: '2rem',
      paddingX: 8,
      paddingY: 0,
    },
    base: {
      height: 'auto',
    },
  },
});

const SelectWrapper = styled(Box)`
  position: relative;
  width: 100%;
  font-weight: normal;
  min-width: 110px;
`;

const StyledDownIcon = styled(ArrowChevronDownIcon)`
  ${iconStyles}
`;

const StyledMiniDownIcon = styled(MiniChevronDownIcon)`
  ${iconStyles}
  right: 12px;
  height: 12px;
  width: 12px;
  top: calc(50% - ${pxRem(6)});
`;

const SelectBase = styled.select<SelectProps>`
  ${formFieldStyles}
  ${errorStyle}
  ${selectSizeVariants}
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      defaultValue,
      options,
      error,
      id,
      htmlFor,
      sizeVariant,
      ...rest
    },
    ref
  ) => {
    let selectOptions: ReactNode[] = [];

    if (isArray(options)) {
      selectOptions = options.map((option) => {
        const key = id ? `${id}-${option}` : option;
        return (
          <option key={key} value={option} data-testid={key}>
            {option}
          </option>
        );
      });
    } else if (isObject(options)) {
      each(options, (text, val) => {
        const key = id ? `${id}-${val}` : val;
        selectOptions.push(
          <option key={key} value={val} data-testid={key}>
            {text}
          </option>
        );
      });
    }

    return (
      <SelectWrapper className={className}>
        {sizeVariant === 'small' ? (
          <StyledMiniDownIcon color={error ? 'red' : undefined} />
        ) : (
          <StyledDownIcon color={error ? 'red' : undefined} />
        )}
        <SelectBase
          {...rest}
          defaultValue={defaultValue || ''}
          id={id || htmlFor}
          ref={ref}
          error={error}
          sizeVariant={sizeVariant}
        >
          {selectOptions}
        </SelectBase>
      </SelectWrapper>
    );
  }
);
