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
  customIconStyles,
  formBaseFieldStyles,
  formFieldStyles,
  iconPadding,
  iconStyles,
  styledIconCreator,
} from './styles/shared';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  className?: string;
  error?: boolean;
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
   * An custom icon svg from gamut-icons.
   */
  icon?: typeof AlertIcon;
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

const StyledAlertIcon = styledIconCreator(AlertIcon, iconStyles);
const StyledCheckCircledIcon = styledIconCreator(CheckCircledIcon, iconStyles);

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ error, className, id, valid, as: As, icon: Icon, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };

    const AsComponent = As || InputElement;

    const ShownIcon = error
      ? StyledAlertIcon
      : valid
      ? StyledCheckCircledIcon
      : Icon
      ? styledIconCreator(Icon, customIconStyles)
      : null;

    const iconColor = error ? 'red' : valid ? 'green' : 'gray-600';

    return (
      <Box position="relative">
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
        {ShownIcon && <ShownIcon textColor={iconColor} />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
