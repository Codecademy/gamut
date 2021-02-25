import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { Box } from '../Box';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel } from './FormGroupLabel';

export type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  htmlFor?: string;
  className?: string;
  description?: string;
  required?: boolean;
};

export const formGroupStyles = css`
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const FormGroupContainer = styled(Box)<FormGroupProps>`
  ${formGroupStyles}
`;

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  htmlFor,
  children,
  className,
  required,
  ...rest
}) => {
  const labelComponent = label ? (
    <FormGroupLabel htmlFor={htmlFor} required={required}>
      {label}
    </FormGroupLabel>
  ) : null;

  const descriptionComponent = description ? (
    <FormGroupDescription aria-live="assertive">
      {description}
    </FormGroupDescription>
  ) : null;

  return (
    <FormGroupContainer {...rest} className={className}>
      {labelComponent}
      {descriptionComponent}
      {children}
    </FormGroupContainer>
  );
};
