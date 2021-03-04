import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import { each, isArray, isObject } from 'lodash';
import React, { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';

import { Box } from '../Box';
import { errorStyle, formFieldStyles, selectIconStyles } from './styles/shared';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
};

const SelectWrapper = styled(Box)`
  position: relative;
  width: 100%;
  font-weight: normal;
  min-width: 100px;
`;

const StyledChevronDownIcon = styled(ArrowChevronDownIcon)`
  ${selectIconStyles}
  color: ${({ theme }) => theme.colors['blue-900']};
  pointer-events: none;
`;

const SelectBase = styled.select<SelectProps>`
  ${formFieldStyles}
  ${errorStyle}
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { className } = props;
    const { options, error, id, ...rest } = props;

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
        <StyledChevronDownIcon color={error ? 'red' : undefined} />
        <SelectBase
          {...rest}
          defaultValue={props.defaultValue || ''}
          id={id || props.htmlFor}
          ref={ref}
          error={props.error}
        >
          {selectOptions}
        </SelectBase>
      </SelectWrapper>
    );
  }
);
