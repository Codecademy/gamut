import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { colors } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
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
  iconStyles,
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

export const iFrameStyles = ({
  error,
  activated,
  icon,
}: conditionalInputStyleProps) => {
  return css`
    ${formBaseFieldStyles}
    ${conditionalStyles({ error, activated })}
    ${iconPadding({ icon })}
  `;
};

export const iFrameWrapper = styled.div<conditionalInputStyleProps>`
  ${formBaseFieldStyles}
  ${conditionalStyles}
  ${iconPadding}
  text-indent: 0;
`;

const InputElement = styled.input<StyledInputProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  ${iconPadding}
  text-indent: 0;
`;

const StyledAlertIcon = styled(AlertIcon)(iconStyles);
const StyledCheckCircledIcon = styled(CheckCircledIcon)(iconStyles);

type inputState = {
  color: keyof typeof colors;
  icon?: typeof StyledAlertIcon;
};

type inputStatesObj = {
  error: inputState;
  valid: inputState;
  clean: inputState;
};

const inputStates: inputStatesObj = {
  error: {
    color: 'red',
    icon: StyledAlertIcon,
  },
  valid: {
    color: 'green',
    icon: StyledCheckCircledIcon,
  },
  clean: {
    color: 'gray-600',
    icon: undefined,
  },
};

const getInputState = (error: boolean, valid: boolean) => {
  if (error) return 'error';
  if (valid) return 'valid';
  return 'clean';
};

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ error, className, id, valid, as: As, icon: Icon, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);

    const { color, icon } = inputStates[getInputState(!!error, !!valid)];

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };

    const AsComponent = As || InputElement;
    const ShownIcon = Icon ? styled(Icon)(iconStyles) : icon;

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
        />
        {!!ShownIcon && (
          <FlexBox
            paddingRight={error || valid ? 24 : 32}
            alignItems="center"
            position="absolute"
            right="0"
            top="0"
            bottom="0"
          >
            <ShownIcon size={error || valid ? 16 : 24} />
          </FlexBox>
        )}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
