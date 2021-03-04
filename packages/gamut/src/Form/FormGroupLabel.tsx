import { theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { formBaseStyles } from './styles/shared';

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
    htmlFor?: string;
    required?: boolean;
    size?: 'small' | 'large';
  };

type disabledLabelStyleProps = {
  disabled?: boolean;
};

const labelSizeVariants = variant({
  default: 'small',
  prop: 'size',
  variants: {
    small: {
      lineHeight: 'title',
      marginBottom: 4,
    },
    large: {
      fontSize: 22,
      lineHeight: 'base',
      fontWeight: 'title',
    },
  },
});

const disabledLabelStyle = ({ disabled }: disabledLabelStyleProps) => {
  if (disabled) {
    return css`
      color: ${theme.colors[`gray-300`]};
    `;
  }
};

const formLabelStyles = css`
  display: block;
`;

const StyledLabel = styled.label<FormGroupLabelProps>`
  ${formBaseStyles}
  ${formLabelStyles}
  ${disabledLabelStyle}
    ${labelSizeVariants}
`;

const StyledDiv = styled.div<FormGroupLabelProps>`
  ${formBaseStyles}
  ${formLabelStyles}
  ${disabledLabelStyle}
  ${labelSizeVariants}
`;

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  children,
  className,
  disabled,
  htmlFor,
  required,
  size,
  ...rest
}) => {
  if (htmlFor) {
    return (
      <StyledLabel
        {...rest}
        htmlFor={htmlFor}
        disabled={disabled}
        className={className}
        size={size}
      >
        {children}
        {required ? ' *' : ''}
      </StyledLabel>
    );
  }

  return (
    <StyledDiv {...rest} disabled={disabled} className={className} size={size}>
      {children}
      {required ? ' *' : ''}
    </StyledDiv>
  );
};
