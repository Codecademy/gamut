import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { ToolTipProps } from '../Tip';
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
  description?: string;
  showRequired?: boolean;
  error?: string;
  disabled?: boolean;
  labelSize?: 'small' | 'large';
  tooltip?: ToolTipProps;
}

const formGroupSpacing = variant({
  defaultVariant: 'loose',
  prop: 'spacing',
  variants: {
    tight: {
      px: 0,
      py: 0,
    },
    fit: {
      pb: 8,
      mb: 8,
    },
    padded: {
      pb: 8,
      mb: 0,
    },
    loose: {
      pb: 8,
      mb: 24,
    },
  },
});

const StyledFormGroupContainer = styled(Box)<
  StyleProps<typeof formGroupSpacing>
>`
  ${formGroupSpacing}
  position: relative;
  width: 100%;
  height: max-content;
`;

const FormGroupContainer: React.FC<
  ComponentProps<typeof StyledFormGroupContainer>
> = ({ pb = 8, mb = 24, ...rest }) => {
  return <StyledFormGroupContainer pb={pb} mb={mb} {...rest} />;
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
      {error && (
        <FormError aria-live="polite" role="alert">
          {error}
        </FormError>
      )}
    </FormGroupContainer>
  );
};
