import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import * as React from 'react';

import {
  FormError,
  FormGroup,
  FormGroupLabel,
  FormGroupProps,
  InfoTipProps,
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

export interface ConnectedFormGroupBaseProps
  extends Omit<
    FormGroupProps,
    'label' | 'disabled' | 'description' | 'htmlFor'
  > {
  customError?: string;
  errorType?: 'initial' | 'absolute';
  hideLabel?: boolean;
  name: string;
  label: React.ReactNode;
  required?: boolean;
  infotip?: InfoTipProps;
}

export interface ConnectedFormGroupProps<T extends ConnectedField>
  extends SubmitContextProps,
    ConnectedFormGroupBaseProps {
  /**
   * An object consisting of a `component` key to specify what ConnectedFormInput to render - the remaining key/value pairs are that components desired props.
   */
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
  labelSize,
  spacing = 'fit',
  isSoloField,
  infotip,
}: ConnectedFormGroupProps<T>) {
  const { error, isFirstError, isDisabled, setError, validation } = useField({
    name,
    disabled,
  });
  const { component: Component, ...rest } = field;

  useEffect(() => {
    if (customError) {
      setError(name, {
        type: 'manual',
        message: customError,
      });
    }
  }, [customError, name, setError]);

  const renderedLabel = (
    <FormGroupLabel
      disabled={isDisabled}
      htmlFor={id || name}
      infotip={infotip}
      isSoloField={isSoloField}
      required={!!validation?.required}
      size={labelSize}
    >
      {label}
    </FormGroupLabel>
  );

  const textError =
    ((typeof error === 'string' ? error : error?.message) || customError) ??
    'An error occurred.';

  return (
    <FormGroup spacing={hideLabel ? 'tight' : spacing}>
      {hideLabel ? <HiddenText>{renderedLabel}</HiddenText> : renderedLabel}
      <Component {...(rest as any)} name={name} disabled={disabled} />
      {children}
      {(error || customError) && !hideLabel && (
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
            text={textError as string}
            spacing="none"
          />
        </FormError>
      )}
    </FormGroup>
  );
}
