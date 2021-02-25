import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { formBaseStyles } from './styles/shared';

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
    htmlFor?: string;
  };

export const disabledLabelStyle = ({ disabled }) => {
  if (disabled) {
    return css`
      color: ${theme.colors[`gray-300`]};
    `;
  }
};

export const formLabelStyles = css`
  display: block;
  line-height: ${theme.spacing[24]};
`;

const StyledLabel = styled.label<FormGroupLabelProps>`
  ${formBaseStyles}
  ${formLabelStyles}
  ${disabledLabelStyle}
`;

const StyledDiv = styled.div<FormGroupLabelProps>`
  ${formBaseStyles}
  ${formLabelStyles}
  ${disabledLabelStyle}
`;

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  className,
  disabled,
  htmlFor,
  ...rest
}) => {
  if (htmlFor) {
    return (
      <StyledLabel
        {...rest}
        htmlFor={htmlFor}
        disabled={disabled}
        className={className}
      />
    );
  }

  return <StyledDiv {...rest} disabled={disabled} className={className} />;
};
