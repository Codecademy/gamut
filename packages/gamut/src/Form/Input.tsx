import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import styled, { StyledComponent } from '@emotion/styled';
import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react';

import { Box, FlexBox } from '../Box';
import {
  conditionalInputStyleProps,
  conditionalStyles,
  formBaseFieldStyles,
  formFieldStyles,
  iconPadding,
} from './styles/shared-system-props';

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
  /**
   * Allows Inputs to manage their own activated style state to acccount for some edge-cases.
   */
  activated?: boolean;
};
export interface StyledInputProps extends InputProps {
  icon?: boolean;
}

/*
 * @remarks We would love to properly type this with generics, but, alas, we cannot yet.
 * @see https://github.com/Codecademy/client-modules/pull/270#discussion_r270917147
 * @see https://github.com/Microsoft/TypeScript/issues/21048
 */
export interface InputWrapperProps extends InputProps {
  as?: StyledComponent<StyledInputProps, React.PropsWithChildren<any>>;
  /**
   * A custom icon svg from gamut-icons.
   */
  icon?: typeof AlertIcon;
}

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

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  (
    { error, className, id, valid, activated, as: As, icon: Icon, ...rest },
    ref
  ) => {
    const [activatedStyle, setActivatedStyle] = useState(false);

    const { color, icon } = inputStates[
      getInputState(Boolean(error), Boolean(valid))
    ];

    /*
     * @remarks We would love to properly type this with generics, but, alas, we cannot yet. See comments on lines 45-47 for more detail.
     */

    const changeHandler = (event: ChangeEvent<any>) => {
      rest?.onChange?.(event);
      setActivatedStyle(true);
    };

    const AsComponent = As || InputElement;
    const ShownIcon = Icon || icon;
    const conditionalStyleState = error
      ? 'error'
      : activatedStyle
      ? 'activated'
      : undefined;
    return (
      <Box
        display={rest.type === 'hidden' ? 'none' : undefined}
        position="relative"
        textColor={color}
      >
        <AsComponent
          {...rest}
          id={id || rest.htmlFor}
          ref={ref}
          variant={conditionalStyleState}
          icon={error || valid || !!Icon}
          className={className}
          onChange={changeHandler}
        />
        {!!ShownIcon && (
          <FlexBox
            pr={Icon ? 12 : 16}
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
