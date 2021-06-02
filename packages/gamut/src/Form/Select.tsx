import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  forwardRef,
  SelectHTMLAttributes,
  useMemo,
  useState,
} from 'react';

import { Box, FlexBox } from '../Box';
import { conditionalStyles, formFieldStyles } from './styles/shared';
import { parseSelectOptions } from './utils';

export type SelectComponentProps = Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  'disabled' | 'id'
> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
};

export type SelectWrapperProps = SelectComponentProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    sizeVariant?: 'small' | 'base';
  };

export interface SelectProps extends SelectWrapperProps {
  activated?: boolean;
}

const selectSizeVariants = variant({
  defaultVariant: 'base',
  prop: 'sizeVariant',
  variants: {
    small: {
      height: '2rem',
      px: 8,
      py: 0,
    },
    base: {
      height: 'auto',
      pr: 48,
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

const StyledFlexbox = styled(FlexBox)(allowClickStyle);

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

    const selectOptions = useMemo(() => {
      return parseSelectOptions({ options, id });
    }, [options, id]);

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
          aria-hidden
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
