import {
  AlertIcon,
  CheckCircledIcon,
  GamutIconProps,
} from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled, { StyledComponent } from '@emotion/styled';
import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react';
import * as React from 'react';

import { Box, FlexBox } from '../../Box';
import {
  conditionalStyleProps,
  conditionalStyles,
  conditionalStyleState,
  formBaseFieldStyles,
  formFieldFocusStyles,
  formFieldPaddingStyles,
  formFieldSmallPaddingStyles,
  formFieldStyles,
} from '../styles';
import { BaseInputProps } from '../types';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  BaseInputProps & {
    /**
     * Allows Inputs to manage their own activated style state to account for some edge-cases.
     */
    activated?: boolean;
    className?: string;
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    placeholder?: string;
    /**
     * Adding a small size prop to reduce the padding on the input. If the size prop is not passed, the default size will be used.
     */
    size?: 'small';
    type?: string;
    valid?: boolean;
  };

export interface StyledInputProps
  extends StyleProps<typeof conditionalStyles>,
    InputProps {
  icon?: boolean;
}

/*
 * @remarks We would love to properly type this with generics, but, alas, we cannot yet.
 * @see https://github.com/Codecademy/gamut/pull/270#discussion_r270917147
 * @see https://github.com/Microsoft/TypeScript/issues/21048
 */
export interface InputWrapperProps extends InputProps {
  as?: StyledComponent<StyledInputProps, React.PropsWithChildren<any>>;
  /**
   * A custom icon svg from gamut-icons.
   */
  icon?: React.ComponentType<GamutIconProps>;
}

/**  We greatly prefer NOT to do this but ReactRecurly has some specific needs around focus-styles + padding that force us to export them seperately. If we ever stop using React-Recurly, this code will be 🔪.
 *tldr: Do not do this unless you have already talked to Web-Plat and have failed to find any alternate (and better) solutions. */

export const reactRecurlyFormFieldFocusStyles =
  system.css(formFieldFocusStyles);

export const reactRecurlyFormFieldPaddingStyles = system.css(
  formFieldPaddingStyles
);

export const iFrameWrapper = styled.div<conditionalStyleProps>`
  ${formBaseFieldStyles}
  ${conditionalStyles}
  text-indent: 0;
`;

const InputElement = styled.input<StyledInputProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  text-indent: 0;
  padding: ${(props) =>
    props.size === 'small'
      ? `${formFieldSmallPaddingStyles.py}px ${formFieldSmallPaddingStyles.px}px`
      : `${formFieldPaddingStyles.py}px ${formFieldPaddingStyles.px}px`};
  padding-right: ${(props) => (props.icon ? `2.3rem` : `initial`)};
`;

const inputStates = {
  error: {
    color: 'feedback-error',
    icon: AlertIcon,
  },
  valid: {
    color: 'feedback-success',
    icon: CheckCircledIcon,
  },
  clean: {
    color: 'text',
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
    {
      error,
      className,
      id,
      valid,
      as: As,
      icon: IconSvg,
      type = 'text',
      size,
      ...rest
    },
    ref
  ) => {
    const [activatedStyle, setActivatedStyle] = useState(false);

    const { color, icon } =
      inputStates[getInputState(Boolean(error), Boolean(valid))];

    /*
     * @remarks We would love to properly type this with generics, but, alas, we cannot yet. See comments on lines 45-47 for more detail.
     */

    const changeHandler = (event: ChangeEvent<any>) => {
      rest?.onChange?.(event);
      setActivatedStyle(true);
    };

    const AsComponent = As || InputElement;
    const ShownIcon = IconSvg || icon;

    return (
      <Box
        display={type === 'hidden' ? 'none' : undefined}
        position="relative"
        color={color}
      >
        <AsComponent
          {...rest}
          className={className}
          icon={error || valid || !!IconSvg}
          id={id || rest.htmlFor}
          onChange={changeHandler}
          ref={ref}
          type={type}
          variant={conditionalStyleState(
            Boolean(error),
            rest.activated !== undefined ? rest.activated : activatedStyle
          )}
          size={size}
        />
        {!!ShownIcon && (
          <FlexBox
            pr={IconSvg ? 12 : 16}
            position="absolute"
            alignItems="center"
            right="0"
            top="0"
            bottom="0"
          >
            <ShownIcon size={IconSvg ? 24 : 16} aria-hidden />
          </FlexBox>
        )}
      </Box>
    );
  }
);
