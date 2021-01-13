import { screenReaderOnly } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import cx from 'classnames';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { noSelect } from '@codecademy/gamut-styles';

import styles from './styles/Checkbox.module.scss';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  htmlFor: string;
  label: ReactNode;
  multiline?: boolean;
  name?: string;
  required?: boolean;
  value?: string;
  id?: string;
};

const Container = styled.div``;

const CheckboxLabel = styled.label`
  ${noSelect}
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  margin: ($form-padding / 2) 0;
  width: 100%;
  font-weight: normal;
  padding: $form-padding 0;
`;

const CheckboxElement = styled.div<{ multiline?: boolean }>`
  position: relative;
  margin-right: 0.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  border: 2px solid $color-gray-200;
  border-radius: $border-radius;
  transition: all 0.1s ease-in-out;
  margin-top: ${({ multiline }) => '3px'};
`;

const CheckboxVector = styled.svg`
  position: absolute;
  top: -2px;
  left: -2px;
`;

const Path = styled.path`
  fill: $color-blue-500;
`;

const Polyline = styled.polyline`
  fill: none;
  stroke: $color-gray-100;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 18px;
  stroke-dashoffset: 18px;
`;

// Maybe ScreenReaderFocusable
const Input = styled.input`
  ${screenReaderOnly}

  &:focus + ${CheckboxLabel}  > ${CheckboxElement} {
    // styles here
  }

  &:checked + ${CheckboxLabel} ${CheckboxElement} {
  }

  &:checked:disabled + ${CheckboxLabel} ${CheckboxElement} {
  }
`;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, htmlFor, multiline, id, ...rest }, ref) => (
    <Container className={className}>
      <Input id={id || htmlFor} type="checkbox" {...rest} ref={ref} />
      <CheckboxLabel className={styles.checkboxLabel} htmlFor={id || htmlFor}>
        <CheckboxElement multiline={multiline}>
          <CheckboxVector width="24px" height="24px" viewBox="0 0 20 20">
            <Path
              d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
              className={styles.squareVector}
              fill="none"
            />
            <Polyline points="4 11 8 15 16 6" />
          </CheckboxVector>
        </CheckboxElement>
        <span
          className={cx(
            styles.checkboxText,
            multiline && styles.checkboxTextMultiline
          )}
        >
          {label}
        </span>
      </CheckboxLabel>
    </Container>
  )
);
