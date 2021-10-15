import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import {
  FormError,
  FormGroup,
  FormGroupLabel,
  FormGroupLabelProps,
  FormGroupProps,
} from '..';
import { Anchor } from '../Anchor';
import { HiddenText } from '../HiddenText';
import { Markdown } from '../Markdown';
import { ConnectedField, FieldProps, SubmitContextProps } from './types';
import { useField } from './utils';

const ErrorAnchor = styled(Anchor)(
  css({
    color: 'feedback-error',
  })
);

export type ConnectedFormGroupBaseProps = Omit<
  FormGroupProps,
  'label' | 'disabled'
> &
  Pick<FormGroupLabelProps, 'size'> & {
    customError?: string;
    errorType?: 'initial' | 'absolute';
    hideLabel?: boolean;
    name: string;
    label: React.ReactNode;
    required?: boolean;
    showRequired?: boolean;
    tooltip?: any;
  };

export interface ConnectedFormGroupProps<T extends ConnectedField>
  extends SubmitContextProps,
    ConnectedFormGroupBaseProps {
  field: Omit<React.ComponentProps<T>, 'name' | 'disabled'> & FieldProps<T>;
}

export function ConnectedFormGroup<T extends ConnectedField>({
  customError,
  children,
  disabled = false,
  errorType = 'absolute',
  field,
  hideLabel,
  id,
  label,
  name,
  size,
  spacing = 'fit',
  tooltip,
}: ConnectedFormGroupProps<T>) {
  const {
    error,
    isFirstError,
    isDisabled,
    showRequired,
    validation,
  } = useField({ name, disabled });
  const { component: Component, ...rest } = field;

  const renderedLabel = (
    <FormGroupLabel
      disabled={isDisabled}
      htmlFor={id || name}
      tooltip={tooltip}
      showRequired={showRequired && !!validation}
      size={size}
    >
      {label}
    </FormGroupLabel>
  );

  return (
    <FormGroup spacing={hideLabel ? 'tight' : spacing}>
      {hideLabel ? <HiddenText>{renderedLabel}</HiddenText> : renderedLabel}
      <Component {...(rest as any)} name={name} disabled={disabled} />
      {children}
      {(error || customError) && (
        <FormError
          role={isFirstError ? 'alert' : 'status'}
          aria-live={isFirstError ? 'assertive' : 'off'}
          variant={errorType}
        >
          <Markdown
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
            inline
            text={error || customError}
            spacing="none"
          />
        </FormError>
      )}
    </FormGroup>
  );
}
