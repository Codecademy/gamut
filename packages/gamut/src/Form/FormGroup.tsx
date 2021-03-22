import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { Box } from '../Box';
import { ToolTipProps } from '../ToolTip';
import { FormError } from './FormError';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel } from './FormGroupLabel';

export type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  htmlFor?: string;
  className?: string;
  description?: string;
  showRequired?: boolean;
  error?: string;
  disabled?: boolean;
  labelSize?: 'small' | 'large';
  tooltip?: ToolTipProps;
};

const FormGroupContainer = styled(Box)<FormGroupProps>`
  position: relative;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const FormGroup: React.FC<FormGroupProps> = ({
  tooltip,
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
      tooltip={tooltip}
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
