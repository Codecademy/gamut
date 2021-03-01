import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';

import { Box } from '../Box';
import { errorStyle, formBaseFieldStyles, iconStyles } from './styles/shared';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  verified?: boolean;
};

export const inputIconStyles = css`
  ${iconStyles}
  top: calc(50% - (${pxRem(8)} + ${theme.spacing[4]}));
`;

const InputBase = styled.input<InputProps>`
  ${formBaseFieldStyles}
  ${errorStyle}
  caret-color: ${theme.colors[`hyper-400`]};
  box-sizing: border-box;
  text-indent: 0;
`;

const StyledAlertIcon = styled(AlertIcon)`
  ${inputIconStyles}
`;

const StyledCheckCircledIcon = styled(CheckCircledIcon)`
  ${inputIconStyles}
`;

// const CustomInputWrapper = React.() => {
//   const props = { ...children.props, ...inputProps };
//   const { id, htmlFor, className, ...rest } = props;
//   return (
//     {console.log(ref)}
//     <InputBase ref={ref} id={id || htmlFor} className={className} {...rest} />
//   );
// };

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ error, htmlFor, className, id, verified, children, ...rest }, ref) => {
    const childrenProps = children.props;
    return (
      <InputBase
        {...rest}
        id={id || htmlFor}
        error={error}
        className={className}
        ref={ref}
        {...childrenProps}
      />
    );
  }
);
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, htmlFor, className, id, verified, children, ...rest }, ref) => {
    return (
      <Box position="relative">
        {children ? (
          <CustomInput
            {...rest}
            id={id || htmlFor}
            error={error}
            className={className}
            ref={ref}
          >
            {children}
          </CustomInput>
        ) : (
          <InputBase
            {...rest}
            id={id || htmlFor}
            ref={ref}
            error={error}
            className={className}
          />
        )}
        {error && <StyledAlertIcon color="red" />}
        {verified && <StyledCheckCircledIcon color="green" />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
