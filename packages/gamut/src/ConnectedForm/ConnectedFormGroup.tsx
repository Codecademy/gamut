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
import { getErrorMessage, useField } from './utils';

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
  /**
   * InfoTip to display next to the field label. String labels automatically
   * label the InfoTip button. For ReactNode labels, provide `ariaLabel` or
   * set `labelledByFieldLabel: true` to ensure the InfoTip is accessible.
   */
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

  const textError = customError || getErrorMessage(error);
  const showError = !!(textError && !hideLabel);
  const errorId = showError ? `${id || name}_error` : undefined;

  return (
    <FormGroup spacing={hideLabel ? 'tight' : spacing}>
      {hideLabel ? <HiddenText>{renderedLabel}</HiddenText> : renderedLabel}
      <Component
        {...(rest as any)}
        aria-describedby={errorId}
        aria-invalid={showError}
        disabled={disabled}
        name={name}
      />
      {children}
      {showError && (
        <FormError
          aria-live={isFirstError ? 'assertive' : 'off'}
          id={errorId}
          role={isFirstError ? 'alert' : 'status'}
          variant={errorType}
        >
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
            text={textError}
          />
        </FormError>
      )}
    </FormGroup>
  );
}
