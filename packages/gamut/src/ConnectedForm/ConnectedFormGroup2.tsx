import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';

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
import { ConnectedSelect } from './Inputs';
import {
  ConnectedBaseInputProps,
  ConnectedBaseSelectProps,
  ConnectedField,
  ConnectedSelectProps,
  renderField,
} from './Inputs/types';
import { useFieldContext } from './utils';

const ErrorAnchor = styled(Anchor)(
  css({
    color: 'feedback-error',
  })
);

export interface CustomFieldRenderProps2 {
  name?: string;
  error?: string;
  isFirstError?: boolean;
  currentlyDisabled?: boolean;
  register: UseFormMethods['register'];
}

export type ConnectedFormGroupProps2 = Omit<FormGroupProps, 'label'> &
  Pick<FormGroupLabelProps, 'size'> & {
    customError?: string;
    errorType?: 'initial' | 'absolute';
    field: ConnectedField;
    hideLabel?: boolean;
    label: React.ReactNode;
    name: string;
    required?: boolean;
    showRequired?: boolean;
    spacing?: 'base' | 'tight';
    tooltip?: any;
  };

export const ConnectedFormGroup2: React.FC<ConnectedFormGroupProps2> = ({
  customError,
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
}) => {
  const { error, isFirstError, isDisabled } = useFieldContext(name);
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

      <field.component {...field} />

      {renderField(field, name)}
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
};
