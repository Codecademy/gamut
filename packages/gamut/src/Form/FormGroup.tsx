import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { Box } from '../Box';
import { FormError } from './FormError';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel } from './FormGroupLabel';

export type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  htmlFor?: string;
  className?: string;
  description?: string;
  required?: boolean;
  error?: string;
  labelSize?: 'small' | 'large';
};

const FormGroupContainer = styled(Box)<FormGroupProps>`
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  htmlFor,
  children,
  className,
  required,
  error,
  labelSize,
  ...rest
}) => {
  const labelComponent = label ? (
    <FormGroupLabel htmlFor={htmlFor} required={required} size={labelSize}>
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
      {error && <FormError aria-live="polite">{error}</FormError>}
    </FormGroupContainer>
  );
};
