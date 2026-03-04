import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import * as React from 'react';
import { RegisterOptions } from 'react-hook-form';

import { FormError, FormGroup, FormGroupLabel, FormGroupProps } from '..';
import { Anchor } from '../Anchor';
import { HiddenText } from '../HiddenText';
import { Markdown } from '../Markdown';
import { InfoTipSubComponentProps } from '../Tip/InfoTip/type-utils';
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
   * InfoTip to display next to the field label. The InfoTip button is
   * automatically labelled by the field label. To override this behavior,
   * provide `ariaLabel` or `ariaLabelledby`.
   */
  infotip?: InfoTipSubComponentProps;
}

export interface ConnectedFormGroupProps<T extends ConnectedField>
  extends SubmitContextProps,
    ConnectedFormGroupBaseProps {
  /**
   * An object consisting of a `component` key to specify what ConnectedFormInput to render - the remaining key/value pairs are that components desired props.
   */
  field: Omit<React.ComponentProps<T>, 'name' | 'disabled'> &
    FieldProps<T> & {
      customValidations?: RegisterOptions;
    };
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
  const { component: Component, customValidations, ...rest } = field;
  const { error, isFirstError, isDisabled, setError, validation } = useField({
    name,
    disabled,
    customValidations,
  });

  useEffect(() => {
    if (customError) {
      setError(name, {
        type: 'manual',
        message: customError,
      });
    }
  }, [customError, name, setError]);

  const required =
    Boolean(validation?.required) || Boolean(customValidations?.required);

  const renderedLabel = (
    <FormGroupLabel
      disabled={isDisabled}
      htmlFor={id || name}
      infotip={infotip}
      isSoloField={isSoloField}
      required={required}
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
        customValidations={customValidations}
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
                ) => {
                  const { key: elementKey, ...rest } =
                    props as React.ComponentProps<typeof ErrorAnchor> & {
                      key?: React.Key;
                    };
                  return <ErrorAnchor key={elementKey} {...rest} />;
                },
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
