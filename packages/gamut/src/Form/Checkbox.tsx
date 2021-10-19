import {
  noSelect,
  screenReaderOnly,
  styledOptions,
  timing,
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import {
  checkboxElement,
  checkboxElementStates,
  checkboxInput,
  checkboxLabel,
  checkboxLabelStates,
  checkboxPadding,
  checkboxTextStates,
  polyline,
} from './styles';

export type CheckboxTextProps = StyleProps<typeof checkboxTextStates>;
export type CheckboxPaddingProps = StyleProps<typeof checkboxPadding>;

export type CheckboxBaseProps = InputHTMLAttributes<HTMLInputElement> &
  CheckboxPaddingProps & {
    multiline?: boolean;
    className?: string;
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    htmlFor: string;
    name?: string;
    required?: boolean;
    value?: string;
    id?: string;
  };

export type CheckboxNodeLabelProps = CheckboxBaseProps & {
  label: ReactNode;
  'aria-label': string;
};

export type CheckboxStringLabelProps = CheckboxBaseProps & {
  label: string;
};

export type CheckboxProps = CheckboxNodeLabelProps | CheckboxStringLabelProps;

const CheckboxLabel = styled.label<Pick<CheckboxProps, 'disabled' | 'spacing'>>(
  noSelect,
  checkboxLabel,
  checkboxPadding,
  checkboxLabelStates
);

const CheckboxElement = styled('div', styledOptions)<
  Pick<CheckboxProps, 'checked' | 'multiline' | 'disabled'>
>(checkboxElement, checkboxElementStates);

const CheckboxVector = styled.svg`
  position: absolute;
  top: -2px;
  left: -2px;
`;

const Polyline = styled.polyline<Pick<CheckboxProps, 'checked'>>`
  ${polyline}
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 18px;
  stroke-dashoffset: ${({ checked }) => (checked ? 0 : `18px`)};
  transition: stroke-dashoffset ${timing.fast};
`;

const Input = styled.input`
  ${screenReaderOnly}
  ${checkboxInput}
`;

const CheckboxText = styled.span<CheckboxTextProps>(checkboxTextStates);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      'aria-label': ariaLabel,
      className,
      label,
      htmlFor,
      multiline,
      id,
      checked,
      disabled,
      spacing,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        <Input
          id={id || htmlFor}
          labelled-by={`text-${id || htmlFor}`}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-label={
            ariaLabel ?? typeof label === 'string' ? `${label}` : undefined
          }
          {...rest}
          ref={ref}
        />
        <CheckboxLabel
          htmlFor={id || htmlFor}
          disabled={disabled}
          spacing={spacing}
        >
          <CheckboxElement
            multiline={multiline}
            checked={checked}
            disabled={disabled}
          >
            <CheckboxVector
              width="22px"
              height="22px"
              viewBox="0 0 20 20"
              color={checked ? 'currentColor' : 'transparent'}
              aria-hidden
            >
              <path
                d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
                fill="currentColor"
              />
              <Polyline checked={checked} points="4 11 8 15 16 6" />
            </CheckboxVector>
          </CheckboxElement>
          <CheckboxText
            id={`text-${id || htmlFor}`}
            multiline={multiline}
            disabled={disabled}
            aria-hidden="true"
          >
            {label}
          </CheckboxText>
        </CheckboxLabel>
      </div>
    );
  }
);

const hey = () => {
  <Checkbox
    checked
    readOnly
    spacing="tight"
    label={<div>neat huh?</div>}
    aria-label="neat huh?"
    htmlFor="spacing-3"
    name="spacing-3"
  />;
};
