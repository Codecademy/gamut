import { noSelect, screenReaderOnly, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';

import { variables } from './_variables';
import {
  checkboxElement,
  checkboxElementStates,
  checkboxInput,
  checkboxLabel,
  checkboxLabelStates,
  checkboxTextStates,
  polyline,
} from './styles/shared-system-props';

type Multiline = { multiline?: boolean };
type Checked = { checked?: boolean };
type CheckboxElementProps = Checked & {
  multiline?: boolean;
  disabled?: boolean;
};

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> &
  Multiline & {
    className?: string;
    htmlFor: string;
    label: ReactNode;
    name?: string;
    required?: boolean;
    value?: string;
    id?: string;
  };

export type CheckboxTextProps = StyleProps<typeof checkboxTextStates>;

const CheckboxLabel = styled.label(
  noSelect,
  checkboxLabel,
  checkboxLabelStates
);

const CheckboxElement = styled.div<CheckboxElementProps>(
  system.color,
  checkboxElement,
  checkboxElementStates
);

const CheckboxVector = styled.svg`
  position: absolute;
  top: -2px;
  left: -2px;
`;

const Polyline = styled.polyline<Checked>`
  ${polyline}
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 18px;
  stroke-dashoffset: 18px;
  stroke-dashoffset: ${({ checked }) => (checked ? 0 : `18px`)};
  transition: stroke-dashoffset ${variables.transitionTime};
`;

const Input = styled.input`
  ${screenReaderOnly}
  ${checkboxInput}
`;

const CheckboxText = styled.span<CheckboxTextProps>(checkboxTextStates);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      htmlFor,
      multiline,
      id,
      checked,
      defaultChecked,
      disabled,
      ...rest
    },
    ref
  ) => {
    const defaultCheckedValue =
      checked !== undefined ? checked : Boolean(defaultChecked);
    const [currentlyChecked, setCurrentlyChecked] = useState(
      defaultCheckedValue
    );

    const changeHandler = (event: ChangeEvent<any>) => {
      rest?.onChange?.(event);
      setCurrentlyChecked(!currentlyChecked);
    };

    return (
      <div className={className}>
        <Input
          id={id || htmlFor}
          type="checkbox"
          checked={currentlyChecked}
          disabled={disabled}
          onClick={changeHandler}
          onChange={changeHandler}
          {...rest}
          ref={ref}
        />
        <CheckboxLabel htmlFor={id || htmlFor} disabled={disabled}>
          <CheckboxElement
            multiline={multiline}
            checked={currentlyChecked}
            disabled={disabled}
            color={
              disabled || !currentlyChecked ? 'background-disabled' : 'primary'
            }
          >
            <CheckboxVector
              width="22px"
              height="22px"
              viewBox="0 0 20 20"
              color={currentlyChecked ? 'currentColor' : 'transparent'}
            >
              <path
                d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
                fill="currentColor"
              />
              <Polyline checked={currentlyChecked} points="4 11 8 15 16 6" />
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
