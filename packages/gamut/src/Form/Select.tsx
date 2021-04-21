import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { each, isArray, isObject } from 'lodash';
import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  SelectHTMLAttributes,
  useState,
} from 'react';

import { Box, FlexBox } from '../Box';
import { conditionalStyles, formFieldStyles } from './styles/shared';

export type SelectWrapperBaseProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
};

export type SelectWrapperProps = SelectWrapperBaseProps & {
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
      paddingRight: 48,
    },
  },
});

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

const allowClickStyle = css`
  pointer-events: none;
`;

export const StyledFlexbox = styled(FlexBox)(allowClickStyle);

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
      <Box
        position="relative"
        width="100%"
        textColor={error ? 'red' : 'navy'}
        minWidth="7rem"
        className={className}
      >
        <StyledFlexbox
          pr={12}
          alignItems="center"
          position="absolute"
          right="0"
          top="0"
          bottom="0"
        >
          {sizeVariant === 'small' ? (
            <MiniChevronDownIcon size={12} />
          ) : (
            <ArrowChevronDownIcon size={16} />
          )}
        </StyledFlexbox>
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
      </Box>
    );
  }
);
