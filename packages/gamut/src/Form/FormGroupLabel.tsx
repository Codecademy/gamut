import { theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { formBaseStyles } from './styles/shared';

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
    htmlFor?: string;
    showRequired?: boolean;
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
      color: ${theme.colors[`gray-400`]};
    `;
  }
};

const formLabelStyles = ({ size, disabled }: FormGroupLabelProps) => css`
  ${formBaseStyles}
  ${disabledLabelStyle({ disabled })}
  ${labelSizeVariants({ size })}
  display: block;
`;

const StyledLabel = styled.label<FormGroupLabelProps>`
  ${formLabelStyles}
`;

const StyledDiv = styled.div<FormGroupLabelProps>`
  ${formLabelStyles}
`;

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  children,
  className,
  disabled,
  htmlFor,
  showRequired,
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
        {showRequired ? ' *' : ''}
      </StyledLabel>
    );
  }

  return (
    <StyledDiv {...rest} disabled={disabled} className={className} size={size}>
      {children}
      {showRequired ? ' *' : ''}
    </StyledDiv>
  );
};
