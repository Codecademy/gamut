import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  ChangeEvent,
  forwardRef,
  SelectHTMLAttributes,
  useMemo,
  useState,
} from 'react';

import { Box, FlexBox } from '../../Box';
import {
  conditionalStyles,
  conditionalStyleState,
  formFieldStyles,
} from '../styles';
import { BaseInputProps } from '../types';
import { parseSelectOptions } from '../utils';

export type SelectOptions = string[] | Record<string, number | string>;

export type SelectComponentProps = Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  'disabled' | 'id'
> &
  Pick<BaseInputProps, 'htmlFor' | 'error'> & {
    options?: SelectOptions;
  };

export type SelectWrapperProps = SelectComponentProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    sizeVariant?: 'small' | 'base';
  };

export interface SelectProps
  extends SelectWrapperProps,
    StyleProps<typeof conditionalStyles> {}

const selectSizeVariants = variant({
  defaultVariant: 'base',
  prop: 'sizeVariant',
  variants: {
    small: {
      height: '2rem',
      pl: 8,
      pr: 16,
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
    {
      className,
      defaultValue,
      options,
      error,
      id,
      sizeVariant,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [activatedStyle, setActivatedStyle] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      rest?.onChange?.(event);
      setActivatedStyle(true);
    };

    const selectOptions = useMemo(() => {
      return parseSelectOptions({ options, id });
    }, [options, id]);

    return (
      <Box
        className={className}
        minWidth="7rem"
        position="relative"
        width="100%"
      >
        <StyledFlexbox
          alignItems="center"
          aria-hidden
          bottom="0"
          color={error ? 'feedback-error' : disabled ? 'text-disabled' : 'text'}
          position="absolute"
          pr={12}
          right={sizeVariant === 'small' ? 4 : 0}
          top="0"
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
          disabled={disabled}
          error={error}
          id={id || rest.htmlFor}
          ref={ref}
          sizeVariant={sizeVariant}
          variant={conditionalStyleState(Boolean(error), activatedStyle)}
          onChange={(event) => changeHandler(event)}
        >
          {selectOptions}
        </SelectBase>
      </Box>
    );
  }
);
