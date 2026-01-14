import { css, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import * as React from 'react';

import { Anchor } from '../../Anchor';
import { Box } from '../../Box';
import { Markdown } from '../../Markdown';
import { BaseInputProps } from '../types';
import { FormError } from './FormError';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel, FormGroupLabelProps } from './FormGroupLabel';

export interface FormGroupProps
  extends ComponentProps<typeof FormGroupContainer>,
    Omit<BaseInputProps, 'name' | 'error'>,
    Pick<FormGroupLabelProps, 'disabled' | 'infotip' | 'isSoloField'> {
  /**
   * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
   */
  error?: string;
  description?: string;
  labelSize?: 'small' | 'large';
  isFirstError?: boolean;
  errorType?: 'initial' | 'absolute';
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
  height: max-content;
`;

const FormGroupContainer: React.FC<
  ComponentProps<typeof StyledFormGroupContainer>
> = ({ pb = 8, mb = 24, ...rest }) => {
  return <StyledFormGroupContainer mb={mb} pb={pb} {...rest} />;
};

const ErrorAnchor = styled(Anchor)(
  css({
    color: 'feedback-error',
  })
);

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  description,
  disabled,
  error,
  htmlFor,
  infotip,
  label,
  labelSize,
  required,
  isSoloField,
  isFirstError,
  errorType,
  ...rest
}) => {
  const labelComponent = label ? (
    <FormGroupLabel
      disabled={disabled}
      htmlFor={htmlFor}
      infotip={infotip}
      isSoloField={isSoloField}
      required={required}
      size={labelSize}
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
    <FormGroupContainer width={1} {...rest} className={className}>
      {labelComponent}
      {descriptionComponent}
      {children}
      {/*
       * For screen readers to read new content, role="alert" and/or
       * aria-live wrapper elements must be present *before* content is
       * added. Thus, we need to render the FormError span always,
       * regardless of whether or not there is an error.
       */}
      <FormError
        aria-live={isFirstError ? 'assertive' : 'off'}
        role={isFirstError ? 'alert' : 'status'}
        variant={errorType}
      >
        {error && (
          <Markdown
            inline
            overrides={{
              a: {
                allowedAttributes: ['href', 'target'],
                component: ErrorAnchor,
                processNode: (
                  node: unknown,
                  props: { onClick?: () => void }
                ) => <ErrorAnchor {...props} />,
              },
            }}
            skipDefaultOverrides={{ a: true }}
            spacing="none"
            text={error}
          />
        )}
      </FormError>
    </FormGroupContainer>
  );
};
