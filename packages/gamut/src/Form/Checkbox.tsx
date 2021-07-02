import { noSelect, screenReaderOnly, states } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { variables } from './_variables';
import {
  checkboxElement,
  checkboxElementMultiline,
  checkboxInput,
  checkboxLabel,
  checkboxTextStates,
  polyline,
} from './styles/shared-system-props';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  multiline?: boolean;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  htmlFor: string;
  label: ReactNode;
  name?: string;
  required?: boolean;
  value?: string;
  id?: string;
};

export type CheckboxElementProps = StyleProps<typeof checkboxElementMultiline>;
export type CheckboxTextProps = StyleProps<typeof checkboxTextStates>;

const CheckboxLabel = styled.label(noSelect, checkboxLabel);

const CheckboxElement = styled.div(
  states({
    multiline: {
      mt: 4,
    },
  }),
  checkboxElement
);

const CheckboxVector = styled.svg`
  color: currentColor;
  position: absolute;
  top: -2px;
  left: -2px;
`;

const Polyline = styled.polyline`
  // to-do?? what do w/ system
  ${polyline}
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 18px;
  stroke-dashoffset: 18px;
`;

// Maybe ScreenReaderFocusable
const Input = styled.input`
  ${screenReaderOnly}
  ${checkboxInput}


  &:checked + ${CheckboxLabel} ${CheckboxElement} {
    //to-do ?? what do w/ system
    ${CheckboxVector} {
      ${Polyline} {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset ${variables.transitionTime};
      }
    }
  }
`;

const CheckboxText = styled.span<CheckboxTextProps>(checkboxTextStates);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, htmlFor, multiline, id, checked, disabled, ...rest },
    ref
  ) => {
    return (
      <div className={className}>
        <Input
          id={id || htmlFor}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...rest}
          ref={ref}
        />
        <CheckboxLabel htmlFor={id || htmlFor}>
          <CheckboxElement multiline={multiline}>
            <CheckboxVector width="22px" height="22px" viewBox="0 0 20 20">
              <path
                d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
                fill="currentColor"
              />
              <Polyline points="4 11 8 15 16 6" />
            </CheckboxVector>
          </CheckboxElement>
          <CheckboxText multiline={multiline} disabled={disabled}>
            {label}
          </CheckboxText>
        </CheckboxLabel>
      </div>
    );
  }
);
