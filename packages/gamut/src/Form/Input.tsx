import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import React, {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react';

import { Box, FlexBox } from '../Box';
import {
  conditionalInputStyleProps,
  conditionalStyles,
  formBaseFieldStyles,
  formFieldPaddingStyles,
  formFieldStyles,
  iconPadding,
  reactRecurlyformFieldFocusStyles,
} from './styles/shared';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  className?: string;
  error?: boolean;
  /**
   * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
   */
  htmlFor?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  valid?: boolean;
};

export interface StyledInputProps extends InputProps {
  activated?: boolean;
  icon?: boolean;
}

export interface InputWrapperProps extends InputProps {
  as?: StyledComponent<
    StyledInputProps,
    React.DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
  /**
   * A custom icon svg from gamut-icons.
   */
  icon?: typeof AlertIcon;
}

// ReactRecurly has some specific needs around padding and focus.
export const reactRecurlyFormFieldFocusStyles = css`
  ${reactRecurlyformFieldFocusStyles}
`;

export const reactRecurlyFormFieldPaddingStyles = css`
  ${formFieldPaddingStyles}
`;

export const iFrameWrapper = styled.div<conditionalInputStyleProps>`
  ${formBaseFieldStyles}
  ${conditionalStyles}
  text-indent: 0;
`;

const InputElement = styled.input<StyledInputProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  ${iconPadding}
  text-indent: 0;
`;

const inputStates = {
  error: {
    color: 'red',
    icon: AlertIcon,
  },
  valid: {
    color: 'green',
    icon: CheckCircledIcon,
  },
  clean: {
    color: 'gray-600',
    icon: undefined,
  },
} as const;

const getInputState = (error: boolean, valid: boolean) => {
  if (error) return 'error';
  if (valid) return 'valid';
  return 'clean';
};

//to do: properly type onFocus + onChange events

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ error, className, id, valid, as: As, icon: Icon, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);
    const [hasBeenFocused, setHasBeenFocused] = useState(false);

    const { color, icon } = inputStates[
      getInputState(Boolean(error), Boolean(valid))
    ];

    const focusHandler = (event: FocusEvent<any>) => {
      rest?.onFocus?.(event);
      setHasBeenFocused(true);
    };

    const changeHandler = (event: ChangeEvent<any>) => {
      rest?.onChange?.(event);
      hasBeenFocused ? setActivated(true) : null;
    };

    const AsComponent = As || InputElement;
    const ShownIcon = Icon || icon;

    return (
      <Box position="relative" textColor={color}>
        <AsComponent
          {...rest}
          id={id || rest.htmlFor}
          ref={ref}
          error={error}
          activated={activated}
          icon={error || valid || !!Icon}
          className={className}
          onChange={(event) => changeHandler(event)}
          onFocus={(event) => focusHandler(event)}
        />
        {!!ShownIcon && (
          <FlexBox
            paddingRight={Icon ? 12 : 16}
            position="absolute"
            alignItems="center"
            right="0"
            top="0"
            bottom="0"
          >
            <ShownIcon size={Icon ? 24 : 16} />
          </FlexBox>
        )}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
