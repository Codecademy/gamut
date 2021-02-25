import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { each, isArray, isObject } from 'lodash';
import React, { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';

import {
  errorStyle,
  formBaseFieldStyles,
  selectIconStyles,
} from './styles/shared';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
};

export const selectWrapperStyles = css`
  position: relative;
  width: 100%;
  font-weight: normal;
`;

export const selectInputStyles = css`
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const SelectWrapper = styled.div`
  ${selectWrapperStyles}
`;

const StyledChevronDownIcon = styled(ArrowChevronDownIcon)`
  ${selectIconStyles}
`;

const SelectBase = styled.select<SelectProps>`
  ${formBaseFieldStyles}
  ${selectInputStyles}
  ${errorStyle}
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
        <StyledChevronDownIcon color="blue" />
        <SelectBase
          {...rest}
          defaultValue={props.defaultValue || ''}
          id={id || props.htmlFor}
          ref={ref}
          errorState={props.error}
        >
          {selectOptions}
        </SelectBase>
      </SelectWrapper>
    );
  }
);
