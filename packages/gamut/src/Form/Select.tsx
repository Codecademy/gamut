import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { each, isArray, isObject } from 'lodash';
import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  SelectHTMLAttributes,
  useState,
} from 'react';

import { Box } from '../Box';
import {
  conditionalStyles,
  formFieldStyles,
  iconStyles,
  miniIconStyles,
  styledIconCreator,
} from './styles/shared';

export type SelectWrapperProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
  sizeVariant?: 'small' | 'base';
};

export interface SelectProps extends SelectWrapperProps {
  activated?: boolean;
}

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
  min-width: 7rem;
`;

const StyledDownIcon = styledIconCreator(ArrowChevronDownIcon, iconStyles);

const StyledMiniDownIcon = styledIconCreator(
  MiniChevronDownIcon,
  miniIconStyles
);

const SelectBase = styled.select<SelectProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  ${selectSizeVariants}
  cursor: pointer;
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

export const Select = forwardRef<HTMLSelectElement, SelectWrapperProps>(
  (
    { className, defaultValue, options, error, id, sizeVariant, ...rest },
    ref
  ) => {
    const [activated, setActivated] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };

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
      <SelectWrapper className={className} textColor={error ? 'red' : 'navy'}>
        {sizeVariant === 'small' ? <StyledMiniDownIcon /> : <StyledDownIcon />}
        <SelectBase
          {...rest}
          defaultValue={defaultValue || ''}
          id={id || rest.htmlFor}
          ref={ref}
          error={error}
          sizeVariant={sizeVariant}
          activated={activated}
          onChange={(event) => changeHandler(event)}
        >
          {selectOptions}
        </SelectBase>
      </SelectWrapper>
    );
  }
);
