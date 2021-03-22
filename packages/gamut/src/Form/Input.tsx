import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import styled, { StyledComponent } from '@emotion/styled';
import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react';

import { Box } from '../Box';
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
   * [The for/id string of a label or labelable form-related element](https://github.com/theKashey/react-focus-on). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
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
}

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

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ error, className, id, valid, as: As, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };
    const AsComponent = As || InputElement;

    return (
      <Box position="relative">
        <AsComponent
          {...rest}
          id={id || rest.htmlFor}
          ref={ref}
          error={error}
          activated={activated}
          icon={error || valid}
          className={className}
          onChange={(event) => changeHandler(event)}
        />
        {error && <StyledAlertIcon color="red" />}
        {valid && <StyledCheckCircledIcon color="green" />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
