import {
  colors,
  noSelect,
  pxRem,
  screenReaderOnly,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { variables } from './_variables';
import {
  checkboxElement,
  checkboxElementMultiline,
  checkboxLabel,
} from './styles/shared-system-props';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> &
  Multiline & {
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

type Multiline = { multiline?: boolean };

const CheckboxLabel = styled.label`
  ${noSelect}
  ${checkboxLabel}
`;

const CheckboxElement = styled.div<Multiline>`
  ${checkboxElement}
  ${checkboxElementMultiline}
`;
const activeColor = 'blueviolet';
const CheckboxVector = styled.svg`
  position: absolute;
  top: -2px;
  left: -2px;
`;

const Polyline = styled.polyline`
  fill: none;
  stroke: ${colors['gray-100']};
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 18px;
  stroke-dashoffset: 18px;
`;

// Maybe ScreenReaderFocusable
const Input = styled.input`
  ${screenReaderOnly}

  &:focus + ${CheckboxLabel} > ${CheckboxElement} {
    outline: ${pxRem(2)} solid ${activeColor};
    outline-offset: ${pxRem(2)};
  }

  &:checked + ${CheckboxLabel} ${CheckboxElement} {
    border-color: ${activeColor};

    ${CheckboxVector} {
      path {
        fill: ${activeColor};
      }

      ${Polyline} {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset ${variables.transitionTime};
      }
    }
  }

  &:checked:disabled + ${CheckboxLabel} ${CheckboxElement} {
    border-color: ${variables.itemBackgroundHover};

    ${CheckboxVector} {
      ${Polyline} {
        fill: ${variables.itemBackgroundHover};
      }
      path {
        fill: ${variables.itemBackgroundHover};
      }
    }
  }
`;

const CheckboxText = styled.span<Multiline>`
  align-self: center;
  font-size: ${({ multiline }) => multiline && '0.75rem'};
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, htmlFor, multiline, id, ...rest }, ref) => (
    <div className={className}>
      <Input id={id || htmlFor} type="checkbox" {...rest} ref={ref} />
      <CheckboxLabel htmlFor={id || htmlFor}>
        <CheckboxElement multiline={multiline}>
          <CheckboxVector width="22px" height="22px" viewBox="0 0 20 20">
            <path
              d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
              fill="none"
            />
            <Polyline points="4 11 8 15 16 6" />
          </CheckboxVector>
        </CheckboxElement>
        <CheckboxText multiline={multiline}>{label}</CheckboxText>
      </CheckboxLabel>
    </div>
  )
);
