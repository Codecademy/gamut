import {
  AlertIcon,
  CheckCircledIcon,
  GamutIconProps,
} from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
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
  formFieldStyles,
  inputSizeStyles,
} from '../styles';
import { BaseInputProps } from '../types';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
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
    type?: string;
    valid?: boolean;
  };

export interface StyledInputProps
  extends StyleProps<typeof conditionalStyles>,
    StyleProps<typeof inputSizeStyles>,
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
  size?: 'base' | 'small';
}

/**  We greatly prefer NOT to do this but ReactRecurly has some specific needs around focus-styles + padding that force us to export them seperately. If we ever stop using React-Recurly, this code will be 🔪.
 *tldr: Do not do this unless you have already talked to Web-Plat and have failed to find any alternate (and better) solutions. */

export const reactRecurlyFormFieldFocusStyles = css(formFieldFocusStyles);

export const reactRecurlyFormFieldPaddingStyles = css(formFieldPaddingStyles);

export const iFrameWrapper = styled.div<conditionalStyleProps>(
  formBaseFieldStyles,
  conditionalStyles,
  css({ textIndent: 0 })
);

const InputElement = styled.input<StyledInputProps>(
  formFieldStyles,
  conditionalStyles,
  inputSizeStyles,
  (props) =>
    css({
      paddingRight: props.icon ? `2.3rem` : `initial`,
      textIndent: 0,
    })
);

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

    const trueSize = type === 'file' && size === 'small' ? 'smallFile' : size;

    return (
      <Box
        color={color}
        display={type === 'hidden' ? 'none' : undefined}
        position="relative"
      >
        <AsComponent
          {...rest}
          className={className}
          icon={error || valid || !!IconSvg}
          id={id || rest.htmlFor}
          inputSize={trueSize}
          ref={ref}
          type={type}
          variant={conditionalStyleState(
            Boolean(error),
            rest.activated !== undefined ? rest.activated : activatedStyle
          )}
          onChange={changeHandler}
        />
        {!!ShownIcon && (
          <FlexBox
            alignItems="center"
            bottom="0"
            position="absolute"
            pr={IconSvg ? 12 : 16}
            right="0"
            top="0"
          >
            <ShownIcon aria-hidden size={IconSvg ? 24 : 16} />
          </FlexBox>
        )}
      </Box>
    );
  }
);
