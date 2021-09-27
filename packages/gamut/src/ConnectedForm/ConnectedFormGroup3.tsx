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
import { ConnectedField2, FieldProps } from './Inputs/types';
import { useFieldContext } from './utils';

const ErrorAnchor = styled(Anchor)(
  css({
    color: 'feedback-error',
  })
);

export type ConnectedFormGroupBaseProps3 = Omit<FormGroupProps, 'label'> &
  Pick<FormGroupLabelProps, 'size'> & {
    customError?: string;
    errorType?: 'initial' | 'absolute';
    hideLabel?: boolean;
    name: string;
    label: React.ReactNode;
    required?: boolean;
    showRequired?: boolean;
    spacing?: 'base' | 'tight';
    tooltip?: any;
  };

export interface ConnectedFormGroupProps3<T extends ConnectedField2>
  extends ConnectedFormGroupBaseProps3 {
  field: Omit<React.ComponentProps<T>, 'name'> & FieldProps<T>;
}

export function ConnectedFormGroup3<T extends ConnectedField2>({
  customError,
  children,
  disabled,
  errorType = 'absolute',
  field,
  hideLabel,
  id,
  label,
  name,
  required,
  showRequired,
  size,
  spacing,
  tooltip,
}: ConnectedFormGroupProps3<T>) {
  const { error, isFirstError, isDisabled } = useFieldContext(name);
  const { component: Component, ...rest } = field;
  const currentlyDisabled = isDisabled || disabled;

  const renderedLabel = (
    <FormGroupLabel
      disabled={currentlyDisabled}
      htmlFor={id || name}
      tooltip={tooltip}
      showRequired={showRequired && required}
      size={size}
    >
      {label}
    </FormGroupLabel>
  );

  return (
    <FormGroup
      pb={spacing === 'tight' ? 0 : 8}
      mb={spacing === 'tight' ? 0 : 8}
    >
      {hideLabel ? <HiddenText>{renderedLabel}</HiddenText> : renderedLabel}
      <Component name={name} {...(rest as any)} />
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
