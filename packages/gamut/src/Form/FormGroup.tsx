import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { Box } from '../Box';
import { FormError } from './FormError';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel } from './FormGroupLabel';

export type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  /**
   * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
   */
  htmlFor?: string;
  className?: string;
  description?: string;
  showRequired?: boolean;
  error?: string;
  disabled?: boolean;
  labelSize?: 'small' | 'large';
};

const FormGroupContainer = styled(Box)<FormGroupProps>`
  position: relative;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  htmlFor,
  children,
  className,
  showRequired,
  error,
  labelSize,
  disabled,
  ...rest
}) => {
  const labelComponent = label ? (
    <FormGroupLabel
      htmlFor={htmlFor}
      showRequired={showRequired}
      size={labelSize}
      disabled={disabled}
    >
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
