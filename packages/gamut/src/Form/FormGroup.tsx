import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { Box } from '../Box';
import { ToolTipProps } from '../ToolTip';
import { FormError } from './FormError';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel } from './FormGroupLabel';

export interface FormGroupProps
  extends ComponentProps<typeof FormGroupContainer> {
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
  tooltip?: ToolTipProps;
}

const FormGroupContainer = styled(Box)`
  position: relative;
  width: 100%;
`;

FormGroupContainer.defaultProps = {
  paddingBottom: 8,
  marginBottom: 24,
};

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
