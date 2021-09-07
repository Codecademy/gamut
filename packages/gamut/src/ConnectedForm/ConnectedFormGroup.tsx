import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Anchor } from '../Anchor';
import { FormError, FormGroup, FormGroupLabel } from '../Form';
import { HiddenText } from '../HiddenText';
import { Markdown } from '../Markdown';
import { useFieldContext } from './utils';

const ErrorAnchor = styled(Anchor)(
  css({
    color: 'feedback-error',
  })
);

export type ConnectedFormGroupProps = {
  customError?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  id?: string;
  label: React.ReactNode;
  name: string;
  required?: boolean;
  showRequired?: boolean;
  spacing?: 'base' | 'tight';
  tooltip?: any;
};

export const ConnectedFormGroup: React.FC<ConnectedFormGroupProps> = ({
  children,
  customError,
  disabled,
  hideLabel,
  id,
  label,
  name,
  required,
  showRequired,
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
    >
      {label}
    </FormGroupLabel>
  );

  return (
    <FormGroup pb={spacing === 'tight' ? 0 : 8} mb={0}>
      {hideLabel ? <HiddenText>{renderedLabel}</HiddenText> : renderedLabel}
      {children}
      {(error || customError) && (
        <FormError
          role={isFirstError ? 'alert' : 'status'}
          aria-live={isFirstError ? 'assertive' : 'off'}
          variant="absolute"
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
